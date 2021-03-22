import { PostgresDatabase } from '../../shortcut/database';
import { Fixed } from '../value-generator/fixed';
import { Column } from './column';
import { Table } from './table';

describe('Column spec', () => {
  let db: PostgresDatabase;

  beforeEach(() => {
    db = new PostgresDatabase();
  });

  describe('constructor', () => {
    it('should add column properly', () => {
      const tUser = db.addTable('t_user');

      const column = new Column(tUser, 'name', db.getParser('string'), Fixed('Gabriel'));

      expect(column.name).toBe('name');
      expect(column.parser.type).toBe('string');
      expect(column.valueGen()).toBe('Gabriel');
      expect(column.table.name).toBe('t_user');
      expect(column.isPartOfUniqueKey).toBe(false);
    });
  });
});
