import { iDatabaseReservedWords, iParser } from '../../interfaces';
import { Parser } from './parser';
export declare class DateParser extends Parser implements iParser {
    format: string;
    type: string;
    description: string;
    constructor(reservedWords: iDatabaseReservedWords, format?: string);
    parse(val: Date): string;
}
