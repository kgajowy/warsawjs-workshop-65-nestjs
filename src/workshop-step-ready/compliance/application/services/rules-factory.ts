import { Inject, Injectable } from '@nestjs/common';
import { HighestOf } from '../../domain/highest-of';
import { UserKindPolicy } from '../../domain/user-kind.policy';
import { VerificationRule } from '../../domain/verification-rule';
import { RuleCreator, ruleCreatorsToken } from '../interfaces/rule-creator';

@Injectable()
export class RulesFactory {
  constructor(
    @Inject(ruleCreatorsToken) private readonly creators: RuleCreator[],
  ) {}

  async getFor(
    userId: string,
    userKind: 'company' | 'private',
  ): Promise<VerificationRule> {
    const applicableRules = new UserKindPolicy(userKind).getRules();
    const rulesCreators = applicableRules
      .map((rule) => this.creators.find((creator) => creator.type() === rule))
      .filter((e) => !!e);
    const rules: VerificationRule[] = await Promise.all(
      rulesCreators.map((creator) => creator.create(userId)),
    );
    return new HighestOf(rules);
  }
}
