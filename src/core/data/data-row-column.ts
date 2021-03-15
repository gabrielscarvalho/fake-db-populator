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
    this.parsedValue = this.column.parser.parse(rawValue);
  }

  public getColumnName(): string {
    return this.column.name;
  }
}