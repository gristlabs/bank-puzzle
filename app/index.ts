import {dom, styled} from 'grainjs';

const accountIds = ['A', 'B', 'C'];

function buildPageDom() {
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
      cssToolbar(
        'Transfer from',
        cssSelect(accountIds.map((accId) => dom('option', {value: accId}, accId))),
        'to',
        cssSelect(accountIds.map((accId) => dom('option', {value: accId}, accId))),
        cssButton('Transfer'),
      ),
      cssIntro(
        dom('b', 'Client code'), ' (for you to write)'
      ),
      cssSource(
        '...'
      ),
    ),
    cssServer(
      cssToolbar(
        'Balances:',
        accountIds.map((accId) => cssBalance(cssAccountId(accId), cssAccountBalance('???'))),
      ),
      cssIntro(
        dom('b', 'Server code'), ' (contains a problem)'
      ),
      cssSource(
        '...'
      ),
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
  padding: 20px;
  border-right: 1px solid lightgrey;
`);

const cssServer = styled('div', `
  flex: 1 0 0px;
  padding: 20px;
`);

const cssIntro = styled('div', `
  & > p {
    margin: 0 0 10px 0;
    line-height: 1.2;
  }
`);

const cssToolbar = styled('div', `
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 6px;
  padding: 10px 20px;
`);

const cssSelect = styled('select', `
  padding: 4px 10px;
`);

const cssButton = styled('div', `
  background-color: #7ab6ca;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
`);

const cssBalance = styled('div', `
  margin: 0 10px;
  border: 1px solid grey;
  border-radius: 4px;
  display: flex;
  align-items: center;
`);

const cssAccountId = styled('div', `
  padding: 6px 10px;
  background-color: grey;
  color: white;
`);

const cssAccountBalance = styled('div', `
  padding: 4px 8px;
`);

const cssSource = styled('pre', `
  border: 1px solid #7ab6ca;
  border-radius: 6px;
  padding: 10px;
`);

dom.update(document.body, buildPageDom());
