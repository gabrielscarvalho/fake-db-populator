import { iParser } from '../../interfaces';
import { Parser } from './parser';
export declare class EntityParser extends Parser implements iParser {
    type: string;
    description: string;
    parse(val: any): string;
}
