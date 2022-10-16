import { Injectable } from '@nestjs/common';
import { RequiredVerificationLevelService } from '../application/services/required-verification-level.service';
import { VerificationLevelValue } from '../domain/verification-level';

export { VerificationLevelValue };

@Injectable()
export class VerificationRulesService {
  constructor(private readonly rules: RequiredVerificationLevelService) {}

  getFor: RequiredVerificationLevelService['getFor'] = (...args) =>
    this.rules.getFor(...args);
}
