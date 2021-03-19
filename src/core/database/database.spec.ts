import { iTable, PostgresDatabase } from '../../shortcut/database';
import { NumberParser } from '../../shortcut/parser';

describe('Database Spec', () => {
  let db: PostgresDatabase = null;

  beforeEach(() => {
    db = new PostgresDatabase();
  });

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

  it('should be able to add table', () => {
    db.addTable('t_user');

    const table: iTable = db.getTable('t_user');
    expect(table.name).toBe('t_user');
  });

  it('should throw error if get unknown table', () => {
    expect(() => {
      db.getTable('unknown');
    }).toThrowError(
      "Could not get unknown 'unknown' from list.  Did you spell it right? Valid values: []"
    );
  });
});
