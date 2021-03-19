import { Database } from '../core/database/database';
import { BooleanParser } from '../core/parsers/boolean.parser';
import { DateParser } from '../core/parsers/date.parser';
import { DateTimeParser } from '../core/parsers/datetime.parser';
import { IntParser } from '../core/parsers/int.parser';
import { NumberParser } from '../core/parsers/number.parser';
import { RawParser } from '../core/parsers/raw.parser';
import { StringParser } from '../core/parsers/string.parser';
import { iDatabase, iDataRowParsed } from '../interfaces';
import { DatabaseReservedWords } from '../shortcut/database';

export class PostgresDatabase extends Database implements iDatabase {
 
  public constructor() {
    // change reserved words if your database has any structural diff from Postgres
    const reservedWords = new DatabaseReservedWords();
    super(reservedWords);

    this.addParser(new StringParser(reservedWords));
    this.addParser(new NumberParser(reservedWords));
    this.addParser(new IntParser(reservedWords));
    this.addParser(new DateParser(reservedWords));
    this.addParser(new DateTimeParser(reservedWords));
    this.addParser(new RawParser(reservedWords));
    this.addParser(new BooleanParser(reservedWords));
  }

  protected createComment(comment: string): string {
    return `/* ${comment} */`;
  }

  protected createInsertQuery(dataRow: iDataRowParsed) : string {
    const columns: string = dataRow.values.getKeys().join(', ');   
    const values: string  = dataRow.values.getValues().join(', ');
   
    const table = dataRow.tableName;

    return `INSERT INTO ${table} (${columns}) VALUES (${values});`;
  }

  protected createDeleteQuery(dataRow: iDataRowParsed): string {
    const tableName = dataRow.tableName;
    
    const whereData: string[] = [];

    dataRow.unique.forEachEntry((columnName: string, value: string) => {
      whereData.push(`${columnName}=${value}`);
    });

    const where = whereData.join(' AND ');

    return `DELETE FROM ${tableName} WHERE ${where};`;
  }
}