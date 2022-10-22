import { SomeRule } from '../../domain/rules';
import { VerificationRule } from '../../domain/verification-rule';

export abstract class RuleCreator {
  abstract create(userId: string): Promise<VerificationRule>;

  abstract type(): SomeRule;
}

export const ruleCreatorsToken = Symbol('rule-creators-token');
