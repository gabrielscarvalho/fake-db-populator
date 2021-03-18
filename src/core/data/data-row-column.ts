import { iColumn, iDataRowColumn, iDataRow, iValueGenerator } from '../../interfaces';
import { Fixed } from '../value-generator/fixed';
import { DataRow } from './data-row';


export class DataRowColumn implements iDataRowColumn {

  public parsedValue: string;

  public constructor( public dataRow: iDataRow,  public column: iColumn, public rawValue: any) {
    this.setValue(rawValue);
  }
  
  public getRawValueAsValueGen(): iValueGenerator {
    return Fixed(this.rawValue);
  }

  public setValue(rawValue: any): void {
    this.rawValue = rawValue;
    try {
      this.parsedValue = this.column.parser.parse(rawValue);
    } catch (error) {
      const columnName = `${this.column.table.name}.${this.column.name}`;
      throw new Error(`Error while parsing the value of [${columnName}]. Error message: ${error.message}`)
    }
  }

  public getColumnName(): string {
    return this.column.name;
  }

  public isPartOfUniqueKey(): boolean {
    const isKey: iColumn = this.column.table.getUniqueKeyColumns().find((column: iColumn) => {
      return column.name === this.column.name;
    });
    return !!isKey;
  }


}