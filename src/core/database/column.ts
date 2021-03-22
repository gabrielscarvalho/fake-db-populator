import { iColumn, iParser, iTable, iValueGenerator } from '../../interfaces';

export class Column implements iColumn {
  public table: iTable;
  public name: string;
  public parser: iParser;
  public valueGen: iValueGenerator;
  public isPartOfUniqueKey: false;

  public constructor(table: iTable, name: string, parser: iParser, valueGen: iValueGenerator) {
    this.table = table;
    this.name = name;
    this.parser = parser;
    this.valueGen = valueGen;
  }
}
