import {
  SomeRule,
  transactionCountRule,
  transactionsVolumeRule,
  userNationalityRule,
} from './rules';

export class UserKindPolicy {
  constructor(private readonly userKind: 'private' | 'company') {}

  getRules(): SomeRule[] {
    if (this.userKind === 'private') {
      return [userNationalityRule];
    }
    return [transactionCountRule, transactionsVolumeRule];
  }
}
