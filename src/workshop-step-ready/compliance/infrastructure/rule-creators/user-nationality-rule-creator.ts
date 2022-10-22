import { Injectable } from '@nestjs/common';
import { HighRiskCountriesRepo } from '../../application/interfaces/high-risk-countries.repo';
import { RuleCreator } from '../../application/interfaces/rule-creator';
import { UserDataRepo } from '../../application/interfaces/user-data.repo';
import { SomeRule, userNationalityRule } from '../../domain/rules';
import { UserNationality } from '../../domain/user-nationality';
import { VerificationRule } from '../../domain/verification-rule';

@Injectable()
export class UserNationalityRuleCreator implements RuleCreator {
  constructor(
    private readonly userDataRepo: UserDataRepo,
    private readonly highRiskCountriesRepo: HighRiskCountriesRepo,
  ) {}

  async create(userId: string): Promise<VerificationRule> {
    const userData = await this.userDataRepo.getFor(userId);
    const highRiskCountries = await this.highRiskCountriesRepo.get();
    return new UserNationality({
      userNationality: userData.userNationality,
      highRiskCountries,
    });
  }

  type(): SomeRule {
    return userNationalityRule;
  }
}
