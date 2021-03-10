import { Database } from './src/database/database';

const database: Database = new Database();

database.addTable('tableA');


database.getTable('tableB');

console.log('testing new version');