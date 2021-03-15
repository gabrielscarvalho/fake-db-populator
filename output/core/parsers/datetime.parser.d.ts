import { iDatabaseReservedWords } from '../../interfaces';
import { DateParser } from './date.parser';
export declare class DateTimeParser extends DateParser {
    type: string;
    constructor(reservedWords: iDatabaseReservedWords, format?: string);
}
