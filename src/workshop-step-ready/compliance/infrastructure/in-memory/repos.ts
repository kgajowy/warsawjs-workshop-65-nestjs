import { HighRiskCountriesRepo } from '../../application/interfaces/high-risk-countries.repo';
import { UserTransactionsRepo } from '../../application/interfaces/user-transactions.repo';

export class InMemoryHighCountries implements HighRiskCountriesRepo {
  countries: string[] = [];

  async get() {
    return Promise.resolve(this.countries);
  }
}

export class InMemoryTransactionsRepo implements UserTransactionsRepo {
  transactionsInEuro: number[] = [];

  async getFor(_userId: string): ReturnType<UserTransactionsRepo['getFor']> {
    return Promise.resolve({
      count: this.transactionsInEuro.length,
      volumeInEuro: this.transactionsInEuro.reduce((acc, val) => acc + val, 0),
    });
  }
}
