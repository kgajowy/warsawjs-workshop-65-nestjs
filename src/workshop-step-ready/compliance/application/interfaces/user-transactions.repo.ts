export abstract class UserTransactionsRepo {
  abstract getFor(userId: string): Promise<{
    count: number;
    volumeInEuro: number;
  }>;
}
