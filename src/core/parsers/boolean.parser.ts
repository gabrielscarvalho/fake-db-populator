import { iParser } from '../../interfaces';
import { Parser } from './parser';

export class BooleanParser extends Parser implements iParser {
  public type: string = 'boolean';
  public description: string = `Parses values to boolean.`;

  public parse(val: any): string {
    if (val === undefined || val === null) {
      return this.getNullString();
    }

    const bool = this.reservedWords.boolean;
    return !!val ? bool.true : bool.false;
  }
}
