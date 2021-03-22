import { AutoIncrement } from './auto-increment';

describe('AutoIncrement spec', () => {
  it('when create function with initial value should work', () => {
    const autoIncrement = new AutoIncrement();
    autoIncrement.initialId('test', 20);

    const fn = autoIncrement.valueGen('test', 3);
    expect(fn()).toEqual(23);
    expect(fn()).toEqual(26);
  });

  it('when create function without initial value should work', () => {
    const autoIncrement = new AutoIncrement();

    const fn = autoIncrement.valueGen('test', 3);
    expect(fn()).toEqual(3);
    expect(fn()).toEqual(6);
  });

  it('when create function without initial and with default incrementBy value should work', () => {
    const autoIncrement = new AutoIncrement();

    const fn = autoIncrement.valueGen('test');
    expect(fn()).toEqual(1);
    expect(fn()).toEqual(2);
  });

  it('when adding duplicated initial id must throw exception', () => {
    const autoIncrement = new AutoIncrement();
    autoIncrement.initialId('test', 20);
    expect(() => {
      autoIncrement.initialId('test', 30);
    }).toThrowError('Cannot add [test] to list. The value is already in use.');
  });
});
