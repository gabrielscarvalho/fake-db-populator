import { DatabaseReservedWords } from '../shortcut/database';
import { Fixed } from '../shortcut/value-gen';
import { MySQLDatabase } from './mysql.database';

describe('MySQL Tests', () => {

  const db = new MySQLDatabase();

  db.addTable('t_user')
    .addColumn('id', 'int', Fixed(1))
    .addColumn('name', 'string', Fixed('John'))
    .addColumn('active', 'boolean', Fixed(false))
    .addColumn('birth', 'date', Fixed(new Date(2000, 1, 1)))
    .addColumn('updated_at', 'datetime', Fixed(new Date(2000, 1, 1, 12, 30, 35)))
    .addColumn('raw_value', 'raw', Fixed('now()'))
    .setUniqueKeys('id', 'name')

  it('Should return a valid queries', () => {

    db.insert('t_user');

    const sqls = db.toSQL();
    
    expect(sqls).toBeDefined();
    expect(sqls.length).toBe(1);

    expect(sqls[0]).toBe("INSERT INTO `t_user` (`id`, `name`, `active`, `birth`, `updated_at`, `raw_value`) VALUES (1, 'John', false, '2000-02-01', '2000-02-01 12:30:35', now());")
    
    const rollback = db.rollback();
    expect(rollback).toBeDefined();
    expect(rollback.length).toBe(2);

    
    expect(rollback[0]).toBe('/*  --- ROLLBACK */');
    expect(rollback[1]).toBe("DELETE FROM `t_user` WHERE `id`=1 AND `name`='John';");
  });

});