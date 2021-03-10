import { Optional } from './core/utils/optional';

export interface iMap<T> {
  has: (name: string) => boolean ;
  add: (name: string, content: T, config: { throwIfExists: boolean }) => iMap<T>;
  get: (name: string, config: { throwIfNotExists: boolean }) => Optional<T>;
  delete: (name: string, config: { throwIfNotExists: boolean }) => boolean;
}

export interface iParser {
  type: string;
  parse(val: any): string;
}

export interface iValueGenerator {

}

export interface iDataCol {
  columnName: string;
  rawValue: any;
  parsedValue: string;
}

export interface iDataRow {
  cols: iMap<iDataCol>;
}

export interface iDataTable {

}



export interface iColumn {
  table: iTable;
  key: string;
  name: string;
  type: iParser;
  valueGen: iValueGenerator;
}

export interface iTable {
  name: string;
  database: iDatabase;

  columns: iMap<iColumn>;

  /**
   * Adds a new column to the table.
   * @param columnKey the unique name or nickname.
   * @param type the type of the column. 'string', 'number', or created parsers.
   * @param valueGen the function that will generate the value.
   * @param columnName the real name of the column in case of nicknames at columnKey
  */
  addColumn: (columnKey: string, type: string | iParser, valueGen: iValueGenerator, columnName?: string) => iTable;

  /**
   * Adds a new foreign column.
   * @param columnKey the unique name or nickname.
   * @param referenceColumn the column that is related.
   * @param columnName the real name of the column in case of nicknames at columnKey
  */
  addForeignColumn: (columnKey: string, referenceColumn: iColumn, columnName?: string) => iTable;
}

export interface iDatabase {
  parsers: iMap<iParser>;
  tables: iMap<iTable>;

  addParser: (parser: iParser) => iDatabase;
  getParser: (parserName: string) => iParser;

  addTable: (tableName: string) => iTable;
  getTable: (tableName: string) => iTable;
}

