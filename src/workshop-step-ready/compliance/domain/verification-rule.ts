import { SomeRule } from './rules';
import { VerificationLevel } from './verification-level';

export abstract class VerificationRule {
  abstract check(): VerificationLevel;

  abstract type(): SomeRule;
}
