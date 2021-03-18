import { iDataRow, iDataRowParsed, iParser } from '../../interfaces';
import QueryCommand from '../query-builder/query-command.enum';
import { NamedMap } from '../utils/map';
/**
 * Contains `DataRow` only parsed values to simplify query creation doubts.
 */
export declare class DataRowParsed implements iDataRowParsed {
    entityParser: iParser;
    dataRow: iDataRow;
    tableName: string;
    queryCommand: QueryCommand;
    values: NamedMap<string>;
    unique: NamedMap<string>;
    constructor(entityParser: iParser, dataRow: iDataRow);
}
