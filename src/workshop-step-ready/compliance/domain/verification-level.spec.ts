import {
  VerificationLevel,
  VerificationLevelValue,
} from './verification-level';

describe(VerificationLevel.name, () => {
  test('order VL', () => {
    const unorderedList = [
      VerificationLevelValue.TIER_2,
      VerificationLevelValue.TIER_1,
      VerificationLevelValue.TIER_3,
      VerificationLevelValue.TIER_NONE,
    ];
    const valueObjects = unorderedList.map((vl) => new VerificationLevel(vl));

    expect(
      [...valueObjects]
        .sort(VerificationLevel.compareHighestOnTop)
        .map((v) => v.level),
    ).toEqual([
      VerificationLevelValue.TIER_3,
      VerificationLevelValue.TIER_2,
      VerificationLevelValue.TIER_1,
      VerificationLevelValue.TIER_NONE,
    ]);
  });
});
