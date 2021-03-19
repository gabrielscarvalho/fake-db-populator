import { iDatabaseReservedWords } from '../../interfaces';

export abstract class Parser {
  public constructor(public reservedWords: iDatabaseReservedWords) {}

  public addQuotes(value: string): string {
    const quote = this.reservedWords.quotesForValues;
    return `${quote}${value}${quote}`;
  }

  public getNullString(): string {
    return this.reservedWords.null;
  }

  public addQuotesForEntities(value: string): string {
    const quote = this.reservedWords.quotesForEntities;
    return `${quote}${value}${quote}`;
  }
}
