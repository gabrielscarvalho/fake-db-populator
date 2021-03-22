import { iDatabase, iDatabaseReservedWords, iDataRow, iDataRowParsed, iParser, iTable } from '../../interfaces';
import { NamedMap } from '../utils/named.map';
import { Optional } from '../utils/optional';
export declare abstract class Database implements iDatabase {
    reservedWords: iDatabaseReservedWords;
    tables: NamedMap<iTable>;
    parsers: NamedMap<iParser>;
    dataRows: iDataRow[];
    private entityParser;
    constructor(reservedWords: iDatabaseReservedWords);
    addParser(parser: iParser): iDatabase;
    getParser(parserName: string): iParser;
    addTable(tableName: string): iTable;
    getTable(tableName: string): iTable;
    getLastDataRow(tableName: string): Optional<iDataRow>;
    insert(tableName: string, extraData?: object, comment?: string): iDataRow;
    dangerous_addDataRow(dataRow: iDataRow): iDatabase;
    toSQL(): string[];
    rollback(): string[];
    printParsers(): void;
    protected createCommand(dataRow: iDataRow): string;
    /**
     * Creates the insert query command.
     * @return string
     */
    protected abstract createComment(comment: string): string;
    /**
     * Creates the insert query command.
     * @return string
     */
    protected abstract createInsertQuery(dataRow: iDataRowParsed): string;
    /**
     * Creates the delete query command.
     * @return string
     */
    protected abstract createDeleteQuery(dataRow: iDataRowParsed): string;
}
