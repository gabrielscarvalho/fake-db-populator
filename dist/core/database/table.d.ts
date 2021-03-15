import { iColumn, iDatabase, iDataRow, iTable, iValueGenerator } from '../../interfaces';
import QueryCommand from '../query-builder/query-command.enum';
import { NamedMap } from '../utils/map';
import { Optional } from '../utils/optional';
export declare class Table implements iTable {
    name: string;
    database: iDatabase;
    columns: NamedMap<iColumn>;
    protected _afterGenDataFn: (dataRow: iDataRow) => iDataRow;
    constructor(database: iDatabase, name: string);
    data: iDataRow[];
    setUniqueKeys(...columnNames: string[]): iTable;
    getUniqueKeyColumns(): iColumn[];
    addColumn(columnName: string, type: string, valueGen: iValueGenerator): iTable;
    getColumn(columnName: string): iColumn;
    getLastDataRow(): Optional<iDataRow>;
    createNewDataRowAndStore(queryCommand: QueryCommand, extraData?: object, comment?: string): iDataRow;
    afterGenerateData(fn: (dataRow: iDataRow) => iDataRow): iTable;
}
