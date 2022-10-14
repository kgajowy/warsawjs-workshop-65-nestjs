import { HighestOf } from './highest-of';
import {
  VerificationLevel,
  VerificationLevelValue,
} from './verification-level';
import { VerificationRule } from './verification-rule';

describe(HighestOf.name, () => {
  test('no verification rules', () => {
    expect(new HighestOf([]).check().level).toEqual(
      VerificationLevelValue.TIER_NONE,
    );
  });

  test('single verification rule', () => {
    expect(
      new HighestOf([
        new FixedVerificationLevel(VerificationLevelValue.TIER_2),
      ]).check().level,
    ).toEqual(VerificationLevelValue.TIER_2);
  });

  test('multiple verification rules', () => {
    expect(
      new HighestOf([
        new FixedVerificationLevel(VerificationLevelValue.TIER_2),
        new FixedVerificationLevel(VerificationLevelValue.TIER_NONE),
        new FixedVerificationLevel(VerificationLevelValue.TIER_3),
        new FixedVerificationLevel(VerificationLevelValue.TIER_1),
      ]).check().level,
    ).toEqual(VerificationLevelValue.TIER_3);
  });
});

class FixedVerificationLevel implements VerificationRule {
  private readonly level: VerificationLevel;

  constructor(value: VerificationLevelValue) {
    this.level = new VerificationLevel(value);
  }

  check(): VerificationLevel {
    return this.level;
  }
}
