import moment from 'moment';
import { iDatabaseReservedWords } from '../../interfaces';
import { DateParser } from './date.parser';

export class DateTimeParser extends DateParser {

  public type: string = 'datetime';

  public constructor(reservedWords: iDatabaseReservedWords, format: string = 'YYYY-MM-DD hh:mm:ss') {
    super(reservedWords, format);
  }
}