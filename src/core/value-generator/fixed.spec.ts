import { Fixed } from './fixed';

describe('Fixed spec', () => {
  it('should return the value it is informed', () => {
    expect(Fixed(2)()).toBe(2);
    expect(Fixed('hi')()).toBe('hi');
    expect(Fixed({ ok: true })()).toEqual({ ok: true });
  });
});
