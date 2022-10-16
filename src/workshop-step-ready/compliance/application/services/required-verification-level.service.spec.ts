import { Test } from '@nestjs/testing';
import {
  InMemoryHighCountries,
  InMemoryTransactionsRepo,
} from '../../infrastructure/in-memory/repos';
import { VerificationLevelValue } from '../../public/verification-rules.service';
import { HighRiskCountriesRepo } from '../interfaces/high-risk-countries.repo';
import { UserDataRepo } from '../interfaces/user-data.repo';
import { UserTransactionsRepo } from '../interfaces/user-transactions.repo';
import { RequiredVerificationLevelService } from './required-verification-level.service';

describe(RequiredVerificationLevelService.name, () => {
  let fixtures: Awaited<ReturnType<typeof getFixtures>>;

  beforeEach(async () => {
    fixtures = await getFixtures();
  });

  test('calculate required verification level', async () => {
    fixtures.givenCountryIsHighRisk('POL');
    fixtures.givenCountryIsHighRisk('DEN');
    fixtures.givenUserIsFrom('POL');
    fixtures.givenUserMadeATransaction(10);
    fixtures.givenUserMadeATransaction(99);
    fixtures.givenUserMadeATransaction(1_337);

    const result = await fixtures.requiredVerificationLevel.getFor('1234');
    expect(Object.keys(VerificationLevelValue).includes(result)).toBeTruthy();
  });
});

async function getFixtures() {
  const sandbox = await Test.createTestingModule({
    providers: [
      RequiredVerificationLevelService,
      {
        provide: UserDataRepo,
        useClass: FakeUserRepo,
      },
      {
        provide: UserTransactionsRepo,
        useClass: InMemoryTransactionsRepo,
      },
      {
        provide: HighRiskCountriesRepo,
        useClass: InMemoryHighCountries,
      },
    ],
  }).compile();

  const requiredVerificationLevel = sandbox.get(
    RequiredVerificationLevelService,
  );

  const userDataRepo: FakeUserRepo = sandbox.get(UserDataRepo);
  const transactionsRepo: InMemoryTransactionsRepo =
    sandbox.get(UserTransactionsRepo);
  const highRiskCountriesRepo: InMemoryHighCountries = sandbox.get(
    HighRiskCountriesRepo,
  );

  return {
    requiredVerificationLevel,
    givenCountryIsHighRisk: (countryIso3Code: string) => {
      highRiskCountriesRepo.countries.push(countryIso3Code);
    },
    givenUserMadeATransaction: (valueInEuro: number) => {
      transactionsRepo.transactionsInEuro.push(valueInEuro);
    },
    givenUserIsFrom: (countryIso3Code: string) => {
      userDataRepo.getFor.mockResolvedValue({
        userNationality: countryIso3Code,
      });
    },
  };
}

class FakeUserRepo implements UserDataRepo {
  getFor: jest.MockedFn<UserDataRepo['getFor']> = jest.fn();
}
