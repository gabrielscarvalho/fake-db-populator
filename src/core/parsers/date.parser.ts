import moment from 'moment';

import { iDatabaseReservedWords, iParser } from '../../interfaces';
import { Parser } from './parser';

export class DateParser extends Parser implements iParser {
  public type: string = 'date';
  public description: string;

  public constructor(
    reservedWords: iDatabaseReservedWords,
    public format: string = 'YYYY-MM-DD'
  ) {
    super(reservedWords);
    this.description = `Parse date to format: "${this.format}"`;
  }

  public parse(val: Date): string {
    if (val === null || val === undefined) {
      return this.getNullString();
    }

    if (!(val instanceof Date)) {
      throw new Error(
        'DateParser received invalid value. Valid values are: Date. Received value:' +
          val
      );
    }

    const dateString: string = moment(val).format(this.format);
    return this.addQuotes(dateString);
  }
}
