import { VerificationLevel } from './verification-level';

export abstract class VerificationRule {
  abstract check(): VerificationLevel;
}
