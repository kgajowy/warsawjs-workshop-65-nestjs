import { Module } from '@nestjs/common';
import { HighRiskCountriesRepo } from '../application/interfaces/high-risk-countries.repo';
import { UserDataRepo } from '../application/interfaces/user-data.repo';
import { UserTransactionsRepo } from '../application/interfaces/user-transactions.repo';
import { RequiredVerificationLevelService } from '../application/services/required-verification-level.service';
import {
  InMemoryHighCountries,
  InMemoryTransactionsRepo,
} from '../infrastructure/in-memory/repos';
import { VerificationRulesService } from './verification-rules.service';

@Module({
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
  ],
  exports: [VerificationRulesService],
})
export class VerificationLevelRulesModule {}
