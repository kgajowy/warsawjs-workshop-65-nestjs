import {
  VerificationLevel,
  VerificationLevelValue,
} from './verification-level';
import { VerificationRule } from './verification-rule';

export interface Transactions {
  volumeInEuro: number;
}

export class TransactionsVolume implements VerificationRule {
  constructor(private readonly transactions: Transactions) {}

  check(): VerificationLevel {
    if (this.transactions.volumeInEuro < 500) {
      return new VerificationLevel(VerificationLevelValue.TIER_NONE);
    }

    if (this.transactions.volumeInEuro < 10_000) {
      return new VerificationLevel(VerificationLevelValue.TIER_1);
    }

    if (this.transactions.volumeInEuro < 50_000) {
      return new VerificationLevel(VerificationLevelValue.TIER_2);
    }

    return new VerificationLevel(VerificationLevelValue.TIER_3);
  }
}
