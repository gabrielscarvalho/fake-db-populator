import { iColumn, iDataRow, iDataRowColumn, iTable } from '../../interfaces';
import { Table } from '../database/table';
import QueryCommand from '../query-builder/query-command.enum';
import { NamedMap } from '../utils/map';
import { Optional } from '../utils/optional';
import { DataRowColumn } from './data-row-column';


export class DataRow implements iDataRow {


  public data: NamedMap<DataRowColumn>;
  public hasCreatedQuery: boolean = false;


  public constructor(
    public queryCommand: QueryCommand, 
    public table: iTable, 
    public extraData: object = {}, 
    public comment: string = null) {

    this.hasCreatedQuery = false;
    this.data = new NamedMap<DataRowColumn>();
    this.generateData();
  }

  public getColumnData(columnName: string): iDataRowColumn {
    const optDataRow = this.data.get(columnName, { throwIfNotExists: true });
    return optDataRow.get({skipValidation: true });
  }

  public getRawValue(columnName: string): any {
    return this.getColumnData(columnName).rawValue;
  }

  public setRawValue(columnName: string, newRawValue: any) : void {
    this.getColumnData(columnName).setValue(newRawValue)
  }

  public getUniqueKeyColumns(): iDataRowColumn[] {
    const columns: iColumn[] = this.table.getUniqueKeyColumns();

    return (columns || []).map((column: iColumn) => {
      return this.getColumnData(column.name);
    });   
  }

  public getColumnsName() :string[] {
    return this.data.getKeys();
  }

  public getColumnsParsedValue() :string[] {
    return this.data.getValues().map((dataRowColumn: iDataRowColumn) => {
      return dataRowColumn.parsedValue;
    });
  }

  public print(): void {
    const obj = new Object();
    this.data.getKeys().forEach((keyName: string) => {
      const optDataRowColumn: Optional<iDataRowColumn> = this.data.get(keyName, { throwIfNotExists: true });
      const dataRowColumn: iDataRowColumn = optDataRowColumn.get({ skipValidation: true });
      
      obj[keyName] = dataRowColumn.rawValue;
    });

    console.log(`DataRow object from: [${this.table.name}] contains value: `, JSON.stringify(obj));
  }

  protected generateData(): void {
    this.table.columns.getValues().forEach((column: iColumn) => {

      let value = null;

      if ((this.extraData || {}).hasOwnProperty(column.name)) {
        const forcedValue = this.extraData[column.name];
        value = forcedValue;
      } else {
        value = column.valueGen();
      }

      const dataColumn: iDataRowColumn = new DataRowColumn(this, column, value);
      this.data.add(column.name, dataColumn, { throwIfExists: true });
    });
  }

}