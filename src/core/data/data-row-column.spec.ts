import { iColumn, iDataRow, PostgresDatabase } from '../../shortcut/database';
import { Fixed } from '../value-generator/fixed';
import { DataRowColumn } from './data-row-column';

describe('DataRowColumn spec', () => {
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

  describe('construtor', () => {
    it('should construct properly', () => {
      const dataRowColumn = new DataRowColumn(dataRow, column, 'User name');
      expect(dataRowColumn.dataRow).toEqual(dataRow);
      expect(dataRowColumn.column).toEqual(column);
      expect(dataRowColumn.rawValue).toBe('User name');
      expect(dataRowColumn.parsedValue).toBe("'User name'");
    });
  });

  describe('getRawValueAsValueGen', () => {
    it('should return valueGen function properly', () => {
      const dataRowColumn = new DataRowColumn(dataRow, column, 'User name');

      expect(dataRowColumn.getRawValueAsValueGen()()).toBe('User name');
    });
  });

  describe('setValue', () => {
    it('should set value properly', () => {
      const dataRowColumn = new DataRowColumn(dataRow, column, 'User name');

      dataRowColumn.setValue('new name');

      expect(dataRowColumn.rawValue).toBe('new name');
      expect(dataRowColumn.parsedValue).toBe("'new name'");
    });

    it('should throw error if is not possible to parse value', () => {
      const dataRowColumn = new DataRowColumn(dataRow, column, 'User name');

      expect(() => {
        dataRowColumn.setValue({ name: 'John' });
      }).toThrowError(
        'Error while parsing the value of [t_user.name]. Error message: StringParser received invalid value: object. Valid values are: string or number. Received value:[object Object]'
      );
    });
  });

  describe('getColumnName', () => {
    it('should get value properly', () => {
      const dataRowColumn = new DataRowColumn(dataRow, column, 'User name');
      expect(dataRowColumn.getColumnName()).toBe('name');
    });
  });

  describe('isPartOfUniqueKey', () => {
    it('should return true if is part', () => {
      const dataRowColumn = new DataRowColumn(dataRow, column, 'User name');
      expect(dataRowColumn.isPartOfUniqueKey()).toBe(true);
    });

    it('should return false if is not part', () => {
      const surname = dataRow.table.getColumn('surname');
      const dataRowColumn = new DataRowColumn(dataRow, surname, 'surname');
      expect(dataRowColumn.isPartOfUniqueKey()).toBe(false);
    });
  });
});
