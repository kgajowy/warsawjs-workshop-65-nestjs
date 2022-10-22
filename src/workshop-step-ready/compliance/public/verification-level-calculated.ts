import { VerificationLevelValue } from '../domain/verification-level';

export const VerificationLevelCalculated = 'verification-level-calculated';

export interface VerificationLevelCalculatedPayload {
  value: VerificationLevelValue;
  userId: string;
}
