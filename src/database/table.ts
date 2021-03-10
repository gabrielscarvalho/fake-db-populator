import { iColumn, iDatabase, iMap, iParser, iTable, iValueGenerator } from '../interfaces';

export class Table implements iTable {
  name: string;
  database: iDatabase;
  columns: iMap<iColumn>;

  public addColumn(columnKey: string, type: string | iParser, valueGen: iValueGenerator, columnName?: string) :iTable {
    return null;
  }

  public addForeignColumn(columnKey: string, referenceColumn: iColumn, columnName?: string): iTable {
    return null;
  }
  
}