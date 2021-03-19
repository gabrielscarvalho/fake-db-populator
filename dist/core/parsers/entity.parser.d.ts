import { iParser } from '../../interfaces';
import { Parser } from './parser';
/**
 * Parser for table attributes like: column name and table name.
 */
export declare class EntityParser extends Parser implements iParser {
    type: string;
    description: string;
    parse(val: any): string;
}
