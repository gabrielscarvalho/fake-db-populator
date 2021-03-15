import { iColumn, iDatabase, iDataRow, iTable, iValueGenerator } from '../../interfaces';
import { DataRow } from '../data/data-row';
import QueryCommand from '../query-builder/query-command.enum';
import { NamedMap } from '../utils/map';
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

  public addColumn(columnKey: string, type: string, valueGen: iValueGenerator, columnName?: string) :iTable {

    const parser = this.database.getParser(type);
    const realColumnName = columnName ? columnName : columnKey;
    const column: iColumn = new Column(this, columnKey, realColumnName, parser, valueGen);

    this.columns.add(columnKey, column, { throwIfExists: true });
    return this;
  }

  public getColumn(columnKey: string): iColumn {
    const column: Optional<iColumn> =this.columns.get(columnKey, { throwIfNotExists: true});
    return column.get({ skipValidation: true });
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