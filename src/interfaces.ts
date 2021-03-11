import QueryCommand from './core/query-builder/query-command.enum';
import { Optional } from './core/utils/optional';

export interface iMap<T> {
  has: (name: string) => boolean ;
  add: (name: string, content: T, config: { throwIfExists: boolean }) => iMap<T>;
  get: (name: string, config: { throwIfNotExists: boolean }) => Optional<T>;
  delete: (name: string, config: { throwIfNotExists: boolean }) => boolean;
  find: (filter: any) => Optional<T>;
  getKeys: () => string[];
  getValues: () =>T[];  
}

export interface iParser {
  type: string;
  parse(val: any): string;
}

export type iValueGenerator = () => any;

export interface iDataRowColumn {
  dataRow: iDataRow;
  column: iColumn;
  rawValue: any;
  parsedValue: string;
}

export interface iDataRow {
  data: iMap<iDataRowColumn>;
  queryCommand: QueryCommand;
  table: iTable;

  new: (queryCommand: QueryCommand, table: iTable, extraData: object) => iDataRow;
  getValue:(columnName: string) => iDataRowColumn;
}

export interface iColumn {
  table: iTable;
  key: string;
  name: string;
  parser: iParser;
  valueGen: iValueGenerator;
}

export interface iTable {
  name: string;
  database: iDatabase;
  data: iDataRow[];
  columns: iMap<iColumn>;

  /**
   * Return the last DataRow generated - if present.
  */
  getLastDataRow: () => Optional<iDataRow>;

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

  /**
   * Creates a new data object.
   * @param extraData object that contains the column key and value to be replaced.
   */
  createNewDataRow: (queryCommand: QueryCommand, extraData: object) => iDataRow;
}

export interface iDatabase {
  parsers: iMap<iParser>;
  tables: iMap<iTable>;

  addParser: (parser: iParser) => iDatabase;
  getParser: (parserName: string) => iParser;

  addTable: (tableName: string) => iTable;
  getTable: (tableName: string) => iTable;


  insert: (tableName: string, extraData: object) => iDataRow;

}


export interface iQueryBuilder {
  insert: (tableName: string, extraData: object) => iQueryBuilder;
}