import { UserNationality } from './user-nationality';
import { VerificationLevelValue } from './verification-level';

describe(UserNationality.name, () => {
  test('user is from Philippines', () => {
    expect(
      new UserNationality({
        userNationality: 'PLH',
        highRiskCountries: ['PLH', 'POL'],
      }).check().level,
    ).toEqual(VerificationLevelValue.TIER_3);
  });

  test('user is from high risk country', () => {
    expect(
      new UserNationality({
        userNationality: 'POL',
        highRiskCountries: ['PLH', 'POL'],
      }).check().level,
    ).toEqual(VerificationLevelValue.TIER_2);
  });

  test('user is not from high risk country', () => {
    expect(
      new UserNationality({
        userNationality: 'GER',
        highRiskCountries: ['PLH', 'POL'],
      }).check().level,
    ).toEqual(VerificationLevelValue.TIER_NONE);
  });
});
