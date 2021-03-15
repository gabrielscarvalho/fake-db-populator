import { iColumn, iDataRowColumn, iDataRow, iValueGenerator } from '../../interfaces';
export declare class DataRowColumn implements iDataRowColumn {
    dataRow: iDataRow;
    column: iColumn;
    rawValue: any;
    parsedValue: string;
    constructor(dataRow: iDataRow, column: iColumn, rawValue: any);
    getRawValueAsValueGen(): iValueGenerator;
    setValue(rawValue: any): void;
    getColumnName(): string;
}
