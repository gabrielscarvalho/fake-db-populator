import _ from 'lodash';
import { iDataRow, iTable, PostgresDatabase } from '../../shortcut/database';
import { NumberParser } from '../../shortcut/parser';
import { DataRow } from '../data/data-row';
import QueryCommand from '../query-builder/query-command.enum';
import { Optional } from '../utils/optional';
import { Fixed } from '../value-generator/fixed';

describe('Database Spec', () => {
  let db: PostgresDatabase = null;

  beforeEach(() => {
    db = new PostgresDatabase();
  });

  describe('add/get parsers', () => {
    it('should be able to add parser', () => {
      db.addParser(NumberParser.withPrecision(db.reservedWords, 'money', 3));

      const parser = db.getParser('money');
      expect(parser.type).toBe('money');
    });

    it('should throw error if get unknown parser', () => {
      expect(() => {
        const parser = db.getParser('unknown');
      }).toThrowError(
        "Could not get unknown 'unknown' from list.  Did you spell it right? Valid values: [string,number,int,date,datetime,raw,boolean]"
      );
    });
  });

  describe('add/get table', () => {
    it('should be able to add table', () => {
      db.addTable('t_user');

      const table: iTable = db.getTable('t_user');
      expect(table.name).toBe('t_user');
    });

    it('should throw error if get unknown table', () => {
      expect(() => {
        db.getTable('unknown');
      }).toThrowError("Could not get unknown 'unknown' from list.  Did you spell it right? Valid values: []");
    });
  });

  describe('getLastDataRow', () => {
    it('should get the last data row', () => {
      db.addTable('t_user').addColumn('name', 'string', Fixed('Gabriel'));
      db.insert('t_user', { name: 'John' });

      expect(db.getLastDataRow('t_user').getForced().getRawValue('name')).toBe('John');

      db.insert('t_user');

      const optUser: Optional<iDataRow> = db.getLastDataRow('t_user');
      expect(optUser.isPresent()).toBe(true);
      expect(optUser.get().getRawValue('name')).toBe('Gabriel');
    });

    it('should return optinal null if get a table that exists but has not any data', () => {
      db.addTable('t_user').addColumn('name', 'string', Fixed('Gabriel'));

      const optUser: Optional<iDataRow> = db.getLastDataRow('t_user');
      expect(optUser.isPresent()).toBe(false);
    });

    it('should throw error if get unknown table', () => {
      expect(() => {
        db.getLastDataRow('unknown');
      }).toThrowError("Could not get unknown 'unknown' from list.  Did you spell it right? Valid values: []");
    });
  });

  describe('insert', () => {
    it('should return ok to insert valid register', () => {
      db.addTable('t_user').addColumn('name', 'string', Fixed('Gabriel')).addColumn('age', 'int', Fixed(30));
      const user = db.insert('t_user', { age: 29 }, 'A comment');
      const optUser: Optional<iDataRow> = db.getLastDataRow('t_user');

      expect(optUser.isPresent()).toBe(true);
      expect(optUser.get().getRawValue('name')).toBe('Gabriel');

      expect(user.getRawValue('name')).toBe('Gabriel');
      expect(user.getRawValue('age')).toBe(29);

      expect(user.queryCommand).toBe(QueryCommand.INSERT);
      expect(user.comment).toBe('A comment');
    });

    it('should throw error if get unknown table', () => {
      expect(() => {
        db.addTable('t_user');
        db.insert('unknown');
      }).toThrowError("Could not get unknown 'unknown' from list.  Did you spell it right? Valid values: [t_user]");
    });
  });

  describe('addDataRow', () => {
    it('should return ok to insert valid register', () => {
      db.addTable('t_user').addColumn('name', 'string', Fixed('Gabriel'));

      const dataRow = db.insert('t_user');
      const d2 = _.cloneDeep(dataRow);
      d2.setRawValue('name', 'Peter');
      db.dangerous_addDataRow(d2);

      const optLastUser = db.getLastDataRow('t_user');
      expect(optLastUser.getForced().getRawValue('name')).toBe('Peter');
    });
  });

  describe('toSQL', () => {
    it('should return queries', () => {
      db.addTable('t_user')
        .addColumn('email', 'string', Fixed('gabriel@random-db-pop.com'))
        .addColumn('name', 'string', Fixed('Gabriel'))
        .setUniqueKeys('email');

      db.insert('t_user');
      db.insert('t_user', { name: 'Peter', email: 'peter@random-db-pop.com' }, 'A comment');

      const sqls = db.toSQL();
      expect(sqls.length).toBe(3);
      expect(sqls[0]).toBe(
        'INSERT INTO "t_user" ("email", "name") VALUES (\'gabriel@random-db-pop.com\', \'Gabriel\');'
      );
      expect(sqls[1]).toBe('/* A comment */');
      expect(sqls[2]).toBe('INSERT INTO "t_user" ("email", "name") VALUES (\'peter@random-db-pop.com\', \'Peter\');');
    });

    it('when there is no queries, must return empty list', () => {
      db.addTable('t_user')
        .addColumn('email', 'string', Fixed('gabriel@random-db-pop.com'))
        .addColumn('name', 'string', Fixed('Gabriel'))
        .setUniqueKeys('email');

      const sqls = db.toSQL();
      expect(sqls.length).toBe(0);
    });

    it('when query is not INSERT or DELETE it must throw error', () => {
      db.addTable('t_user')
        .addColumn('email', 'string', Fixed('gabriel@random-db-pop.com'))
        .addColumn('name', 'string', Fixed('Gabriel'))
        .setUniqueKeys('email');

      const row = db.insert('t_user');
      row.queryCommand = 'FakeCommand' as any;

      expect(() => {
        db.toSQL();
      }).toThrowError('Impl not found to query command:  [FakeCommand]');
    });
  });

  describe('rollback', () => {
    it('should return queries', () => {
      db.addTable('t_user')
        .addColumn('email', 'string', Fixed('gabriel@random-db-pop.com'))
        .addColumn('name', 'string', Fixed('Gabriel'))
        .setUniqueKeys('email');

      db.insert('t_user');
      db.insert('t_user', { name: 'Peter', email: 'peter@random-db-pop.com' }, 'A comment');
      db.toSQL();
      const sqls = db.rollback();
      expect(sqls.length).toBe(4);
      expect(sqls[0]).toBe('/*  --- ROLLBACK */');
      expect(sqls[1]).toBe('DELETE FROM "t_user" WHERE "email"=\'peter@random-db-pop.com\';');
      expect(sqls[2]).toBe('/* A comment */');
      expect(sqls[3]).toBe('DELETE FROM "t_user" WHERE "email"=\'gabriel@random-db-pop.com\';');
    });

    it('should throw error if user ask for rollback before printing the queries', () => {
      expect(() => {
        db.addTable('t_user')
          .addColumn('email', 'string', Fixed('gabriel@random-db-pop.com'))
          .addColumn('name', 'string', Fixed('Gabriel'))
          .setUniqueKeys('email');

        db.insert('t_user');
        db.rollback();
      }).toThrowError('You should call `database.toSQL()` before calling `database.rollback()`.');
    });

    it('should throw error if table has not unique keys', () => {
      expect(() => {
        db.addTable('t_user')
          .addColumn('email', 'string', Fixed('gabriel@random-db-pop.com'))
          .addColumn('name', 'string', Fixed('Gabriel'));

        db.insert('t_user');
        db.toSQL();
        db.rollback();
      }).toThrowError(
        "To create DELETE command to table: [t_user] it is required to table to have called: 'table.setUniqueKeys(column_name1,...)'"
      );
    });
  });
});
