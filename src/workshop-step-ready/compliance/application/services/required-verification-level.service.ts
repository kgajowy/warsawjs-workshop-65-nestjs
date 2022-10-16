import { Injectable } from '@nestjs/common';
import { HighestOf } from '../../domain/highest-of';
import { TransactionsCount } from '../../domain/transactions-count';
import { TransactionsVolume } from '../../domain/transactions-volume';
import { UserNationality } from '../../domain/user-nationality';
import { VerificationLevelValue } from '../../domain/verification-level';
import { HighRiskCountriesRepo } from '../interfaces/high-risk-countries.repo';
import { UserDataRepo } from '../interfaces/user-data.repo';
import { UserTransactionsRepo } from '../interfaces/user-transactions.repo';

@Injectable()
export class RequiredVerificationLevelService {
  constructor(
    private readonly userDataRepo: UserDataRepo,
    private readonly transactionsRepo: UserTransactionsRepo,
    private readonly highRiskCountriesRepo: HighRiskCountriesRepo,
  ) {}

  async getFor(userId: string): Promise<VerificationLevelValue> {
    const userData = await this.userDataRepo.getFor(userId);
    const transactionsData = await this.transactionsRepo.getFor(userId);
    const highRiskCountries = await this.highRiskCountriesRepo.get();

    const rule = new HighestOf([
      new TransactionsCount({
        count: transactionsData.count,
      }),
      new TransactionsVolume({
        volumeInEuro: transactionsData.volumeInEuro,
      }),
      new UserNationality({
        userNationality: userData.userNationality,
        highRiskCountries,
      }),
    ]);

    const requiredVerification = rule.check();

    // log
    // persistence
    // error handling

    return requiredVerification.level;
  }
}
