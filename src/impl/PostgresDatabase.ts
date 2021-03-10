import { Database } from '../core/database/database';
import { NumberParser } from '../core/parsers/number.parser';
import { StringParser } from '../core/parsers/string.parser';
import { iDatabase } from '../interfaces';

export class PostgresDatabase extends Database implements iDatabase {

  public constructor() {
    super();
    this.addParser(new StringParser());
    this.addParser(new NumberParser());
  }
}