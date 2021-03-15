import { iParser } from '../../interfaces';
import { Parser } from './parser';
export declare class BooleanParser extends Parser implements iParser {
    type: string;
    description: string;
    parse(val: any): string;
}
