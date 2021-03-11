import { iColumn, iDataRow, iDataRowColumn, iTable } from '../../interfaces';
import QueryCommand from '../query-builder/query-command.enum';
import { NamedMap } from '../utils/map';
import { DataRowColumn } from './data-row-column';


export class DataRow implements iDataRow {

  public data: NamedMap<DataRowColumn>;
  public queryCommand: QueryCommand;
  public table: iTable;
  public extraData: object;

  public new(queryCommand: QueryCommand, table: iTable, extraData: object): iDataRow {

    this.queryCommand = queryCommand;
    this.table = table;
    this.extraData = extraData;

    this.data = new NamedMap<DataRowColumn>();
    this.generateData();

    return this;
  }

  public getValue(columnName: string): iDataRowColumn {
    const optDataRow = this.data.get(columnName, { throwIfNotExists: true });
    return optDataRow.get({skipValidation: true });
  }


  protected generateData(): void {
    this.table.columns.getValues().forEach((column: iColumn) => {

      let value = null;

      if ((this.extraData || {}).hasOwnProperty(column.key)) {
        const forcedValue = this.extraData[column.key];
        value = forcedValue;
      } else {
        value = column.valueGen();
      }

      const dataColumn: iDataRowColumn = new DataRowColumn(this, column, value);
      this.data.add(column.name, dataColumn, { throwIfExists: true });
    });
  }
}