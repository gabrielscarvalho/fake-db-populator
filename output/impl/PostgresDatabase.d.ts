import { Database } from '../core/database/database';
import { iDatabase, iDataRow } from '../interfaces';
export declare class PostgresDatabase extends Database implements iDatabase {
    constructor();
    protected createComment(comment: string): string;
    protected createInsertQuery(dataRow: iDataRow): string;
    protected createDeleteQuery(dataRow: iDataRow): string;
}
