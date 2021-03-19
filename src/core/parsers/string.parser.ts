import { iParser } from '../../interfaces';
import { Parser } from './parser';

export class StringParser extends Parser implements iParser {
  public type: string = 'string';
  public description: string = 'Parse as simple string';

  public parse(val: any): string {
    if (val !== null && val !== undefined) {
      if (typeof val === 'object') {
        throw new Error(
          'StringParser received invalid value: object. Valid values are: string or number. Received value:' +
            val
        );
      }

      return this.addQuotes(val);
    } else {
      return this.getNullString();
    }
  }
}
