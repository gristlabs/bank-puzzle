import {moneyLaunderingCheck} from './verify';

export type AccountId = string;

// This simple bank maintains account balances in this map.
const bankBalances: Map<AccountId, number> = new Map();

// Initialize the bankBalances to 3 accounts, each starting out with an initial balankce of $1000.
export async function initialize() {
  bankBalances.clear();
  bankBalances.set("A", 1000);
  bankBalances.set("B", 1000);
  bankBalances.set("C", 1000);
}

// Method to retrieve the balance for an account.
export async function getBalance(accountId: AccountId): Promise<number> {
  const balance = bankBalances.get(accountId);
  if (typeof balance !== 'number') {
    throw new Error(`Invalid accountID ${accountId}`);
  }
  return balance;
}

// Method to transfer a given amount from one account to another. The amount must be positive, and
// must not exceed the balance in accFrom account.
export async function transfer(accFrom: AccountId, accTo: AccountId, amount: number) {
  if (accFrom === accTo) {
    throw new Error(`Transfer accounts must be different`);
  }
  const balanceFrom = await getBalance(accFrom);
  const balanceTo = await getBalance(accTo);

  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error(`Invalid amount ${amount}`);
  }
  if (amount > balanceFrom) {
    throw new Error(`Insufficient balance`);
  }

  // For larger amounts, run some extra checks. These are quite fast, taking around 100ms, and
  // happen to always pass. They never touch the bankBalances map.
  if (amount > 1000) {
    await moneyLaunderingCheck(accFrom, accTo, amount);
  }

  bankBalances.set(accFrom, balanceFrom - amount);
  bankBalances.set(accTo, balanceTo + amount);
}

