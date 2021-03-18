# Random Db Populator

Make it easier to populate your **POSTGRES** test environments, creating inserts with **consistent random data**. With a clear language, you can focus on what makes your scenario unique. (Other databases will be added soon.)

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
Check the [full docs](/docs/Parser.md)

```typescript
const parser = "string";
database.addTable('t_user').addColumn("column_name", parser, Random.FirstName());
```


### Value Generators

```typescript
const valueGenerator = Random.FirstName();
database.addColumn("column_name", "string", valueGenerator);
```

#### Which are the available ValueGenerators ?

##### Random

Random provides a huge variety of methods to help you generate your random data.
Check all of them [here](https://github.com/gabrielscarvalho/random-db-populator/blob/master/src/core/value-generator/random.ts).

[This example](https://github.com/gabrielscarvalho/random-db-populator-example/blob/master/scenarios-ts/7-full-scenario.ts) uses a lot of them.

##### AutoIncrement

Help you generating ids for example.

```typescript
const autoIncrement = new AutoIncrement();
autoIncrement.initialId("user.id", 100);

database
  .addTable("t_user")
  .addColumn("id", "int", autoIncrement.valueGen("user.id", 2)); // default increaseBy = 1

database.insert("t_user"); // id = 102
database.insert("t_user"); // id = 104
database.insert("t_user"); // id = 106
```

##### LastValue

Help you recovering the last emitted value from a column.
Use this one for copying values from tables - for example, foreign keys.
**Important**: You must use this method to recover data created from other tables. If you use to capture a column from your own table, you might collect data from previous register (not the register you are creating).

```typescript
const autoIncrement = new AutoIncrement();
autoIncrement.initialId("user.id", 100);

const tUser = database
  .addTable("t_user")
  .addColumn("id", "int", autoIncrement.valueGen("user.id"));

const tAddress = database
  .addTable("t_address")
  .addColumn("id", "int", autoIncrement.valueGen("address.id"))
  .addColumn("user_id", "int", LastValue(tUser.getColumn("id")));
```

##### Date

Return valid random date.

```typescript
database.addColumn(
  "birth",
  "date",
  DateGen.between({ year: { min: 2000, max: 2005 } })
);
```

##### Fixed

Return a fixed value. When you don't want to create a random function.


## Next steps

- Create @types package
- Add MySQL
- Add Oracle
- Unit tests

## Talk to me

Email: gabriel.scarvalho310@gmail.com
[LinkedIn](https://www.linkedin.com/in/gabriel-santos-carvalho-3b1978142/)
