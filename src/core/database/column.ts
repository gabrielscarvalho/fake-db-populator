import { iColumn, iParser, iTable, iValueGenerator } from '../../interfaces';

export class Column implements iColumn {
  public table: iTable;
  public name: string;
  public parser: iParser;
  public valueGen: iValueGenerator;
  public isPartOfUniqueKey: boolean = false;

  /**
   * **WARNING**: Do not create this object by yourself.
   * Use `database.addTable(tableName).addColumn` instead
   */
  public constructor(table: iTable, name: string, parser: iParser, valueGen: iValueGenerator) {
    this.table = table;
    this.name = name;
    this.parser = parser;
    this.valueGen = valueGen;
  }
}
