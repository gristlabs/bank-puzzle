import {dom, Observable, styled} from 'grainjs';
import * as CodeMirror from 'codemirror';
import {Rpc} from 'grain-rpc';
import 'codemirror/mode/javascript/javascript.js'

const positionUrl = 'https://angel.co/company/grist-labs/jobs/49428-software-engineer';

const accountIds = ['A', 'B', 'C'];
const startBalance = 3000;
const goalBalance = 1.0e9;

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
    const {transfer, getBalance} = (bankIframe.contentWindow as any).bank;
    rpc.registerImpl('bank', {transfer, getBalance});
    try {
      isRunning.set(true);
      await reset();
      await rpc.callRemoteFunc('runUserCode', codeMirror.getValue());
      const result = sum(await Promise.all(accountIds.map(acc => getBalance(acc))));
      if (result === goalBalance) {
        showInvitation(result, codeMirror.getValue());
      } else if (result > startBalance && result < goalBalance) {
        error.set('You are on your way, but not there yet!');
      } else if (result > goalBalance) {
        error.set('Too much! Can you hit the goal exactly?');
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
          'total balance accross the accounts from $3,000 to ',
          'exactly $1,000,000,000.'
        ),
        dom('p', 'On the left, you have the bank client. ',
          'You can use the buttons to transfer money, or write JS code. ',
          'Good luck!',
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

function showInvitation(result: number, userCode: string) {
  const solnId = randomId(12);
  saveSolution(solnId, result, userCode).catch(err => console.warn('Error saving solution', err));
  const elem = cssModalBacker(cssModal(
    cssCloseBtn(dom.on('click', () => { dom.domDispose(elem); elem.remove(); })),
    dom('p', 'Congratulations!'),
    dom('p', 'We hope you enjoyed the puzzle. Please consider our Software Engineer position at Grist: ',
      dom('a', {href: positionUrl, target: '_blank'}, 'See position', cssLinkOutIcon())
    ),
    dom('p', 'To apply, email ', dom('a', {href: 'mailto:jobs@getgrist.com'}, 'jobs@getgrist.com'),
      ', include "', dom('span', {style: 'color:blue'}, `BankPuzzle-${solnId}`), '" in the subject line, ',
      'and attach your resume (preferably as a PDF).'),
    dom('p', 'We hope to hear from you!'),
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
  console.log(`Solution saved; use "BankPuzzle-${solnId}" to email jobs@getgrist.com`);
}

function sum(values: number[]): number {
  return values.reduce((sum, val) => sum + val, 0);
}

function randomId(length: number): string {
  return Array.from(Array(length), () => Math.floor(Math.random() * 36).toString(36)).join('');
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

const cssLinkOutIcon = styled('div', `
  display: inline-block;
  vertical-align: middle;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyLjI5Mjg5MzIsMyBMOC41LDMgQzguMjIzODU3NjMsMyA4LDIuNzc2MTQyMzcgOCwyLjUgQzgsMi4yMjM4NTc2MyA4LjIyMzg1NzYzLDIgOC41LDIgTDEzLjUsMiBDMTMuNzc2MTQyNCwyIDE0LDIuMjIzODU3NjMgMTQsMi41IEwxNCw3LjUgQzE0LDcuNzc2MTQyMzcgMTMuNzc2MTQyNCw4IDEzLjUsOCBDMTMuMjIzODU3Niw4IDEzLDcuNzc2MTQyMzcgMTMsNy41IEwxMywzLjcwNzEwNjc4IEw3Ljg1MzU1MzM5LDguODUzNTUzMzkgQzcuNjU4MjkxMjQsOS4wNDg4MTU1NCA3LjM0MTcwODc2LDkuMDQ4ODE1NTQgNy4xNDY0NDY2MSw4Ljg1MzU1MzM5IEM2Ljk1MTE4NDQ2LDguNjU4MjkxMjQgNi45NTExODQ0Niw4LjM0MTcwODc2IDcuMTQ2NDQ2NjEsOC4xNDY0NDY2MSBMMTIuMjkyODkzMiwzIFogTTExLDEwLjUgQzExLDEwLjIyMzg1NzYgMTEuMjIzODU3NiwxMCAxMS41LDEwIEMxMS43NzYxNDI0LDEwIDEyLDEwLjIyMzg1NzYgMTIsMTAuNSBMMTIsMTIuNSBDMTIsMTMuMzI4NDI3MSAxMS4zMjg0MjcxLDE0IDEwLjUsMTQgTDMuNSwxNCBDMi42NzE1NzI4OCwxNCAyLDEzLjMyODQyNzEgMiwxMi41IEwyLDUuNSBDMiw0LjY3MTU3Mjg4IDIuNjcxNTcyODgsNCAzLjUsNCBMNS41LDQgQzUuNzc2MTQyMzcsNCA2LDQuMjIzODU3NjMgNiw0LjUgQzYsNC43NzYxNDIzNyA1Ljc3NjE0MjM3LDUgNS41LDUgTDMuNSw1IEMzLjIyMzg1NzYzLDUgMyw1LjIyMzg1NzYzIDMsNS41IEwzLDEyLjUgQzMsMTIuNzc2MTQyNCAzLjIyMzg1NzYzLDEzIDMuNSwxMyBMMTAuNSwxMyBDMTAuNzc2MTQyNCwxMyAxMSwxMi43NzYxNDI0IDExLDEyLjUgTDExLDEwLjUgWiIgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+");
  width: 16px;
  height: 16px;
  background-color: #666;
  box-sizing: border-box;
`);

dom.update(document.body, buildPageDom());
