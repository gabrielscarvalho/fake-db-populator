import { iParser } from '../../interfaces';
import { Parser } from './parser';


export class StringParser extends Parser implements iParser {

  public type: string = 'string';
  public description: string = 'Parse as simple string';

  public parse(val: any): string {
    if (!!val) {
      return this.addQuotes(val);
    } else {
      return this.getNullString();
    }
  }
}