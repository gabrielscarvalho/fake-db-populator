import { iColumn, iDataRow, PostgresDatabase } from '../../shortcut/database';
import { Fixed } from './fixed';
import { LastValue } from './last-value';

describe('LastValue', () => {
  let db: PostgresDatabase;
  let dataRow: iDataRow;
  let column: iColumn;

  beforeEach(() => {
    db = new PostgresDatabase();
    const tUser = db
      .addTable('t_user')
      .addColumn('name', 'string', Fixed('Gabriel'))
      .addColumn('surname', 'string', Fixed('Surname'))
      .setUniqueKeys('name');

    db.addTable('t_address')
      .addColumn('username', 'string', LastValue(tUser.getColumn('name')))

      .addColumn('address', 'string', Fixed('Av. 1'))
      .setUniqueKeys('username');

    db.addTable('t_address_default').addColumn(
      'username',
      'string',
      LastValue(tUser.getColumn('name'), 'not-informed')
    );

    db.addTable('t_address_throw_error').addColumn(
      'username',
      'string',
      LastValue(tUser.getColumn('name'), 'not-informed', { throwErrorIfNotExists: true })
    );
  });

  it('should set the value received from the val gen', () => {
    const user = db.insert('t_user');
    const address = db.insert('t_address');

    expect(user.getRawValue('name')).toBe('Gabriel');
    expect(address.getRawValue('username')).toBe('Gabriel');
  });

  it('should set the forced value over val gen', () => {
    const user2 = db.insert('t_user', { name: 'other-name' });
    const address2 = db.insert('t_address');

    expect(user2.getRawValue('name')).toBe('other-name');
    expect(address2.getRawValue('username')).toBe('other-name');
  });

  it('should be able to edit value if wish to', () => {
    const user2 = db.insert('t_user', { name: 'other-name' });
    const address2 = db.insert('t_address', { username: 'John' });

    expect(user2.getRawValue('name')).toBe('other-name');
    expect(address2.getRawValue('username')).toBe('John');
  });

  it('should be able to put default value if not present', () => {
    const address = db.insert('t_address_default');
    expect(address.getRawValue('username')).toBe('not-informed');

    const user2 = db.insert('t_user', { name: 'other-name' });
    const address2 = db.insert('t_address_default');

    expect(user2.getRawValue('name')).toBe('other-name');
    expect(address2.getRawValue('username')).toBe('other-name');
  });

  it('should be able to throw exception if not value is informed', () => {
    expect(() => {
      db.insert('t_address_throw_error');
    }).toThrowError(
      'Error while calculating the value of column: t_address_throw_error.username: There was no last value for column: [t_user.name]. Assure to create a register to this table before or change the flag throwErrorIfNotExists to false.'
    );

    const user2 = db.insert('t_user', { name: 'other-name' });
    const address2 = db.insert('t_address_throw_error');

    expect(user2.getRawValue('name')).toBe('other-name');
    expect(address2.getRawValue('username')).toBe('other-name');
  });
});
