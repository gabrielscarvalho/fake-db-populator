import { iDatabase, iDataRow, iParser, iTable } from '../../interfaces';
import { Table } from './table';
import { NamedMap } from '../utils/map';
import { Optional } from '../utils/optional';
import QueryCommand from '../query-builder/query-command.enum';

export abstract class Database implements iDatabase {

  public tables: NamedMap<iTable>;
  public parsers: NamedMap<iParser>;

  public constructor() {
    this.tables = new NamedMap<iTable>();
    this.parsers = new NamedMap<iParser>();
  }

  public addParser(parser: iParser): iDatabase {
    this.parsers.add(parser.type, parser);
    return this;
  }

  public getParser(parserName: string): iParser {
    const optParser: Optional<iParser> = this.parsers.get(parserName, { throwIfNotExists: true });
    return optParser.get({ skipValidation: true });
  }

  public addTable(tableName: string): iTable {
    const table = new Table(this, tableName);
    this.tables.add(tableName, table, { throwIfExists : true });
    return table;
  }

  public getTable(tableName: string): iTable {
    const optTable: Optional<iTable> = this.tables.get(tableName, { throwIfNotExists: true });
    return optTable.get({ skipValidation: true });
  }


  public insert(tableName: string, extraData: object): iDataRow {
    return this.getTable(tableName)
      .createNewDataRow(QueryCommand.INSERT, extraData);
  }
}