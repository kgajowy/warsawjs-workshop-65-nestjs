import { highestOfRule, SomeRule } from './rules';
import {
  VerificationLevel,
  VerificationLevelValue,
} from './verification-level';
import { VerificationRule } from './verification-rule';

export class HighestOf implements VerificationRule {
  constructor(private readonly from: VerificationRule[]) {}

  check(): VerificationLevel {
    return (
      this.from
        .map((rule) => rule.check())
        .sort(VerificationLevel.compareHighestOnTop)[0] ??
      new VerificationLevel(VerificationLevelValue.TIER_NONE)
    );
  }

  type(): SomeRule {
    return highestOfRule;
  }
}
