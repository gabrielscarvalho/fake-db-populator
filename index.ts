import { NamedMap } from './src/core/utils/map';
import { RandomNumber } from './src/core/value-generator/random';
import { PostgresDatabase } from './src/impl/PostgresDatabase';
import { iParser } from './src/interfaces';

const database: PostgresDatabase = new PostgresDatabase();


database.addTable('tableA')
  .addColumn('name', 'string', RandomNumber({ min: 1, max: 3 }) )
  .addColumn('surname', 'number', RandomNumber({ min: 0, max: 30}));




const user = database.insert('tableA', { name: 'John'});

console.log('hellow');
