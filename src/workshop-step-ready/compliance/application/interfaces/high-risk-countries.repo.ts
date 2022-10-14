export abstract class HighRiskCountriesRepo {
  abstract get(): Promise<string[]>;
}
