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

  protected _afterGenDataFn: (dataRow: iDataRow) => iDataRow = (dataRow: iDataRow) => (dataRow);

  public constructor(database: iDatabase, name: string) {
    this.name = name;
    this.database = database;
    this.columns = new NamedMap<iColumn>();
  }

  data: iDataRow[];


  public setUniqueKeys(...columnNames: string[]): iTable {

    (columnNames || []).forEach((columnName: string) => {
      const column = this.getColumn(columnName);
      column.isPartOfUniqueKey = true;
    });

    return this;
  }

  public getUniqueKeyColumns() : iColumn[] {
    const uniqueColumns = (this.columns.getValues() || []).filter((column: iColumn) => {
      return column.isPartOfUniqueKey;
    });
    return uniqueColumns;
  }

  public addColumn(columnName: string, type: string, valueGen: iValueGenerator) :iTable {

    const parser = this.database.getParser(type);
    const column: iColumn = new Column(this, columnName, parser, valueGen);

    this.columns.add(columnName, column, { throwIfExists: true });
    return this;
  }

  public getColumn(columnName: string): iColumn {
    const column: Optional<iColumn> =this.columns.get(columnName, { throwIfNotExists: true});
    return column.getForced();
  }

  public getLastDataRow() : Optional<iDataRow> {
    return this.database.getLastDataRow(this.name);
  }

  public createNewDataRowAndStore(queryCommand: QueryCommand, extraData: object = {}, comment: string = null) : iDataRow { 
    const dataRow = this._afterGenDataFn(new DataRow(queryCommand, this, extraData, comment));
    
    this.database.addDataRow(dataRow);
    return dataRow;
  }

  public afterGenerateData(fn: (dataRow: iDataRow) => iDataRow) : iTable {
    this._afterGenDataFn = fn;
    return this;
  };
}