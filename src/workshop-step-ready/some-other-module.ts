import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  VerificationLevelCalculated,
  VerificationLevelCalculatedPayload,
} from './compliance/public/verification-level-calculated';

@Injectable()
export class SomeOtherModule {
  @OnEvent(VerificationLevelCalculated)
  handle(event: VerificationLevelCalculatedPayload) {
    console.log(`oh someone needs to be verified!`, event);
  }
}
