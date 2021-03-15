import { iDatabaseReservedWords } from '../../interfaces';
export declare abstract class Parser {
    reservedWords: iDatabaseReservedWords;
    constructor(reservedWords: iDatabaseReservedWords);
    addQuotes(value: string): string;
    getNullString(): string;
    addQuotesForEntities(value: string): string;
}
