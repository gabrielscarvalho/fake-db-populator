import { iParser } from '../../interfaces';
import { NumberParser } from './number.parser';
export declare class IntParser extends NumberParser implements iParser {
    type: string;
    precision: number;
    description: string;
}
