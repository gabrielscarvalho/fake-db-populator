import { PostgresDatabase } from '../../shortcut/database';
import { NumberParser } from '../../shortcut/parser';

describe('Database Spec', () => {

  const db = new  PostgresDatabase();

  it('should be able to add parser', () => {
      db.addParser(NumberParser.withPrecision(db.reservedWords, 'money', 3));

      const parser = db.getParser('money')
      expect(parser.type).toBe('money');
  });
});