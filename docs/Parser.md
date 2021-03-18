# Parsers

Parsers are **previous registered functions** with an **unique name** which will format a value to a **string query valid value**.


## Topics

* What is that?
* Where should I use it?
* How do I know which are available?
* How do I create a new one or update an existing ?
* What is the `ReservedWords` param that they use ?


## What is that?
Parsers are **previous registered functions** with an **unique name** which will format a value to a query valid value.


```typescript
const database = new PostgresDatabase();
const parser = new DatetimeParser(database.reservedWords);

const rawValue: Date = new Date();
const parsedValue = parser.parse(rawValue);

console.log(`Raw value [${rawValue.toISOString()}] when it is converted to [${parser.type}] return the query-friendly value: [${parsedValue}]`);

// Raw value [2021-03-18T12:38:24.329Z] when it is converted to [datetime] return the query-friendly value: ['2021-03-18 09:38:24']

```

## Where should I use it ?

Parser is the second parameter when you add a new column:

```typescript
const parser = "string";
database.addColumn("column_name", parser, Random.FirstName());
```

## How do I know which are available?

You can use `database.printParsers()`:

```typescript
const database = new PostgresDatabase();
database.printParsers();
```

### Currently, we have:

|**type**| **description**|
|--|--|
|string| Parse as simple string|
|number| Parse number to number with precision: 2|
|int| Parse number to int|
|date| Parse date to format: "YYYY-MM-DD"|
|datetime| Parse date to format: "YYYY-MM-DD hh:mm:ss"|
|raw| Will not parse. The received value will be used directly on the query. You can use this type to send functions, like NOW()|
|boolean| Parses values to boolean.|

## How do I create a new one or update an existing ?

This example will explain how to create: [javascript](https://github.com/gabrielscarvalho/random-db-populator-example/blob/master/scenarios/3-new-parser.js) or [typescript](https://github.com/gabrielscarvalho/random-db-populator-example/blob/master/scenarios-ts/3-new-parser.ts)

To update an existing parser, basically you need to create another `Parser` with the **same type** you want to replace.
Use the previous example and change type to string. Check what will happen.


### Some parsers can help you creating new ones

For example, `NumberParser` you have this static method that give you a new NumberParser with 3 decimals precision:

```typescript 
 database.addParser(NumberParser.withPrecision(database.reservedWords, 'number.3', 3));

 database.addTable('t_calcs')
   .addColumn('value', 'number.3', Random.Number())
```


## What is the `ReservedWords` param that they require ?

ReservedWords are words or characters that are related to your database. For example, for Postgres you have the reserved word `null` when you want to add a null value.

When you create a class that `extends Parser` you have some methods that can help you using these reserved words:

For example, check the [DateParser](https://github.com/gabrielscarvalho/random-db-populator/blob/master/src/core/parsers/date.parser.ts):

```typescript 
  public parse(val: Date): string {
    if (!val) {
      return this.getNullString(); // -------------------------- Reserved word for null
    }

    const dateString: string = moment(val).format(this.format);
    return this.addQuotes(dateString); // -------------------------- For Postgres, every string value must have single-quote involving it.
  }
```

