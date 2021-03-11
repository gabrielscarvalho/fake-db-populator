import { iColumn, iDataRow, iDataRowColumn, iTable } from '../../interfaces';
import { Column } from '../database/column';
import QueryCommand from '../query-builder/query-command.enum';
import { NamedMap } from '../utils/map';
import { DataRowColumn } from './data-row-value';


export class DataRow implements iDataRow {

  public data: NamedMap<DataRowColumn>;

  public constructor(public queryCommand: QueryCommand, public table: iTable) {
    this.data = new NamedMap<DataRowColumn>();
    this.generateData();
  }

  public getValue(columnName: string): iDataRowColumn {
    const optDataRow = this.data.get(columnName, { throwIfNotExists: true });
    return optDataRow.get({skipValidation: true });
  }

  protected generateData(): void {
    this.table.columns.getValues().forEach((column: iColumn) => {
      const dataColumn: iDataRowColumn = new DataRowColumn(this, column, 'define a value here');
      this.data.add(column.name, dataColumn, { throwIfExists: true });
    });
  }
}