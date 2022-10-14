export enum VerificationLevelValue {
  TIER_NONE = 'TIER_NONE',
  TIER_1 = 'TIER_1',
  TIER_2 = 'TIER_2',
  TIER_3 = 'TIER_3',
}

export class VerificationLevel {
  private static order: Record<VerificationLevelValue, number> = {
    [VerificationLevelValue.TIER_NONE]: 0,
    [VerificationLevelValue.TIER_1]: 10,
    [VerificationLevelValue.TIER_2]: 20,
    [VerificationLevelValue.TIER_3]: 30,
  };

  constructor(public readonly level: VerificationLevelValue) {}

  static compareHighestOnTop(a: VerificationLevel, b: VerificationLevel) {
    return Math.sign(
      VerificationLevel.order[b.level] - VerificationLevel.order[a.level],
    );
  }
}
