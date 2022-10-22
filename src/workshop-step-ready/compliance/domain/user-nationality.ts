import { SomeRule, userNationalityRule } from './rules';
import {
  VerificationLevel,
  VerificationLevelValue,
} from './verification-level';
import { VerificationRule } from './verification-rule';

export interface CountryData {
  /**
   * ISO-3
   */
  userNationality: string;

  /**
   * ISO-3
   */
  highRiskCountries: string[];
}

export class UserNationality implements VerificationRule {
  constructor(private readonly countryData: CountryData) {}

  check(): VerificationLevel {
    if (this.countryData.userNationality === 'PLH') {
      return new VerificationLevel(VerificationLevelValue.TIER_3);
    }

    if (
      this.countryData.highRiskCountries.includes(
        this.countryData.userNationality,
      )
    ) {
      return new VerificationLevel(VerificationLevelValue.TIER_2);
    }
    return new VerificationLevel(VerificationLevelValue.TIER_NONE);
  }

  type(): SomeRule {
    return userNationalityRule;
  }
}
