import { iColumn, iDataRow, iDataRowColumn, iTable } from '../../interfaces';
import QueryCommand from '../query-builder/query-command.enum';
import { NamedMap } from '../utils/named.map';
import { DataRowColumn } from './data-row-column';

export class DataRow implements iDataRow {
  public data: NamedMap<DataRowColumn>;
  public hasCreatedQuery: boolean = false;

  public constructor(
    public queryCommand: QueryCommand,
    public table: iTable,
    public extraData: object = {},
    public comment: string = null
  ) {
    this.hasCreatedQuery = false;
    this.data = new NamedMap<DataRowColumn>();
    this.generateData();
  }

  public getColumnData(columnName: string): iDataRowColumn {
    return this.data.getForced(columnName);
  }

  public getRawValue(columnName: string): any {
    return this.getColumnData(columnName).rawValue;
  }

  public setRawValue(columnName: string, newRawValue: any): void {
    this.getColumnData(columnName).setValue(newRawValue);
  }

  public print(): void {
    const obj = new Object();
    this.data.getKeys().forEach((keyName: string) => {
      const dataRowColumn: iDataRowColumn = this.data.getForced(keyName);
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
        try {
          value = column.valueGen();
        } catch (err) {
          throw new Error(
            `Error while calculating the value of column: ${column.table.name}.${column.name}: ${err.message}`
          );
        }
      }

      const dataColumn: iDataRowColumn = new DataRowColumn(this, column, value);
      this.data.add(column.name, dataColumn, { throwIfExists: true });
    });
  }
}
