# Principles


The main idea is to create a **readable query builder that will understand and complete the fields that aren't important to you**.


To be able to do so, it has the following structure:

```typescript
  
  const database = new MySQLDatabase();

  database.addTable('table_name')
    .addColumn('column_name', 'parser_name', 'value_generator_fn()')
    .addColumn('column_name2', 'parser_name', 'value_generator_fn()')
    
    .addUniqueKeys('column_name', 'column_name2'...)
    .afterGenerateData((dataRow: iDataRow) => {
      dataRow.setRawValue('column_name2', dataRow.getRawValue('column_name'));
      return dataRow;
    });
```

* `column_name`: is the unique name of the column
* `parser_name`: the name of the function that will convert a raw value to a query value. Check [parser docs](https://github.com/gabrielscarvalho/random-db-populator/blob/master/docs/Parser.md)
* `value_generator_fn`: a function that will give us a valid random value of what we need. For example: valid random names. Check [Value Generator Docs](https://github.com/gabrielscarvalho/random-db-populator/blob/master/docs/ValueGenerator.md)
* `addUniqueKeys`: add all column names which are required to delete a register.
* `afterGenerateData`: you can use this function to make data more realistic.



## The Usage


For example: I want an order which has 3 items:
* First: must be an Iphone 12.
* Second: Must have 10% discount on total_price
* Third: it can be a random item.

```typescript
  database.insert('t_order');
  database.insert('t_order_item', { product_name: 'Iphone 12'});

  const secondItem = database.insert('t_order_item');
  secondItem.setRawValue('discount', secondItem.getRawValue('total_price') * 0.1);
 
  database.insert('t_order_item');
  
```

This lib understand that `t_order_item` requires a `t_order.id`. 
If you don't inform it, it will try to handle, by getting the last emitted value.

```typescript
  const tOrder = database.addTable("t_order")
  .addColumn("id", "int", autoIncrement.valueGen("order.id"));

  const tOrderItem = database.addTable("t_order_item")
    .addColumn("id", "int", autoIncrement.valueGen("order_item.id"))
    .addColumn("order_id", "int", LastValue(tOrder.getColumn("id")))
```

And of course, you can inform the value:

```typescript
  database.insert('t_order_item', { order_id: 3 });
```

