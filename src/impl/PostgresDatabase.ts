import { Database } from '../core/database/database';
import { BooleanParser } from '../core/parsers/boolean.parser';
import { DateParser } from '../core/parsers/date.parser';
import { DateTimeParser } from '../core/parsers/datetime.parser';
import { IntParser } from '../core/parsers/int.parser';
import { NumberParser } from '../core/parsers/number.parser';
import { RawParser } from '../core/parsers/raw.parser';
import { StringParser } from '../core/parsers/string.parser';
import { iDatabase, iDataRow, iDataRowColumn } from '../interfaces';

export class PostgresDatabase extends Database implements iDatabase {
 

  public constructor() {
    super();

    this.addParser(new StringParser(this.reservedWords));
    this.addParser(new NumberParser(this.reservedWords));
    this.addParser(new IntParser(this.reservedWords));
    this.addParser(new DateParser(this.reservedWords));
    this.addParser(new DateTimeParser(this.reservedWords));
    this.addParser(new RawParser(this.reservedWords));
    this.addParser(new BooleanParser(this.reservedWords));
  }


  protected createComment(comment: string): string {
    return `/* ${comment} */ `;
  }

  protected createInsertQuery(dataRow: iDataRow) : string {
    const columns: string = dataRow.getColumnsName().join(', ');
    const values: string  = dataRow.getColumnsParsedValue().join(', ');
    const table = dataRow.table.name;
    return `INSERT INTO ${table} (${columns}) VALUES (${values});`;
  }


  protected createDeleteQuery(dataRow: iDataRow): string {
    const table = dataRow.table.name;

    const dataRowColumns: iDataRowColumn[] = dataRow.getUniqueKeyColumns();

    const whereData: string[] = [];
    (dataRowColumns || []).forEach((dataRowColumn: iDataRowColumn) => {
      whereData.push(`${dataRowColumn.getColumnName()}=${dataRowColumn.parsedValue}`);
    });

    const where = whereData.join(' AND ');

    return `DELETE FROM ${table} WHERE ${where};`;
  }
}