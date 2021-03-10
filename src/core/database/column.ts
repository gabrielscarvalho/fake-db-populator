import { iColumn, iParser, iTable, iValueGenerator } from '../interfaces';

export class Column implements iColumn {
  table: iTable;
  key: string;
  name: string;
  type: iParser;
  valueGen: iValueGenerator;
  
}