import { Optional } from './optional';

describe('Optional tests', () => {
  it('should be able to get the value if present', () => {
    const opt = Optional.fromValue('test');
    expect(opt.isPresent()).toBe(true);
    expect(opt.get()).toBe('test');
  });

  it('should return not present fromNull', () => {
    const opt = Optional.fromNull();
    expect(opt.isPresent()).toBe(false);
  });

  it('should be able to get the value skipping validation - if value exists', () => {
    const opt = Optional.fromValue('test');
    expect(opt.getForced()).toBe('test');
  });

  it('should not be able to get the value skipping validation - if value does not exists', () => {
    const opt = Optional.fromNull();

    expect(() => {
      opt.getForced();
    }).toThrowError('Optional forced get of non existent value');
  });

  it('should throw error if trying to get value without checking if is present', () => {
    const opt = Optional.fromValue('valid value');

    expect(() => {
      opt.get();
    }).toThrowError('It is required to check if value is present before getting it. Call isPresent() before.');
  });
});
