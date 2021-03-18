
# Value Generators

Value generator are **pure functions** that **return random value** everytime they are executed.

## Topics 

* What is that?
* Where should I use it?
* How do I know which are available?
* * AutoIncrement
* * LastValue
* * Random
* * Date
* * Fixed 
* How do I create a new one?



## What is that?

Value generator are **pure functions** that **return random value** everytime they are executed.
For example:

```typescript
  console.log('New name is', Random.FirstName());
  console.log('New name is', Random.FirstName());
  console.log('New name is', Random.FirstName());

  // New name is John
  // New name is Mary
  // New name is Paul
```

## Where should I use it?

It is the 3rd parameter when adding a new column.

```typescript
const valueGenerator = Random.FirstName();
database.addColumn("column_name", "string", valueGenerator);
```

## Which are the available ValueGenerators ?

You have 5 default generators:

* AutoIncrement: Useful for incremental ids
* LastValue: Useful to retrieve values from other tables (like foreign keys)
* Random: A lot of functions that will give you like random names, numbers.
* Date: Useful for creating random dates
* Fixed: When you just want to return a fixed value.


### AutoIncrement

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


### LastValue

Help you recovering the last emitted value from a column.
Use this one for copying values from tables - for example, foreign keys.
**Important**: You must use this method to recover data created from other tables. If you use to capture a column from your own table, you might collect data from previous register (not the register you are creating).

```typescript
const autoIncrement = new AutoIncrement();
autoIncrement.initialId("user.id", 100);

const tUser = database
  .addTable("t_user")
  .addColumn("id", "int", autoIncrement.valueGen("user.id"))
  .addColumn("email", "string", Random.Email());

const tAddress = database
  .addTable("t_address")
  .addColumn("id", "int", autoIncrement.valueGen("address.id"))
  .addColumn("user_id", "int", LastValue(tUser.getColumn("id")))
  .addColumn("user_email", "int", LastValue(tUser.getColumn("email"))); // you can use this function for any type of column.
```


### Random

Random provides a huge variety of methods to help you generate your random data.
Check all of them [here](https://github.com/gabrielscarvalho/random-db-populator/blob/master/src/core/value-generator/random.ts).

When this doc was created, it was available:

 * Number
 * String
 * NumberWithLength
 * FromRegularExpression
 * PickOne
 * Boolean
 * FirstName
 * FullName
 * LastName
 * Email
 * Word
 * Sentence
 * Guid
 * Hash
 * Char
 * Cpf
 * AvatarURL
 * Street
 * City
 * Country


[This example](https://github.com/gabrielscarvalho/random-db-populator-example/blob/master/scenarios-ts/7-full-scenario.ts) uses a lot of them.


### Date

Return valid random date.

```typescript
database.addColumn("birth", "date", DateGen.between({ year: { min: 2000, max: 2005 } }));
```

### Fixed

Return a fixed value. When you don't want to create a random function.

```typescript
database.addColumn("name", "string", Fixed('John'));
```

## How do I create a new one?

You can follow [this example](https://github.com/gabrielscarvalho/random-db-populator-example/blob/master/scenarios-ts/6-new-value-generator.ts).

