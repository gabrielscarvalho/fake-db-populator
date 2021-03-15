
# Random Db Populator
Make it easier to populate your test environments, creating inserts with **consistent random data**. With a clear language, you can focus on what makes your scenario unique.

**Example**: insert a user which name is **John** and is **inactive**.  John must have **2 addresses**.
All other params I accept a random (but still valid) value.
```typescript
// some pre-configurations steps that will be explained below...
database.insert('user', { name:  'John', is_active: false});
database.insert('address', {});
database.insert('address', {});

console.log(database.toSQL().join('\n'));
console.log(database.rollback().join('\n'));
```
The result will be:

```sql
INSERT  INTO user (id, name, lastname, email, gender, is_active, birth, updated_at, telephone) VALUES (1, "John", "Hansen", "cachi@lijanne.se", "M", FALSE, "2004-03-18", "2019-08-18 02:28:14", "55 098915651");
INSERT  INTO  address (id, user_id, receiver) VALUES (1, 1, "Katie Day");
INSERT INTO address (id, user_id, receiver) VALUES (2, 1, "Kathryn Vega");
/* --- ROLLBACK */
DELETE  FROM  address  WHERE id=2;
DELETE  FROM  address  WHERE id=1;
DELETE  FROM user WHERE id=1;
```

## Available databases:
* Postgres