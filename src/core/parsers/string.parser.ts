import { iParser } from '../../interfaces';
import { Parser } from './parser';


export class StringParser extends Parser implements iParser {

  public type: string = 'string';
  public description: string = 'Parse as simple string';

  public parse(val: any): string {
    return this.addQuotes(val);
  }
}