import { iColumn, iDatabase, iDataRow, iParser, iTable, iValueGenerator } from '../../interfaces';
import { DataRow } from '../data/data-row';
import QueryCommand from '../query-builder/query-command.enum';
import { NamedMap } from '../utils/named.map';
import { Optional } from '../utils/optional';
import { Column } from './column';

export class Table implements iTable {
  public name: string;
  public database: iDatabase;
  public columns: NamedMap<iColumn>;

  protected _afterGenDataFn: (dataRow: iDataRow) => iDataRow = (dataRow: iDataRow) => dataRow;

  /**
   * **WARNING**: Do not create this object by yourself.
   * Use `database.addTable(tableName)` instead
   */
  public constructor(database: iDatabase, name: string) {
    this.name = name;
    this.database = database;
    this.columns = new NamedMap<iColumn>();
  }

  data: iDataRow[];

  public setUniqueKeys(...columnNames: string[]): iTable {
    if (columnNames.length == 0) {
      throw new Error('setUniqueKeys require at least 1 column');
    }

    columnNames.forEach((columnName: string) => {
      const column = this.getColumn(columnName);
      column.isPartOfUniqueKey = true;
    });

    return this;
  }

  public getUniqueKeyColumns(): iColumn[] {
    const uniqueColumns = this.columns.getValues().filter((column: iColumn) => {
      return column.isPartOfUniqueKey;
    });
    return uniqueColumns;
  }

  public addColumn(columnName: string, type: string, valueGen: iValueGenerator): iTable {
    const parser = this.database.getParser(type);
    const column: iColumn = new Column(this, columnName, parser, valueGen);

    if (!valueGen) {
      throw new Error(
        `Column: [${this.name}.${columnName}] is missing valueGenerator param. Example: table.addColumn('column_name', 'parser', valGeneratorFn);`
      );
    }

    this.columns.add(columnName, column, { throwIfExists: true });
    return this;
  }

  public getColumn(columnName: string): iColumn {
    return this.columns.getForced(columnName);
  }

  public getLastDataRow(): Optional<iDataRow> {
    return this.database.getLastDataRow(this.name);
  }

  public insert(extraData: object = {}, comment: string = null): iDataRow {
    const dataRow = this._afterGenDataFn(new DataRow(QueryCommand.INSERT, this, extraData, comment));

    dataRow.reApplyForcedValues();

    this.database.dangerous_addDataRow(dataRow);
    return dataRow;
  }

  public afterGenerateData(fn: (dataRow: iDataRow) => iDataRow): iTable {
    this._afterGenDataFn = fn;
    return this;
  }
}
