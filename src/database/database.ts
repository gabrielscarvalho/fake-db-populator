import { ParserNotFoundException } from '../exception/parser-not-found.exception';
import { TableNotFoundException } from '../exception/table-not-found.exception';
import { iDatabase, iParser, iTable } from '../interfaces';
import { Table } from './table';

export class Database implements iDatabase {

  private tables: Map<string, iTable>;
  private parsers: Map<string, iParser>;

  public constructor() {
    this.tables = new Map<string, iTable>();
  }

  public addParser(parser: iParser): iDatabase {
    this.parsers.set(parser.type, parser);
    return this;
  }

  public getParser(parserName: string): iParser {
    if (!this.parsers.has(parserName)) {
      throw new ParserNotFoundException(parserName);
    }
    return this.parsers.get(parserName);
  }

  public addTable(tableName: string): iTable {
    const table = new Table();
    this.tables.set(tableName, table);
    return table;
  }

  public getTable(tableName: string): iTable {
    if (!this.tables.has(tableName)) {
      throw new TableNotFoundException(tableName);
    }
    return this.tables.get(tableName);
  }
}