import { iDataRow, iDataRowColumn, iDataRowParsed, iParser } from '../../interfaces';
import QueryCommand from '../query-builder/query-command.enum';
import { NamedMap } from '../utils/named.map';


/**
 * Contains `DataRow` only parsed values to simplify query creation doubts.
 */
export class DataRowParsed implements iDataRowParsed {
  
  public tableName: string;
  public queryCommand: QueryCommand;
  public values: NamedMap<string> = new NamedMap<string>();
  public unique: NamedMap<string> = new NamedMap<string>();


  public constructor(public entityParser: iParser, public dataRow: iDataRow) {
    
    this.queryCommand = this.dataRow.queryCommand;
    this.tableName = this.entityParser.parse(this.dataRow.table.name);

    dataRow.data.forEachEntry((rawColumName: string, column: iDataRowColumn) => {
      
      const parsedColumnName: string = this.entityParser.parse(rawColumName);
      const parsedValue: string = column.parsedValue;

      this.values.add(parsedColumnName, parsedValue);

      if (column.isPartOfUniqueKey()){
        this.unique.add(parsedColumnName, parsedValue);
      }
    });
  }
}