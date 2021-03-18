import { iParser } from '../../interfaces';
import { Parser } from './parser';


/**
 * Parser for table attributes like: column name and table name.
*/
export class EntityParser extends Parser implements iParser {

  public type: string = 'entity';
  public description: string = 'Parser for table attributes, like column name and table name.';

  public parse(val: any): string {
    return this.addQuotesForEntities(val);
  }
}