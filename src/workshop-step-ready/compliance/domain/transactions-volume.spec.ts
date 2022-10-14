import { TransactionsVolume } from './transactions-volume';
import { VerificationLevelValue } from './verification-level';

describe(TransactionsVolume.name, () => {
  // nice presentation but not type-safe
  test.each`
    volumeInEuro | expected
    ${0}         | ${VerificationLevelValue.TIER_NONE}
    ${1}         | ${VerificationLevelValue.TIER_NONE}
    ${499}       | ${VerificationLevelValue.TIER_NONE}
    ${500}       | ${VerificationLevelValue.TIER_1}
    ${1_000}     | ${VerificationLevelValue.TIER_1}
    ${9_999}     | ${VerificationLevelValue.TIER_1}
    ${10_000}    | ${VerificationLevelValue.TIER_2}
    ${10_001}    | ${VerificationLevelValue.TIER_2}
    ${49_999}    | ${VerificationLevelValue.TIER_2}
    ${50_000}    | ${VerificationLevelValue.TIER_3}
    ${50_001}    | ${VerificationLevelValue.TIER_3}
    ${99_999}    | ${VerificationLevelValue.TIER_3}
  `(
    '$volumeInEuro EUR should require $expected verification level',
    ({ volumeInEuro, expected }) => {
      expect(new TransactionsVolume({ volumeInEuro }).check().level).toEqual(
        expected,
      );
    },
  );
});
