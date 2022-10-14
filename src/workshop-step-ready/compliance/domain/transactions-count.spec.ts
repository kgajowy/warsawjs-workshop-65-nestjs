import { TransactionsCount } from './transactions-count';
import { VerificationLevelValue } from './verification-level';

describe(TransactionsCount.name, () => {
  // nice presentation but not type-safe
  test.each`
    count  | expected
    ${0}   | ${VerificationLevelValue.TIER_NONE}
    ${1}   | ${VerificationLevelValue.TIER_NONE}
    ${9}   | ${VerificationLevelValue.TIER_NONE}
    ${10}  | ${VerificationLevelValue.TIER_1}
    ${11}  | ${VerificationLevelValue.TIER_1}
    ${49}  | ${VerificationLevelValue.TIER_1}
    ${50}  | ${VerificationLevelValue.TIER_2}
    ${51}  | ${VerificationLevelValue.TIER_2}
    ${99}  | ${VerificationLevelValue.TIER_2}
    ${100} | ${VerificationLevelValue.TIER_3}
    ${101} | ${VerificationLevelValue.TIER_3}
    ${999} | ${VerificationLevelValue.TIER_3}
  `(
    '$count transaction(s) should require $expected verification level',
    ({ count, expected }) => {
      expect(new TransactionsCount({ count }).check().level).toEqual(expected);
    },
  );
});
