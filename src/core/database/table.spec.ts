import { table } from 'console';
import { PostgresDatabase, Table } from '../../shortcut/database';
import QueryCommand from '../query-builder/query-command.enum';
import { Fixed } from '../value-generator/fixed';

describe('Table Spec', () => {
  let db: PostgresDatabase;

  beforeEach(() => {
    db = new PostgresDatabase();
  });

  describe('constructor', () => {
    it('should construct properly', () => {
      const t = new Table(db, 't_address');

      expect(t.database).toEqual(db);
      expect(t.name).toBe('t_address');
      expect(t.columns).toBeDefined();
    });
  });

  describe('addColumn', () => {
    it('should be able to add a valid column', () => {
      const table = db
        .addTable('t_user')
        .addColumn('name', 'string', Fixed('Gabriel'));

      const column = table.getColumn('name');
      expect(column).toBeDefined();
      expect(column.name).toBe('name');
      expect(column.parser.type).toBe('string');
      expect(column.valueGen()).toBe('Gabriel');

      expect(column.table).toEqual(table);
    });

    it('should throw error to unknown parser', () => {
      expect(() => {
        const table = db
          .addTable('t_user')
          .addColumn('name', 'unknown-parser', Fixed('Gabriel'));
      }).toThrowError(
        "Could not get unknown 'unknown-parser' from list.  Did you spell it right? Valid values: [string,number,int,date,datetime,raw,boolean]"
      );
    });

    it('should throw error to repeated column name', () => {
      expect(() => {
        const table = db
          .addTable('t_user')
          .addColumn('name', 'string', Fixed('Gabriel'))
          .addColumn('name', 'string', Fixed('Gabriel 2'));
      }).toThrowError(
        'Cannot add [name] to list. The value is already in use.'
      );
    });

    it('should throw error to not informed value generator', () => {
      expect(() => {
        const table = db.addTable('t_user').addColumn('name', 'string', null);
      }).toThrowError(
        "Column: [t_user.name] is missing valueGenerator param. Example: table.addColumn('column_name', 'parser', valGeneratorFn);"
      );
    });
  });

  describe('getColumn', () => {
    it('should return valid column', () => {
      const t = new Table(db, 't_address').addColumn(
        'name',
        'string',
        Fixed('Gabriel')
      );

      const column = t.getColumn('name');
      expect(column).toBeDefined();
      expect(column.name).toBe('name');
      expect(column.parser.type).toBe('string');
      expect(column.valueGen()).toBe('Gabriel');
    });

    it('should throw error if unknown column', () => {
      const t = new Table(db, 't_address').addColumn(
        'name',
        'string',
        Fixed('Gabriel')
      );

      expect(() => {
        t.getColumn('surname');
      }).toThrowError(
        "Could not get unknown 'surname' from list.  Did you spell it right? Valid values: [name]"
      );
    });
  });

  describe('getLastDataRow', () => {
    it('should return valid DataRow if there is data', () => {
      const table = new Table(db, 't_address').addColumn(
        'name',
        'string',
        Fixed('Gabriel')
      );
      db.tables.add(table.name, table);

      db.insert('t_address');

      const optData = table.getLastDataRow();
      expect(optData.getForced().getRawValue('name')).toBe('Gabriel');
    });

    it('should return empty DataRow if there is no data', () => {
      const table = new Table(db, 't_address').addColumn(
        'name',
        'string',
        Fixed('Gabriel')
      );
      db.tables.add(table.name, table);

      const optData = table.getLastDataRow();
      expect(optData.isPresent()).toBe(false);
    });
  });
});
