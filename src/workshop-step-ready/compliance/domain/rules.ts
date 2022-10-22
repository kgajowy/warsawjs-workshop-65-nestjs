export const transactionCountRule = Symbol('transaction-count');
export const transactionsVolumeRule = Symbol('transactions-volume');
export const userNationalityRule = Symbol('user-nationality');

export const highestOfRule = Symbol('highest-of');

export type SomeRule =
  | typeof highestOfRule
  | typeof transactionCountRule
  | typeof transactionsVolumeRule
  | typeof userNationalityRule;
