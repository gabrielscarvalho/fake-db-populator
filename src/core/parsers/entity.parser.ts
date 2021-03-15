import { iParser } from '../../interfaces';
import { Parser } from './parser';


export class EntityParser extends Parser implements iParser {

  public type: string = 'entity';
  public description: string = 'Parser for column names. You should not use for values.';

  public parse(val: any): string {
    return this.addQuotesForEntities(val);
  }
}