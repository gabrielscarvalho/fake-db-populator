import { RandomNumber } from './src/core/value-generator/random';
import { AutoIncrement } from './src/core/value-generator/auto-increment';
import { PostgresDatabase } from './src/impl/PostgresDatabase';

const database: PostgresDatabase = new PostgresDatabase();

const autoIncrement = new AutoIncrement();

autoIncrement
  .initialId('tableA.id', 5);


database.addTable('tableA')
  .addColumn('id', 'number', autoIncrement.valueGen('tableA.id', 2))
  .addColumn('name', 'string', RandomNumber({ min: 1, max: 3 }) )
  .addColumn('surname', 'number', RandomNumber({ min: 0, max: 30}));




const user = database.insert('tableA', { name: 'John'});

const user2 = database.insert('tableA', { name: 'John'});

console.log('hellow');
