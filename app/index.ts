import {dom, Observable, styled} from 'grainjs';
import * as hljs from 'highlight.js';

const accountIds = ['A', 'B', 'C'];

function buildPageDom() {
  let fromSelect: HTMLSelectElement;
  let toSelect: HTMLSelectElement;
  let amountInput: HTMLInputElement;
  let bankIframe: HTMLIFrameElement;
  const error = Observable.create(null, "");

  async function fetchServerCode() {
    try {
      const response = await fetch('./bank.ts');
      const code = await response.text();
      return hljs.highlight('typescript', code).value;
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
        dom('b', 'Client code'), ' (for you to write)'
      ),
      cssSource('...'),
    ),
    cssServer(
      cssToolbar(
        bankIframe = cssIframe({src: './bankPage.html'}),
      ),
      cssHeader(
        dom('b', 'Server code'), ' (contains a problem)'
      ),
      cssSource((elem) => { fetchServerCode().then(code => { elem.innerHTML = code; }); }),
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
`);

dom.update(document.body, buildPageDom());
