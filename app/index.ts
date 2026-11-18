import {dom, Observable, styled} from 'grainjs';
import * as CodeMirror from 'codemirror';
import {Rpc} from 'grain-rpc';
import * as store from 'store';
import 'codemirror/mode/javascript/javascript.js'

const accountIds = ['A', 'B', 'C'];
const startBalance = 3000;
const goalBalance = 3.0e9;
const goalTransfers = 60;

const sampleClientCode = `// You may use transfer(accFrom, accTo, amount) and getBalance(acc).
await transfer('A', 'B', 200);
await transfer('B', 'C', 200);
console.log("A=", await getBalance('A'),
            "B=", await getBalance('B'),
            "C=", await getBalance('C'));
`;

function buildPageDom() {
  let fromSelect: HTMLSelectElement;
  let toSelect: HTMLSelectElement;
  let amountInput: HTMLInputElement;
  let bankIframe: HTMLIFrameElement;
  let codeMirror: CodeMirror.Editor;
  const error = Observable.create(null, "");
  const isRunning = Observable.create(null, false);
  let worker: Worker|undefined;

  async function fetchServerCode() {
    try {
      const response = await fetch('./bank.ts');
      return await response.text();
    } catch (e) {
      error.set(e.message);
      return '';
    }
  }

  async function transfer(accFrom: string, accTo: string, amount: number) {
    error.set('');
    try {
      await (bankIframe.contentWindow as any).bank.transfer(accFrom, accTo, amount);
    } catch (e) {
      error.set(e.message);
    }
  }
  async function reset() {
    error.set('');
    await (bankIframe.contentWindow as any).bank.initialize();
  }

  async function runJsCode() {
    worker = new Worker('/worker.js');
    const rpc = new Rpc({logger: {}, sendMessage: worker.postMessage.bind(worker)});
    worker.onmessage = (ev) => rpc.receiveMessage(ev.data);
    const {transfer, getBalance, getNumTransfers} = (bankIframe.contentWindow as any).bank;
    rpc.registerImpl('bank', {transfer, getBalance});
    try {
      isRunning.set(true);
      await reset();
      await rpc.callRemoteFunc('runUserCode', codeMirror.getValue());
      const result = sum(await Promise.all(accountIds.map(acc => getBalance(acc))));
      const numTransfers = await getNumTransfers();
      if (result === goalBalance && numTransfers <= goalTransfers) {
        showCongratulations(result, codeMirror.getValue());
      } else if (result > startBalance && result < goalBalance) {
        error.set('You are on your way, but not there yet!');
      } else if (result > goalBalance) {
        error.set('Too much! Can you hit the goal exactly?');
      } else if (numTransfers > goalTransfers) {
        error.set(`Impressive! But can you do it within ${goalTransfers} transfers?`);
      }
    } catch (e) {
      console.warn("Error", e);
      error.set(e.message);
    } finally {
      stopJsCode();
    }
  }

  function stopJsCode() {
    worker?.terminate();
    isRunning.set(false);
  }

  return cssPage(
    cssClient(
      cssIntro(
        dom('p', 'Welcome, aspiring hacker!'),
        dom('p', 'On the right, you see the source code for a server ',
          'that implements a simple bank. It has a subtle problem. ',
          'Your job is not to fix it, but to exploit it to grow the ',
          'total balance across the accounts from $3,000 to ',
          'exactly $3,000,000,000 using no more than 60 transfers.'
        ),
        dom('p', 'On the left, you have the bank client. ',
          'You can use the buttons to transfer money manually, then write JS code. ',
          'You may use functions ', dom('code', 'transfer(accFrom, accTo, amount)'),
          ' and ', dom('code', 'getBalance(acc)'),
          '. Please solve it yourself, without AI. Good luck!',
        ),
      ),
      dom('form',
        dom.on('submit', (ev) => {
          ev.preventDefault();
          transfer(fromSelect.value, toSelect.value, parseFloat(amountInput.value));
        }),
        cssToolbar(
          'Transfer from',
          fromSelect = cssSelect(accountIds.map((accId) =>
            dom('option', {value: accId, selected: accId === 'A'}, accId))
          ),
          'to',
          toSelect = cssSelect(accountIds.map((accId) =>
            dom('option', {value: accId, selected: accId === 'B'}, accId))
          ),
          dom('span', '$',
            amountInput = cssInput({type: 'text', placeholder: 'Amount'})
          ),
          cssButton('Transfer'),
          cssButton('Reset', dom.on('click', (ev) => { ev.preventDefault(); reset(); })),
        ),
        cssError(dom.text(error)),
      ),
      cssHeader(
        dom('b', 'Client code'), ' (for you to write)',
        cssJsRun(dom.hide(isRunning), cssButton('Reset & Run', dom.on('click', runJsCode))),
        cssJsRun(dom.show(isRunning), cssButton('Stop', dom.on('click', stopJsCode))),
      ),
      cssSource((elem) => {
        setTimeout(() => {
          codeMirror = CodeMirror(elem, {
            value: sessionStorage.getItem('user-code') || sampleClientCode,
            viewportMargin: Infinity,
            mode:  "text/javascript",
            theme: 'default',
          });
          codeMirror.on('change', (inst, chg) => sessionStorage.setItem('user-code', inst.getValue()));
        }, 0);
      }),
    ),
    cssServer(
      cssHeader(
        dom('b', 'Bank balances'), ' (and number of transfers)',
      ),
      cssToolbar(
        bankIframe = cssIframe({src: './bankPage.html'}),
      ),
      cssHeader(
        dom('b', 'Server code'), ' (contains a problem)'
      ),
      cssSource((elem) => {
        fetchServerCode().then(value =>
          CodeMirror(elem, {
            value,
            readOnly: true,
            viewportMargin: Infinity,
            mode: "text/typescript",
            theme: 'default',
          }));
      }),
    ),
  );
}

