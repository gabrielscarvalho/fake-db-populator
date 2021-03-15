import { iDatabase, iDataRow, iParser, iDatabaseReservedWords, iTable } from '../../interfaces';
import { NamedMap } from '../utils/map';
import { Optional } from '../utils/optional';
import { EntityParser } from '../parsers/entity.parser';
export declare abstract class Database implements iDatabase {
    tables: NamedMap<iTable>;
    parsers: NamedMap<iParser>;
    reservedWords: iDatabaseReservedWords;
    dataRows: iDataRow[];
    private entityParser;
    constructor();
    addParser(parser: iParser): iDatabase;
    getParser(parserName: string): iParser;
    getEntityParser(): EntityParser;
    addTable(tableName: string): iTable;
    getTable(tableName: string): iTable;
    getLastDataRow(tableName: string): Optional<iDataRow>;
    insert(tableName: string, extraData?: object, comment?: string): iDataRow;
    addDataRow(dataRow: iDataRow): iDatabase;
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
    protected abstract createInsertQuery(dataRow: iDataRow): string;
    /**
     * Creates the delete query command.
     * @return string
    */
    protected abstract createDeleteQuery(dataRow: iDataRow): string;
}
