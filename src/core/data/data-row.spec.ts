import { iColumn, iDataRow } from '../../interfaces';
import { PostgresDatabase } from '../../shortcut/database';
import QueryCommand from '../query-builder/query-command.enum';
import { Fixed } from '../value-generator/fixed';
import { DataRow } from './data-row';

describe('DataRow spec', () => {
  let db: PostgresDatabase;
  let dataRow: iDataRow;
  let column: iColumn;

  beforeEach(() => {
    db = new PostgresDatabase();
    db.addTable('t_user')
      .addColumn('name', 'string', Fixed('Gabriel'))
      .addColumn('surname', 'string', Fixed('Surname'))
      .setUniqueKeys('name');

    dataRow = db.insert('t_user');
    column = dataRow.table.getColumn('name');
  });

  describe('constructor', () => {
    it('should construct properly without extra data', () => {
      const dataRow = new DataRow(QueryCommand.INSERT, db.getTable('t_user'));
      expect(dataRow.queryCommand).toBe(QueryCommand.INSERT);
      expect(dataRow.table).toEqual(db.getTable('t_user'));
      expect(dataRow.comment).toBe(null);
      expect(dataRow.hasCreatedQuery).toBe(false);
      expect(dataRow.data).toBeDefined();

      expect(dataRow.data.getForced('name').rawValue).toBe('Gabriel');
      expect(dataRow.data.getForced('surname').rawValue).toBe('Surname');
    });

    it('should construct properly with extra data', () => {
      const dataRow = new DataRow(
        QueryCommand.INSERT,
        db.getTable('t_user'),
        { surname: 'fixed surname' },
        'A comment'
      );
      expect(dataRow.queryCommand).toBe(QueryCommand.INSERT);
      expect(dataRow.table).toEqual(db.getTable('t_user'));
      expect(dataRow.extraData).toEqual({ surname: 'fixed surname' });
      expect(dataRow.comment).toBe('A comment');
      expect(dataRow.hasCreatedQuery).toBe(false);
      expect(dataRow.data).toBeDefined();

      expect(dataRow.data.getForced('name').rawValue).toBe('Gabriel');
      expect(dataRow.data.getForced('surname').rawValue).toBe('fixed surname');
    });

    it('should throw error if has invalid value to column', () => {
      expect(() => {
        new DataRow(QueryCommand.INSERT, db.getTable('t_user'), { surname: { invalidParam: true } });
      }).toThrowError(
        'Error while parsing the value of [t_user.surname]. Error message: StringParser received invalid value: object. Valid values are: string or number. Received value:[object Object]'
      );
    });

    it('should throw error if has invalid value gen', () => {
      const fn = () => {
        throw new Error('could not get value');
      };

      db.addTable('fake').addColumn('name', 'string', fn);

      expect(() => {
        new DataRow(QueryCommand.INSERT, db.getTable('fake'));
      }).toThrowError('Error while calculating the value of column: fake.name: could not get value');
    });
  });

  describe('getColumnData', () => {
    it('should be able to get valid column data', () => {
      const dataRow = new DataRow(QueryCommand.INSERT, db.getTable('t_user'));

      const nameCol = dataRow.getColumnData('name');
      expect(nameCol).toBeDefined();
      expect(nameCol.getColumnName()).toBe('name');
      expect(nameCol.rawValue).toBe('Gabriel');
      expect(nameCol.parsedValue).toBe("'Gabriel'");
    });

    it('should throw error if requested invalid column data', () => {
      const dataRow = new DataRow(QueryCommand.INSERT, db.getTable('t_user'));
      expect(() => {
        dataRow.getColumnData('unknown-column');
      }).toThrowError(
        "Could not get unknown 'unknown-column' from list.  Did you spell it right? Valid values: [name,surname]"
      );
    });
  });

  describe('rawValue', () => {
    it('should be able to set/get valid raw value', () => {
      const dataRow = new DataRow(QueryCommand.INSERT, db.getTable('t_user'));

      expect(dataRow.getRawValue('name')).toBe('Gabriel');
      dataRow.setRawValue('name', 'Peter');
      expect(dataRow.getRawValue('name')).toBe('Peter');
    });

    it('should throw error if get unknown column', () => {
      const dataRow = new DataRow(QueryCommand.INSERT, db.getTable('t_user'));
      expect(() => {
        dataRow.getRawValue('unknown');
      }).toThrowError(
        "Could not get unknown 'unknown' from list.  Did you spell it right? Valid values: [name,surname]"
      );
    });

    it('should throw error if set unknown column', () => {
      const dataRow = new DataRow(QueryCommand.INSERT, db.getTable('t_user'));
      expect(() => {
        dataRow.setRawValue('unknown', 'a value');
      }).toThrowError(
        "Could not get unknown 'unknown' from list.  Did you spell it right? Valid values: [name,surname]"
      );
    });
  });

  describe('reApplyForcedValues', () => {
    it('should be able to reapply initial values', () => {
      const dataRow = new DataRow(QueryCommand.INSERT, db.getTable('t_user'), { name: 'Forced Gabriel' });

      expect(dataRow.getRawValue('name')).toBe('Forced Gabriel');

      dataRow.setRawValue('name', 'new value');
      expect(dataRow.getRawValue('name')).toBe('new value');

      dataRow.reApplyForcedValues();

      expect(dataRow.getRawValue('name')).toBe('Forced Gabriel');
    });

    it('should not reapply if there no forced value', () => {
      const dataRow = new DataRow(QueryCommand.INSERT, db.getTable('t_user'));

      expect(dataRow.getRawValue('name')).toBe('Gabriel');

      dataRow.setRawValue('name', 'new value');
      expect(dataRow.getRawValue('name')).toBe('new value');

      dataRow.reApplyForcedValues();

      expect(dataRow.getRawValue('name')).toBe('new value');
    });

    it('should not reapply if there no forced value', () => {
      const dataRow = new DataRow(QueryCommand.INSERT, db.getTable('t_user'), null);

      expect(dataRow.getRawValue('name')).toBe('Gabriel');

      dataRow.setRawValue('name', 'new value');
      expect(dataRow.getRawValue('name')).toBe('new value');

      dataRow.reApplyForcedValues();

      expect(dataRow.getRawValue('name')).toBe('new value');
    });
  });

  it('to print', () => {
    const dataRow = new DataRow(QueryCommand.INSERT, db.getTable('t_user'));
    dataRow.print();
  });
});
