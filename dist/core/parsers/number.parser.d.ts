import { iDatabaseReservedWords, iParser } from '../../interfaces';
import { Parser } from './parser';
export declare class NumberParser extends Parser implements iParser {
    type: string;
    precision: number;
    description: string;
    constructor(reservedWords: iDatabaseReservedWords, precision?: number);
    parse(val: any): string;
    static withPrecision(reservedWords: iDatabaseReservedWords, type: string, precision: number): NumberParser;
}
