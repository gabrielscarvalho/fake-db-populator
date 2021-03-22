import { iColumn, iDatabase, iDataRow, iTable, iValueGenerator } from '../../interfaces';
import { NamedMap } from '../utils/named.map';
import { Optional } from '../utils/optional';
export declare class Table implements iTable {
    name: string;
    database: iDatabase;
    columns: NamedMap<iColumn>;
    protected _afterGenDataFn: (dataRow: iDataRow) => iDataRow;
    /**
     * **WARNING**: Do not create this object by yourself.
     * Use `database.addTable(tableName)` instead
     */
    constructor(database: iDatabase, name: string);
    data: iDataRow[];
    setUniqueKeys(...columnNames: string[]): iTable;
    getUniqueKeyColumns(): iColumn[];
    addColumn(columnName: string, type: string, valueGen: iValueGenerator): iTable;
    getColumn(columnName: string): iColumn;
    getLastDataRow(): Optional<iDataRow>;
    insert(extraData?: object, comment?: string): iDataRow;
    afterGenerateData(fn: (dataRow: iDataRow) => iDataRow): iTable;
}
