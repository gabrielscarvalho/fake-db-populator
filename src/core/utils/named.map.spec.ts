import { NamedMap } from './named.map';
import { Optional } from './optional';

describe('NamedMap tests', () => {
  it('should be able to check if has value', () => {
    const map: NamedMap<number> = new NamedMap<number>();

    map.add('age', 10);

    expect(map.has('age')).toBe(true);
    expect(map.has('other-field')).toBe(false);
  });
  it('should be able to add and get value', () => {
    const map: NamedMap<number> = new NamedMap<number>();

    map.add('age', 10);

    const optAge: Optional<number> = map.get('age');

    expect(optAge.isPresent()).toBe(true);
    expect(optAge.get()).toBe(10);
  });

  it('should be able to add and get forced value', () => {
    const map: NamedMap<number> = new NamedMap<number>();

    map.add('age', 10);

    const age: number = map.getForced('age');
    expect(age).toBe(10);
  });

  it('should be able to add duplicated value', () => {
    const map: NamedMap<number> = new NamedMap<number>();

    map.add('age', 10);
    map.add('age', 15);

    const optAge: Optional<number> = map.get('age');

    expect(optAge.isPresent()).toBe(true);
    expect(optAge.get()).toBe(15);
  });

  it('should not be able to add duplicated value if config does not allow', () => {
    const map: NamedMap<number> = new NamedMap<number>();

    map.add('age', 10, { throwIfExists: true });

    const optAge: Optional<number> = map.get('age');
    expect(optAge.isPresent()).toBe(true);

    expect(() => {
      map.add('age', 15, { throwIfExists: true });
    }).toThrowError('Cannot add age to list. The value is already in use.');
  });

  it('should not be able to get inexistent value if config does not allow', () => {
    const map: NamedMap<number> = new NamedMap<number>();

    map.add('age', 10, { throwIfExists: true });

    const optAge: Optional<number> = map.get('age');
    expect(optAge.isPresent()).toBe(true);

    expect(() => {
      map.getForced('unknown-prop');
    }).toThrowError(
      "Could not get unknown 'unknown-prop' from list.  Did you spell it right? Valid values: [age]"
    );
  });

  it('should be able to get unexistent values', () => {
    const map: NamedMap<number> = new NamedMap<number>();

    map.add('age', 10);

    const optAge: Optional<number> = map.get('unknown-prop');
    expect(optAge.isPresent()).toBe(false);
  });

  it('should be able to delete value', () => {
    const map: NamedMap<number> = new NamedMap<number>();
    map.add('age', 10);
    expect(map.has('age')).toBe(true);
    expect(map.delete('age')).toBe(true);
    expect(map.has('age')).toBe(false);
  });

  it('should be able to delete inexistent values if config allows it', () => {
    const map: NamedMap<number> = new NamedMap<number>();
    map.add('age', 10);
    expect(map.has('unknown-prop')).toBe(false);
    expect(map.delete('unknown-prop')).toBe(false);
    expect(map.has('unknown-prop')).toBe(false);
  });

  it('should not be able to delete inexistent values if config does not allows it', () => {
    const map: NamedMap<number> = new NamedMap<number>();
    map.add('age', 10);
    expect(map.has('unknown-prop')).toBe(false);

    expect(() => {
      expect(map.delete('unknown-prop', { throwIfNotExists: true })).toBe(
        false
      );
    }).toThrowError(
      "Could not delete unknown 'unknown-prop' from list. Did you spell it right? Valid values: [age]"
    );
  });

  it('should be able to get empty keys', () => {
    const map: NamedMap<number> = new NamedMap<number>();
    expect(map.getKeys()).toEqual([]);
  });

  it('should be able to get all keys', () => {
    const map: NamedMap<number> = new NamedMap<number>();
    map.add('age', 10);
    map.add('lucky-number', 7);

    expect(map.getKeys()).toEqual(['age', 'lucky-number']);
  });

  it('should be able to get empty values', () => {
    const map: NamedMap<number> = new NamedMap<number>();
    expect(map.getValues()).toEqual([]);
  });

  it('should be able to get all keys', () => {
    const map: NamedMap<number> = new NamedMap<number>();
    map.add('age', 10);
    map.add('lucky-number', 7);

    expect(map.getValues()).toEqual([10, 7]);
  });

  it('should be able to find objects', () => {
    type User = { id: number; name: string };

    const map: NamedMap<User> = new NamedMap<User>();
    map.add('john', { id: 1, name: 'John' });
    map.add('paul', { id: 2, name: 'Paul' });

    const optUser: Optional<User> = map.find({ id: 2 });
    expect(optUser.isPresent()).toBe(true);

    expect(optUser.get()).toEqual({ id: 2, name: 'Paul' });
  });

  it('should be able to return not found register', () => {
    type User = { id: number; name: string };

    const map: NamedMap<User> = new NamedMap<User>();
    map.add('john', { id: 1, name: 'John' });
    map.add('paul', { id: 2, name: 'Paul' });

    const optUser: Optional<User> = map.find({ id: 3 });
    expect(optUser.isPresent()).toBe(false);
  });

  it('should be able to loop through data', () => {
    const map: NamedMap<number> = new NamedMap<number>();
    map.add('age', 10);
    map.add('lucky-number', 7);

    let foundAge: boolean = false;
    let foundLuckyNumber: boolean = false;

    map.forEachEntry((key: string, value: number) => {
      if (key === 'age' && value === 10) {
        foundAge = true;
      } else if (key === 'lucky-number' && value === 7) {
        foundLuckyNumber = true;
      } else {
        fail('received invalid value');
      }
    });

    expect(foundAge).toBe(true);
    expect(foundLuckyNumber).toBe(true);
  });

  it('should not break if loop has no data', () => {
    const map: NamedMap<number> = new NamedMap<number>();

    map.forEachEntry((key: string, value: number) => {
      fail('should not execute function');
    });
  });
});
