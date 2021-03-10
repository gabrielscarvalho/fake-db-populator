import { iParser } from '../../interfaces';
import { Parser } from './parser';


export class NumberParser extends Parser implements iParser {

  public type: string = 'number';

  public parse(val: any): string {
    return (!!val) ? val : this.getNullString();
  }
}