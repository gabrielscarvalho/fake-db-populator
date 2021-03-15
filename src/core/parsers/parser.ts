import { iDatabaseReservedWords } from '../../interfaces';


export abstract class Parser {

  public constructor(public reservedWords: iDatabaseReservedWords) {}
  
  public addQuotes(value: string): string {
    const quote = this.reservedWords.quotes;
    return `${quote}${value}${quote}`;
  }
  
  public getNullString(): string {
    return this.reservedWords.null;
  }
}