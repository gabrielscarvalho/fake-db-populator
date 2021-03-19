 ![Type](https://img.shields.io/badge/type-CLI-yellow.svg?style=flat-square) ![NPM License](https://img.shields.io/npm/l/random-db-populator) ![GitHub issues](https://img.shields.io/github/issues/gabrielscarvalho/random-db-populator) [![GitHub stars](https://img.shields.io/github/stars/gabrielscarvalho/random-db-populator.svg?style=social&label=Stars)](https://github.com/gabrielscarvalho/random-db-populator)


Make it easier to populate your **PostgreSQL** and **MySQL** test environments, creating inserts with **consistent random data**. With clear language, you can focus on **what makes your scenario unique**.

**Example**: insert an **inactive** user which name is **John**. John must have **2 addresses**. For all other params, I accept a random (but still valid) value.


```typescript
// some pre-configurations steps that will be explained below...
database.insert('t_user', { name: 'John', is_active: false });

database.insert('t_address');
database.insert('t_address');

console.log(database.toSQL().join("\n"));
console.log(database.rollback().join("\n"));
```

The result will be:

```sql
INSERT INTO "t_user" ("id", "name", "surname", "email", "gender", "is_active", "birth", "created_at", "updated_at") VALUES (1, 'John', 'Bryant', 'john@doe.com', 'M', false, '2001-12-03', '2019-05-18 06:21:46', now());
INSERT INTO "t_address" ("id", "user_id", "street", "city", "country", "postcode", "phone", "receiver_name") VALUES (1, 1, 'Mofup Mill', 'Zadowwip', 'Congo - Brazzaville', '11216-075', '86 0451-9903', 'Norman Jackson');
INSERT INTO "t_address" ("id", "user_id", "street", "city", "country", "postcode", "phone", "receiver_name") VALUES (2, 1, 'Hepvep Grove', 'Jellebo', 'Puerto Rico', '05799-907', '36 3499-6594', 'Lucas Norris');
/*  --- ROLLBACK */ 
DELETE FROM "t_address" WHERE "id"=2;
DELETE FROM "t_address" WHERE "id"=1;
DELETE FROM "t_user" WHERE "id"=1;
```
## Available databases:

- Postgres
- MySQL

Others databases will be added soon.

If you don't want to wait: check [New Database Docs](/NewDatabase.md).


## Examples

Clone [random-db-populator-example](https://github.com/gabrielscarvalho/random-db-populator-example). There you will find:

* [JS scenarios folder](https://github.com/gabrielscarvalho/random-db-populator-example/tree/master/scenarios)
* [TS scenarios folder](https://github.com/gabrielscarvalho/random-db-populator-example/tree/master/scenarios-ts).
* [cleaner typescript version](https://github.com/gabrielscarvalho/random-db-populator-example/tree/master/ts-organized-example)


## Wiki

Check [full documentation](https://github.com/gabrielscarvalho/random-db-populator/wiki).

**Tip**: Use typescript version. It will make it easier!