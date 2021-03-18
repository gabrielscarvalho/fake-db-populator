import { Database } from '../core/database/database';
import { iDatabase, iDataRowParsed } from '../interfaces';
export declare class MySQLDatabase extends Database implements iDatabase {
    constructor();
    protected createComment(comment: string): string;
    protected createInsertQuery(dataRow: iDataRowParsed): string;
    protected createDeleteQuery(dataRow: iDataRowParsed): string;
}
