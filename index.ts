import { NamedMap } from './src/core/utils/map';
import { RandomNumber } from './src/core/value-generator/random';
import { PostgresDatabase } from './src/impl/PostgresDatabase';
import { iParser } from './src/interfaces';

const database: PostgresDatabase = new PostgresDatabase();


database.addTable('tableA')
  .addColumn('name', 'string', RandomNumber({ min: 1, max: 3 }) )
  .addColumn('surname', 'number', RandomNumber());



console.log('testing new version',  RandomNumber({ min: 1, max: 999, decimals: 10 })());