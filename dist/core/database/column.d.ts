import { iColumn, iParser, iTable, iValueGenerator } from '../../interfaces';
export declare class Column implements iColumn {
    table: iTable;
    name: string;
    parser: iParser;
    valueGen: iValueGenerator;
    isPartOfUniqueKey: false;
    constructor(table: iTable, name: string, parser: iParser, valueGen: iValueGenerator);
}
