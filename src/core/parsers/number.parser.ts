import { isNumber, isObject, isString } from 'lodash';
import { iDatabaseReservedWords, iParser } from '../../interfaces';
import { Parser } from './parser';

export class NumberParser extends Parser implements iParser {
  public type: string = 'number';
  public precision: number = 2;
  public description: string = 'Parse number to float or int string';

  public constructor(reservedWords: iDatabaseReservedWords, precision: number = 2) {
    super(reservedWords);
    this.description = `Parse number to number with precision: ${precision}`;
  }

  public parse(val: any): string {
    if (val === null || val === undefined) {
      return this.getNullString();
    }

    if ((!isString(val) && !isNumber(val)) || isNaN(Number(val))) {
      throw new Error(
        'NumberParser received invalid value: object. Valid values are: number or string. Received value:' + val
      );
    }

    let preparedValue: string = null;

    if (this.precision === 0) {
      preparedValue = String(parseInt(String(val)));
    } else {
      preparedValue = parseFloat(String(val)).toFixed(this.precision);
    }

    return preparedValue;
  }

  public static withPrecision(reservedWords: iDatabaseReservedWords, type: string, precision: number) {
    const parser = new NumberParser(reservedWords, precision);
    parser.type = type;
    parser.precision = precision;
    return parser;
  }
}
