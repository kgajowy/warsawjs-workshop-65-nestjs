import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { VerificationLevelValue } from '../../domain/verification-level';
import {
  VerificationLevelCalculated,
  VerificationLevelCalculatedPayload,
} from '../../public/verification-level-calculated';
import { RulesFactory } from './rules-factory';

@Injectable()
export class RequiredVerificationLevelService {
  constructor(
    private readonly rulesFactory: RulesFactory,
    private readonly eventEmitter: EventEmitter2, // ideally, should be a port. Or hidden in persistence
  ) {}

  async getFor(userId: string): Promise<VerificationLevelValue> {
    const rule = await this.rulesFactory.getFor(userId, 'private');
    const requiredVerification = rule.check();

    {
      // persistence - to our database

      const payload: VerificationLevelCalculatedPayload = {
        userId,
        value: requiredVerification.level,
      };
      this.eventEmitter.emit(VerificationLevelCalculated, payload);
    }
    // when we will write results to database?
    // how to ensure it happens together? "transaction"
    // but... what if emitting fails? it would make our microservice dependent on others!
    // inbox / outbox pattern

    return requiredVerification.level;
  }
}