function showCongratulations(result: number, userCode: string) {
  const solnId = getNextSolutionId();
  saveSolution(solnId, result, userCode).catch(err => console.warn('Error saving solution', err));
  const elem = cssModalBacker(cssModal(
    cssCloseBtn(dom.on('click', () => { dom.domDispose(elem); elem.remove(); })),
    dom('p', 'Congratulations!'),
    dom('p', 'We hope you enjoyed the puzzle.'),
    dom('p', 'Your solution code is ', dom('span', {style: 'color:blue'}, `BankPuzzle-${solnId}`),
      '. Quote it in your application if you want to flex.'),
  ));
  document.body.appendChild(elem);
}

async function saveSolution(solnId: string, result: number, userCode: string) {
  const data = {
    Ident: [solnId],
    Result: [result],
    Code: [userCode],
    Timestamp: [Date.now() / 1000],
  };
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    credentials: 'omit',
  };
  const saveUrl = 'https://gristlabs.getgrist.com/api/docs/sCHieRK9TXrq54hHRwCE5L/tables/Solutions/data';
  const resp = await window.fetch(saveUrl, options);
  const body = await resp.json();
  if (resp.status !== 200) { throw new Error("Could not submit the form: " + (body && body.error || "unknown error")); }
}

function sum(values: number[]): number {
  return values.reduce((sum, val) => sum + val, 0);
}

function randomId(length: number): string {
  return Array.from(Array(length), () => Math.floor(Math.random() * 36).toString(36)).join('');
}

function getNextSolutionId(): string {
  const solnId = store.get('solnId') || store.set('solnId', randomId(12));
  const index = (parseInt(store.get('solnIndex'), 10) || 0) + 1;
  store.set('solnIndex', index);
  return solnId + '-' + index;
}

const cssPage = styled('div', `
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  font-family: sans-serif;
  font-size: 14px;
`);

const cssClient = styled('div', `
  flex: 1 0 0px;
  min-width: 0px;
  padding: 20px;
  border-right: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
`);

const cssServer = styled('div', `
  flex: 1 0 0px;
  min-width: 0px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`);

const cssIntro = styled('div', `
  & > p {
    margin: 0 0 10px 0;
    line-height: 1.2;
  }
`);

const cssHeader = styled('div', `
  margin-top: 20px;
`);

const cssToolbar = styled('div', `
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 6px;
  padding: 10px 20px;
  white-space: nowrap;
`);

const cssSelect = styled('select', `
  padding: 4px;
`);

const cssInput = styled('input', `
  padding: 4px;
  border: 1px solid lightgrey;
  border-radius: 6px;
  font-size: inherit;
  width: 4em;
  margin-left: 4px;
`);

const cssButton = styled('button', `
  appearance: none;
  border: none;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  background-color: #7ab6ca;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  &:hover {
    background-color: #65a2b7;
  }
  &:active {
    background-color: #4a8093;
  }
`);

const cssError = styled('div', `
  color: red;
  margin: 6px 20px;
`);

const cssIframe = styled('iframe', `
  border: none;
  height: 30px;
  width: 100%;
`);

const cssSource = styled('pre', `
  border: 1px solid #7ab6ca;
  border-radius: 6px;
  padding: 10px;
  margin: 10px 0 0 0;
  font-size: 13px;
  overflow: auto;
  flex: auto;
`);

const cssJsRun = styled('div', `
  float: right;
  margin-top: -6px;
`);

const cssModalBacker = styled('div', `
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
`);

const cssModal = styled('div', `
  position: relative;
  background-color: white;
  box-shadow: 0 4px 12px 0 #333;
  border: 1px solid #666;
  max-width: 480px;
  margin: auto;
  font-family: sans-serif;
  font-size: 14px;
  border-radius: 6px;
  padding: 32px 40px;
  line-height: 24px;
`);

const cssCloseBtn = styled('div', `
  position: absolute;
  top: 8px;
  right: 8px;
  height: 24px;
  width: 24px;
  color: grey;
  font-size: 24px;
  text-align: center;
  line-height: 27px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
  }
  &::before {
    content: "\\2715";
  }
`);

dom.update(document.body, buildPageDom());
