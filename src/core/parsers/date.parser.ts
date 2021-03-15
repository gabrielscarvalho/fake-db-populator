import moment from 'moment';
import { iDatabaseReservedWords, iParser } from '../../interfaces';
import { NumberParser } from './number.parser';
import { Parser } from './parser';

export class DateParser extends Parser implements iParser {

  public type: string = 'date';
  public description: string;

  public constructor(reservedWords: iDatabaseReservedWords, public format: string = 'YYYY-MM-DD' ) {
    super(reservedWords);
    this.description = `Parse date to format: "${this.format}"`;
  }

  public parse(val: Date): string {
    const dateString: string = moment(val).format(this.format);
    return this.addQuotes(dateString);
  }
}