import { table } from 'console';
import { iDataRow, PostgresDatabase, Table } from '../../shortcut/database';
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
      const table = db.addTable('t_user').addColumn('name', 'string', Fixed('Gabriel'));

      const column = table.getColumn('name');
      expect(column).toBeDefined();
      expect(column.name).toBe('name');
      expect(column.parser.type).toBe('string');
      expect(column.valueGen()).toBe('Gabriel');

      expect(column.table).toEqual(table);
    });

    it('should throw error to unknown parser', () => {
      expect(() => {
        const table = db.addTable('t_user').addColumn('name', 'unknown-parser', Fixed('Gabriel'));
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
      }).toThrowError('Cannot add [name] to list. The value is already in use.');
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
      const t = new Table(db, 't_address').addColumn('name', 'string', Fixed('Gabriel'));

      const column = t.getColumn('name');
      expect(column).toBeDefined();
      expect(column.name).toBe('name');
      expect(column.parser.type).toBe('string');
      expect(column.valueGen()).toBe('Gabriel');
    });

    it('should throw error if unknown column', () => {
      const t = new Table(db, 't_address').addColumn('name', 'string', Fixed('Gabriel'));

      expect(() => {
        t.getColumn('surname');
      }).toThrowError("Could not get unknown 'surname' from list.  Did you spell it right? Valid values: [name]");
    });
  });

  describe('getLastDataRow', () => {
    it('should return valid DataRow if there is data', () => {
      const table = new Table(db, 't_address').addColumn('name', 'string', Fixed('Gabriel'));
      db.tables.add(table.name, table);

      db.insert('t_address');

      const optData = table.getLastDataRow();
      expect(optData.getForced().getRawValue('name')).toBe('Gabriel');
    });

    it('should return empty DataRow if there is no data', () => {
      const table = new Table(db, 't_address').addColumn('name', 'string', Fixed('Gabriel'));
      db.tables.add(table.name, table);

      const optData = table.getLastDataRow();
      expect(optData.isPresent()).toBe(false);
    });
  });

  describe('insert', () => {
    it('should return valid DataRow if there is data', () => {
      const tUser = db
        .addTable('t_user')
        .addColumn('name', 'string', Fixed('Gabriel'))
        .addColumn('surname', 'string', Fixed('Test'));

      tUser.insert({ surname: 'Modified Surname' }, 'A comment');

      const optData = db.getLastDataRow('t_user');
      expect(optData.isPresent()).toBe(true);
      const dataRow = optData.get();

      expect(dataRow.getRawValue('name')).toBe('Gabriel');
      expect(dataRow.getRawValue('surname')).toBe('Modified Surname');
      expect(dataRow.comment).toBe('A comment');
    });

    it('after generate should not replace forced values', () => {
      const tUser = db
        .addTable('t_user')
        .addColumn('name', 'string', Fixed('Gabriel'))
        .addColumn('surname', 'string', Fixed('Test'))
        .afterGenerateData(
          (dataRow: iDataRow): iDataRow => {
            dataRow.setRawValue('name', 'After Generated overrided name');
            dataRow.setRawValue('surname', 'Not possible to override due to insert forcing surname manually.');
            return dataRow;
          }
        );

      tUser.insert({ surname: 'Forced Surname' }, 'A comment');

      const optData = db.getLastDataRow('t_user');
      expect(optData.isPresent()).toBe(true);
      const dataRow = optData.get();

      expect(dataRow.getRawValue('name')).toBe('After Generated overrided name');
      expect(dataRow.getRawValue('surname')).toBe('Forced Surname');
      expect(dataRow.comment).toBe('A comment');
    });
  });

  describe('setUniqueKeys', () => {
    it('should set if column is valid', () => {
      const tUser = db
        .addTable('t_user')
        .addColumn('id', 'string', Fixed(1))
        .addColumn('email', 'string', Fixed('gabriel@random-db-pop.com'))
        .addColumn('name', 'string', Fixed('Gabriel'))
        .setUniqueKeys('id', 'email');

      expect(tUser.getColumn('id').isPartOfUniqueKey).toBe(true);
      expect(tUser.getColumn('email').isPartOfUniqueKey).toBe(true);
      expect(tUser.getColumn('name').isPartOfUniqueKey).toBe(false);
    });

    it('should not throw error if param is empty', () => {
      expect(() => {
        const tUser = db.addTable('t_user').addColumn('id', 'string', Fixed(1)).setUniqueKeys();
      }).toThrowError('setUniqueKeys require at least 1 column');
    });

    it('should throw error if column is invalid', () => {
      expect(() => {
        db.addTable('t_user').addColumn('id', 'string', Fixed(1)).setUniqueKeys('unkown');
      }).toThrowError("Could not get unknown 'unkown' from list.  Did you spell it right? Valid values: [id]");
    });
  });

  describe('getUniqueKeyColumns', () => {
    it('should get if column is valid', () => {
      const tUser = db
        .addTable('t_user')
        .addColumn('id', 'string', Fixed(1))
        .addColumn('email', 'string', Fixed('gabriel@random-db-pop.com'))
        .addColumn('name', 'string', Fixed('Gabriel'))
        .setUniqueKeys('id', 'email');

      const columns = tUser.getUniqueKeyColumns();
      expect(columns.length).toBe(2);
      expect(columns.map((col) => col.name)).toEqual(['id', 'email']);
    });
  });
});
