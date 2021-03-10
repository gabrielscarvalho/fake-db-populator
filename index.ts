import { PostgresDatabase } from './src/impl/PostgresDatabase';

const database: PostgresDatabase = new PostgresDatabase();

database.addTable('tableA');


database.getTable('tableB');

console.log('testing new version');