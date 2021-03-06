import {dom, Observable, styled} from 'grainjs';
import * as bank from './bank';

const accountIds = ['A', 'B', 'C'];
const balanceObs = Observable.create(null, [0, 0, 0]);
const numTransfers = Observable.create(null, 0);

async function updateBalanceObs() {
  balanceObs.set(await Promise.all(accountIds.map(bank.getBalance)));
}

async function initialize() {
  try {
    numTransfers.set(0);
    return await bank.initialize();
  } finally {
    await updateBalanceObs();
  }
}

async function transfer(accFrom: bank.AccountId, accTo: bank.AccountId, amount: number) {
  try {
    numTransfers.set(numTransfers.get() + 1);
    return await bank.transfer(accFrom, accTo, amount);
  } finally {
    await updateBalanceObs();
  }
}

function buildPageDom() {
  initialize();
  const fmt = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  return [
    cssBody.cls(''),
    cssBalance(cssAccountBalance(dom.text(use => use(numTransfers) + ' transfers'))),
    accountIds.map((accId, i) =>
      cssBalance(cssAccountId(accId),
        cssAccountBalance(
          dom.text((use) => fmt.format(use(balanceObs)[i]))
        )
      )
    )
  ];
}

const cssBody = styled('div', `
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  font-size: 14px;

  display: flex;
  align-items: center;
`);

const cssBalance = styled('div', `
  margin: 0 10px 0 auto;
  border: 1px solid grey;
  border-radius: 4px;
  display: flex;
  align-items: center;
  white-space: nowrap;
`);

const cssAccountId = styled('div', `
  padding: 6px 10px;
  background-color: grey;
  color: white;
`);

const cssAccountBalance = styled('div', `
  padding: 4px 8px;
`);

dom.update(document.body, buildPageDom());
(window as any).bank = {
  initialize,
  transfer,
  getBalance: bank.getBalance,
  getNumTransfers: () => numTransfers.get(),
};
