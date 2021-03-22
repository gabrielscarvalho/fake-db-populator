import { iColumn, iParser, iTable, iValueGenerator } from '../../interfaces';
export declare class Column implements iColumn {
    table: iTable;
    name: string;
    parser: iParser;
    valueGen: iValueGenerator;
    isPartOfUniqueKey: boolean;
    /**
     * **WARNING**: Do not create this object by yourself.
     * Use `database.addTable(tableName).addColumn` instead
     */
    constructor(table: iTable, name: string, parser: iParser, valueGen: iValueGenerator);
}
