import {
  VerificationLevel,
  VerificationLevelValue,
} from './verification-level';
import { VerificationRule } from './verification-rule';

export interface Transactions {
  count: number;
}

export class TransactionsCount implements VerificationRule {
  constructor(private readonly transactions: Transactions) {}

  check(): VerificationLevel {
    if (this.transactions.count < 10) {
      return new VerificationLevel(VerificationLevelValue.TIER_NONE);
    }

    if (this.transactions.count < 50) {
      return new VerificationLevel(VerificationLevelValue.TIER_1);
    }

    if (this.transactions.count < 100) {
      return new VerificationLevel(VerificationLevelValue.TIER_2);
    }

    return new VerificationLevel(VerificationLevelValue.TIER_3);
  }
}
