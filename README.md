# Random Db Populator

Make it easier to populate your **POSTGRES** test environments, creating inserts with **consistent random data**. With a clear language, you can focus on what makes your scenario unique.

Other databases will be added soon. If you don't want to wait: [Create New Database doc](https://github.com/gabrielscarvalho/random-db-populator/blob/master/docs/NewDatabase.md)

**Example**: insert a user which name is **John** and is **inactive**. John must have **2 addresses**.
All other params I accept a random (but still valid) value.

```typescript
// some pre-configurations steps that will be explained below...
database.insert('t_user', { name: 'John', is_active: false, email: 'john@doe.com' });

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

Others database will be added in the future.
**I want to create my own database**: Check [this doc](Check the [New Database Docs](https://github.com/gabrielscarvalho/random-db-populator/blob/master/docs/NewDatabase.md)!



# Examples

Clone [random-db-populator-example](https://github.com/gabrielscarvalho/random-db-populator-example) and check the [JS scenarios folder](https://github.com/gabrielscarvalho/random-db-populator-example/tree/master/scenarios) or [TS scenarios folder](https://github.com/gabrielscarvalho/random-db-populator-example/tree/master/scenarios-ts).

Here you have a [cleaner typescript version](https://github.com/gabrielscarvalho/random-db-populator-example/tree/master/ts-organized-example), which I recommend for development.


**Tip**: Use typescript version. It will make it easier!


## The Principles

Every table's column has 3 required info:

- name: the unique name of the column.
- value generator: a way to generate random values every time it is called
- parser: how should this generated value be treated in order to transform it on a valid query?

Here you can see the table being created:

```typescript
const database = new PostgresDatabase();

database.addTable("t_user")
  //.addColumn(name, parser, value_generator)
  .addColumn('id', 'int', autoIncrement.valueGen('user.id'))
  .addColumn('name', 'string', Random.FirstName())
  .addColumn('surname', 'string', Random.LastName())
  .addColumn('email', 'string', Random.Email())
  .addColumn('gender','string', Random.PickOne(['M', 'F']))
  .addColumn('is_active','boolean', Random.Boolean())
  .addColumn('birth', 'date', DateGen.between({ year: { min: 2000, max: 2005 }}))
  .addColumn('created_at', 'datetime', DateGen.between({ year: { min: 2019, max: 2020 }}))
  .addColumn('updated_at', 'raw', Fixed("now()"))
  .setUniqueKeys('id'); // you can set multiple columns, that will be used at rollback process.

database.insert("t_user", { name: "Gabriel"});

console.log(database.toSQL().join('\n');
console.log(database.rollback().join('\n');

```

### Parsers

Parsers are **previous registered functions** with an **unique name** which will format a value to a query valid value.
Check the [Parser Docs](https://github.com/gabrielscarvalho/random-db-populator/blob/master/docs/Parser.md)

```typescript
const parser = "string";
database.addTable('t_user').addColumn("column_name", parser, Random.FirstName());
```

#### Available Types

* string
* number
* int
* date
* datetime
* raw
* boolean

Check the [Parser Docs](https://github.com/gabrielscarvalho/random-db-populator/blob/master/docs/Parser.md)


### Value Generators

Value generator are **pure functions** that **return random value** everytime they are executed.
Check the [Value Generator Docs](https://github.com/gabrielscarvalho/random-db-populator/blob/master/docs/ValueGenerator.md)

```typescript
const valueGenerator = Random.FirstName();
database.addColumn("column_name", "string", valueGenerator);
```

#### Available types:
* AutoIncrement
* LastValue
* Random
* Date 
* Fixed

Check the [Value Generator Docs](https://github.com/gabrielscarvalho/random-db-populator/blob/master/docs/ValueGenerator.md)


## Next steps

- Create @types package
- Add MySQL
- Add Oracle
- Unit tests

## Talk to me

Email: gabriel.scarvalho310@gmail.com
[LinkedIn](https://www.linkedin.com/in/gabriel-santos-carvalho-3b1978142/)
