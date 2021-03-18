import QueryCommand from './core/query-builder/query-command.enum';
import { Optional } from './core/utils/optional';
export interface iMap<T> {
    has: (name: string) => boolean;
    add: (name: string, content: T, config: {
        throwIfExists: boolean;
    }) => iMap<T>;
    get: (name: string, config: {
        throwIfNotExists: boolean;
    }) => Optional<T>;
    delete: (name: string, config: {
        throwIfNotExists: boolean;
    }) => boolean;
    find: (filter: any) => Optional<T>;
    getKeys: () => string[];
    getValues: () => T[];
    forEachEntry(callback: (key: string, value: T) => void): void;
}
export interface iParser {
    type: string;
    parse(val: any): string;
    description?: string;
    reservedWords: iDatabaseReservedWords;
}
export declare type iValueGenerator = () => any;
export interface iDataRowColumn {
    dataRow: iDataRow;
    column: iColumn;
    rawValue: any;
    parsedValue: string;
    /**
     * Creates a value generator that will return the raw value.
     * Useful for example, for geting the last generated id.
    */
    getRawValueAsValueGen: iValueGenerator;
    /**
     * Set the value and prepared the parsed value.
     */
    setValue: (rawValue: any) => void;
    /**
     * Shortcut to get the column name.
     * @return string
     */
    getColumnName: () => string;
    /**
     * Check if value is part of unique key.
     * @return boolean
     */
    isPartOfUniqueKey: () => boolean;
}
export interface iDataRow {
    data: iMap<iDataRowColumn>;
    queryCommand: QueryCommand;
    hasCreatedQuery: boolean;
    table: iTable;
    comment: string;
    /**
     * Return the data from the specified column.
     * @param columnName
     * @return iDataRowColumn
    */
    getColumnData: (columnName: string) => iDataRowColumn;
    /**
     * Return the raw value of the column (that has not been parsed)
     * @return any
    */
    getRawValue: (columnName: string) => any;
    /**
     * Set manually the new raw value of a column.
    */
    setRawValue: (columnName: string, newValue: any) => void;
    /**
     * Prints the object to help seeing data.
    */
    print: () => void;
}
export interface iDataRowParsed {
    tableName: string;
    queryCommand: QueryCommand;
    values: iMap<string>;
    unique: iMap<string>;
}
export interface iColumn {
    table: iTable;
    name: string;
    parser: iParser;
    isPartOfUniqueKey: boolean;
    valueGen: iValueGenerator;
}
export interface iTable {
    name: string;
    database: iDatabase;
    data: iDataRow[];
    columns: iMap<iColumn>;
    /**
     * What defines the register as unique ?
    */
    setUniqueKeys: (...columnNames: string[]) => iTable;
    /**
     * Return the list of columns that make a register unique.
     * @return iColumn[]
    */
    getUniqueKeyColumns: () => iColumn[];
    /**
     * Return the last DataRow generated - if present.
    */
    getLastDataRow: () => Optional<iDataRow>;
    getColumn: (columnName: string) => iColumn;
    /**
     * Adds a new column to the table.
     * @param columnName the unique name or nickname.
     * @param type the type of the column. 'string', 'number', or created parsers.
     * @param valueGen the function that will generate the value.
    */
    addColumn: (columnName: string, type: string | iParser, valueGen: iValueGenerator) => iTable;
    /**
     * Creates a new data object.
     * @param extraData object that contains the column key and value to be replaced.
     */
    createNewDataRowAndStore: (queryCommand: QueryCommand, extraData: object, comment?: string) => iDataRow;
    /**
     * Function that can be called after the data is generate.
     * It is a place to fix info before releasing the DataRow
     *
    */
    afterGenerateData: (fn: (dataRow: iDataRow) => iDataRow) => iTable;
}
export interface iDatabase {
    parsers: iMap<iParser>;
    tables: iMap<iTable>;
    reservedWords: iDatabaseReservedWords;
    addParser: (parser: iParser) => iDatabase;
    getParser: (parserName: string) => iParser;
    addTable: (tableName: string) => iTable;
    getTable: (tableName: string) => iTable;
    /**
     * Create a new insert data command.
     * @param tableName the table name
     * @param extraData which manually informed data must be put?
     * @return iDataRow
    */
    insert: (tableName: string, extraData: object, comment?: string) => iDataRow;
    /**
     * Return the last DataRow generated - if present.
    */
    getLastDataRow: (tableName: string) => Optional<iDataRow>;
    /**
     * Add a new dataRow. Don't use it manually!
    */
    addDataRow: (dataRow: iDataRow) => iDatabase;
    /**
     * Convert all data to SQL
     * @return string[]
     */
    toSQL: () => string[];
    /**
     * Return all queries to rollback your changes.
     */
    rollback: () => string[];
    /**
     * Print all parsers descriptions.
     * @return void
    */
    printParsers: () => void;
}
export interface iQueryBuilder {
    insert: (tableName: string, extraData: object) => iQueryBuilder;
}
export interface iDatabaseReservedWords {
    /**
     * Which reserved word represents null values?
     * @default 'null'
    */
    null: string;
    /**
     * Which character represents the quotes on every insert?
     * @default '"'
    */
    quotesForValues: string;
    /**
     * PostgreSQL for example, use double quotes for columns definitions: ex: "name"
     * and single quotes for value definitions: ex: 'john'.
     * This field is for column defitions.
     */
    quotesForEntities: string;
    /**
     * Represents the values of true and false.
     * @default 'true' and 'false'
    */
    boolean: {
        false: string;
        true: string;
    };
}
