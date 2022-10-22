import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HighRiskCountriesRepo } from '../application/interfaces/high-risk-countries.repo';
import { ruleCreatorsToken } from '../application/interfaces/rule-creator';
import { UserDataRepo } from '../application/interfaces/user-data.repo';
import { UserTransactionsRepo } from '../application/interfaces/user-transactions.repo';
import { RequiredVerificationLevelService } from '../application/services/required-verification-level.service';
import { RulesFactory } from '../application/services/rules-factory';
import {
  InMemoryHighCountries,
  InMemoryTransactionsRepo,
} from '../infrastructure/in-memory/repos';
import { UserNationalityRuleCreator } from '../infrastructure/rule-creators/user-nationality-rule-creator';
import { VerificationRulesService } from './verification-rules.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    RequiredVerificationLevelService,
    VerificationRulesService,
    InMemoryHighCountries,
    InMemoryTransactionsRepo,
    {
      provide: UserDataRepo,
      useValue: {
        getFor: () => ({
          userNationality: 'POL',
        }),
      },
    },
    {
      provide: UserTransactionsRepo,
      useExisting: InMemoryTransactionsRepo,
    },
    {
      provide: HighRiskCountriesRepo,
      useExisting: InMemoryHighCountries,
    },
    {
      provide: ruleCreatorsToken,
      useFactory: (...creators) => [...creators],
      inject: [UserNationalityRuleCreator],
    },
    UserNationalityRuleCreator,
    RulesFactory,
  ],
  exports: [VerificationRulesService],
})
export class VerificationLevelRulesModule {}
