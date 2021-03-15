import { LastValue, Fixed }  from './src/index';
import { PostgresDatabase }  from './src/index';
import { AutoIncrement, Random, DateGen }  from './src/index';

/**
 * In this scenario we create a whole database and its scenario.
 * The first part of it (configuration of database), I would recommend you to be let splited - then you can reuse it.
 * 
 * The second part I will create 10 orders with consistent data.
*/



// Part 1: Database Configuration:  (When creating your own, split this part in a common file, to be reused)

const database = new PostgresDatabase();
const autoIncrement = new AutoIncrement();

autoIncrement
  .initialId("user.id", 200)
  .initialId("address.id", 200)  
  .initialId("order.id", 200)
  .initialId("order_item.id", 200);

const tUser = database.addTable("t_user")
  .addColumn('id', 'int', autoIncrement.valueGen('user.id'))
  .addColumn('name', 'string', Random.FirstName())
  .addColumn('surname', 'string', Random.LastName())
  .addColumn('email', 'string', Random.Email())
  .addColumn('gender','string', Random.PickOne(['M', 'F']))
  .addColumn('is_active','boolean', Random.Boolean())
  .addColumn('birth', 'date', DateGen.between({ year: { min: 2000, max: 2005 }}))
  .addColumn('created_at', 'datetime', DateGen.between({ year: { min: 2019, max: 2020 }}))
  .addColumn('updated_at', 'raw', Fixed("now()")) // here i am telling that I want to use a value without be parsed. Useful for calling functions.
  .setUniqueKeys('id');


const tAddress = database.addTable("t_address")  
  .addColumn('id', 'int', autoIncrement.valueGen('address.id'))
  .addColumn('user_id', 'int', LastValue(tUser.getColumn('id')))
  .addColumn('street', 'string', Random.Street())
  .addColumn('city', 'string', Random.City())
  .addColumn('country', 'string', Random.Country())
  .addColumn('postcode', 'string', Random.FromRegularExpression(Random.PATTERNS.brazil.POSTAL_CODE))
  .addColumn('phone', 'string', Random.FromRegularExpression(Random.PATTERNS.brazil.PHONE))
  .addColumn('receiver_name','string', Random.FullName())
  .setUniqueKeys('id');


const tOrder = database
  .addTable("t_order")
  .addColumn("id", "int", autoIncrement.valueGen("order.id"))
  .addColumn('user_id', 'int', LastValue(tUser.getColumn('id')))
  .addColumn('delivery_address_id', 'int', LastValue(tAddress.getColumn('id')))
  .addColumn('billing_address_id', 'int', LastValue(tAddress.getColumn('id')))
  .addColumn("total_price", "number", Random.Number(100, 900))
  .addColumn("freight_price", "number", Random.Number(100, 900))
  .addColumn("discount_price", "number", Random.Number(100, 900))
  .addColumn('created_at', 'datetime', DateGen.between({ year: { min: 2019, max: 2020 }}))
  .addColumn('status', 'string', Random.PickOne(['canceled', 'approved']))
  .setUniqueKeys("id");

const tOrderItem = database
  .addTable("t_order_item")
  .addColumn("id", "int", autoIncrement.valueGen("order_item.id"))
  .addColumn('product_name', 'string', Random.Sentence({ words: 3 }))
  .addColumn("order_id", "int", LastValue(tOrder.getColumn("id")))
  .addColumn("total_price", "number", Random.Number(100, 200))
  .addColumn("freight_price", "number", Random.Number(10, 20))
  .addColumn("discount_price", "number", Random.Number(5, 10))
  .setUniqueKeys("id");



// Part 2: Creating the full scenario!



const user1 = database.insert('t_user', { name: 'John', email: 'john@doe.com' }, 'Creating first user');

const deliveryAddress1 = database.insert('t_address');
const billingAddress1 = database.insert('t_address');

const order1 = database.insert('t_order', { 
  delivery_address_id: deliveryAddress1.getRawValue('id'),
  billing_address_id: billingAddress1.getRawValue('id')
});

const order1Item1 = database.insert("t_order_item", { product_name: 'Iphone 12', total_price: 1200 });
const order1Item2 = database.insert("t_order_item", { product_name: 'Tv Samsung', total_price: 2200 });

order1.setRawValue("total_price", order1Item1.getRawValue("total_price") + order1Item2.getRawValue("total_price"));


// In the following example, we don't care about specific details:

database.insert('t_user', {}, 'Add user 2, with 2 orders.');
database.insert('t_address');

database.insert('t_order', {}, 'User 2, 1# order has 3 items');
database.insert('t_order_item');
database.insert('t_order_item');
database.insert('t_order_item');

database.insert('t_order', {}, 'User 2, 2# order has 1 item');
database.insert('t_order_item');



console.log(database.toSQL().join("\n"));

// Run to see the result:
// node scenarios/5-make-data-more-realistic-othe-tables.js

// Result

// INSERT INTO "order" ("id", "total_price") VALUES (201, 269.32);
// INSERT INTO "order_item" ("id", "order_id", "total_price") VALUES (201, 201, 142.51);
// INSERT INTO "order_item" ("id", "order_id", "total_price") VALUES (202, 201, 126.81);
