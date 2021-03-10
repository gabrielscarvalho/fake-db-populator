import { runInThisContext } from 'vm';
import { iColumn, iDatabase, iMap, iParser, iTable, iValueGenerator } from '../../interfaces';
import { NamedMap } from '../utils/map';

export class Table implements iTable {
  name: string;
  database: iDatabase;
  columns: NamedMap<iColumn>;


  public constructor(database: iDatabase, name: string) {
    this.name = name;
    this.database = database;
  }


  public addColumn(columnKey: string, type: string | iParser, valueGen: iValueGenerator, columnName?: string) :iTable {
    return null;
  }

  public addForeignColumn(columnKey: string, referenceColumn: iColumn, columnName?: string): iTable {
    return null;
  }
  
}