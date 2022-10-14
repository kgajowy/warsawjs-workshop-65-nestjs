import { CountryData } from '../../domain/user-nationality';

export abstract class UserDataRepo {
  abstract getFor(userId: string): Promise<CountryData>;
}
