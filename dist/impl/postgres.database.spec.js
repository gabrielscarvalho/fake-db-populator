"use strict";
exports.__esModule = true;
var database_1 = require("../shortcut/database");
var value_gen_1 = require("../shortcut/value-gen");
describe('PostgreSQL Tests', function () {
    var db = new database_1.PostgresDatabase();
    db.addTable('t_user')
        .addColumn('id', 'int', value_gen_1.Fixed(1))
        .addColumn('name', 'string', value_gen_1.Fixed('John'))
        .addColumn('active', 'boolean', value_gen_1.Fixed(false))
        .addColumn('birth', 'date', value_gen_1.Fixed(new Date(2000, 1, 1)))
        .addColumn('updated_at', 'datetime', value_gen_1.Fixed(new Date(2000, 1, 1, 12, 30, 35)))
        .addColumn('raw_value', 'raw', value_gen_1.Fixed('now()'))
        .setUniqueKeys('id', 'name');
    it('Should return a valid queries', function () {
        db.insert('t_user');
        var sqls = db.toSQL();
        expect(sqls).toBeDefined();
        expect(sqls.length).toBe(1);
        expect(sqls[0]).toBe("INSERT INTO \"t_user\" (\"id\", \"name\", \"active\", \"birth\", \"updated_at\", \"raw_value\") VALUES (1, 'John', false, '2000-02-01', '2000-02-01 12:30:35', now());");
        var rollback = db.rollback();
        expect(rollback).toBeDefined();
        expect(rollback.length).toBe(2);
        expect(rollback[0]).toBe('/*  --- ROLLBACK */');
        expect(rollback[1]).toBe('DELETE FROM "t_user" WHERE "id"=1 AND "name"=\'John\';');
    });
});
