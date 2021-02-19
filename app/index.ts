import {dom, Observable, styled} from 'grainjs';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js'

const accountIds = ['A', 'B', 'C'];

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
    try {
      const code = codeMirror.getValue();
      const {transfer, getBalance} = (bankIframe.contentWindow as any).bank;
      const userFunc = Function('transfer', 'getBalance',
                                `return async function() { ${code} }`)(transfer, getBalance);
      await reset();
      await userFunc();
    } catch (e) {
      console.warn("Error", e);
      error.set(e.message);
    }
  }

  return cssPage(
    cssClient(
      cssIntro(
        dom('p', 'Welcome, aspiring hacker!'),
        dom('p', 'On the right, you see the source code for a server ',
          'that implements a simple bank. It has a subtle problem. ',
          'Your job is not to fix it, but to exploit it to grow the ',
          'total balance accross the accounts from $3,000 to $1,000,000.'
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
        cssJsRun(cssButton('Reset & Run', dom.on('click', runJsCode))),
      ),
      cssSource((elem) => {
        setTimeout(() => {
          codeMirror = CodeMirror(elem, {
            value: sampleClientCode,
            viewportMargin: Infinity,
            mode:  "text/javascript",
            theme: 'default',
          });
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

dom.update(document.body, buildPageDom());
