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

  public parse(val: number): string {
    let preparedValue: string = null;
  
    if (this.precision === 0) {
      preparedValue = String(parseInt(String(val)));
    } else {
      preparedValue = parseFloat(String(val)).toFixed(this.precision);
    }

    return (!!val) ? preparedValue : this.getNullString();
  }

  public static withPrecision(reservedWords: iDatabaseReservedWords, type: string, precision: number) {
    const parser = new NumberParser(reservedWords, precision);
    parser.type = type;
    parser.precision = precision;
    return parser;
  }
}