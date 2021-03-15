import { iParser } from '../../interfaces';
import { Parser } from './parser';


export class RawParser extends Parser implements iParser {

  public type: string = 'raw';
  public description: string = 'Will not parse. The received value will be used directly on the query. You can use this type to send functions, like NOW()';

  public parse(val: any): string {
    return String(val);
  }
}