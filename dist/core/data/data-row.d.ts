import { iDataRow, iDataRowColumn, iTable } from '../../interfaces';
import QueryCommand from '../query-builder/query-command.enum';
import { NamedMap } from '../utils/map';
import { DataRowColumn } from './data-row-column';
export declare class DataRow implements iDataRow {
    queryCommand: QueryCommand;
    table: iTable;
    extraData: object;
    comment: string;
    data: NamedMap<DataRowColumn>;
    hasCreatedQuery: boolean;
    constructor(queryCommand: QueryCommand, table: iTable, extraData?: object, comment?: string);
    getColumnData(columnName: string): iDataRowColumn;
    getRawValue(columnName: string): any;
    setRawValue(columnName: string, newRawValue: any): void;
    print(): void;
    protected generateData(): void;
}
