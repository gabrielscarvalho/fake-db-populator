import { RandomNumber } from './src/core/value-generator/random';
import { AutoIncrement } from './src/core/value-generator/auto-increment';
import { LastValue } from './src/core/value-generator/last-value';
import { PostgresDatabase } from './src/impl/PostgresDatabase';

const database: PostgresDatabase = new PostgresDatabase();

const autoIncrement = new AutoIncrement();

autoIncrement
  .initialId('user.id', 1)
  .initialId('address.id', 2);


const tUser = database.addTable('user')
  .addColumn('id', 'number', autoIncrement.valueGen('user.id'))
  .addColumn('name', 'string', RandomNumber({ min: 1, max: 3 }))
  .addColumn('age', 'number', RandomNumber({ min: 0, max: 30}));


database.addTable('address')
  .addColumn('id', 'number', autoIncrement.valueGen('address.id'))
  .addColumn('user_id', 'number', LastValue(tUser.getColumn('id'), null))


const user = database.insert('user', { name: 'John'});

const address = database.insert('address', {});

const user2 = database.insert('user', { name: 'John'});
const address2 = database.insert('address', {});


console.log('hellow');
