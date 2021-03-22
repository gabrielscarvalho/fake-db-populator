import { DateGen } from './date';
describe('Date spec', () => {
  it('Random Date', () => {
    const dateFn = DateGen.Random();
    const date: Date = dateFn();
    expect(date).toBeDefined();
  });

  it('Fixed Params', () => {
    const dateFn = DateGen.between({ year: 2020, month: 10, day: 12, hour: 5, minute: 10, second: 20, ms: 500 });
    const date: Date = dateFn();
    expect(date.getFullYear()).toBe(2020);
    expect(date.getMonth()).toBe(10);
    expect(date.getDate()).toBe(12);
    expect(date.getHours()).toBe(5);
    expect(date.getMinutes()).toBe(10);
    expect(date.getSeconds()).toBe(20);
    expect(date.getMilliseconds()).toBe(500);
  });

  it('must return date between params', () => {
    const params = {
      year: { min: 1970, max: 2050 },
      month: { min: 4, max: 11 },
      day: { min: 1, max: 31 },
      hour: { min: 0, max: 12 },
      minute: { min: 0, max: 30 },
      second: { min: 0, max: 30 },
      ms: { min: 250, max: 300 },
    };

    const dateFn = DateGen.between(params);
    const date: Date = dateFn();
    expect(date.getFullYear()).toBeGreaterThanOrEqual(params.year.min);
    expect(date.getFullYear()).toBeLessThanOrEqual(params.year.max);

    expect(date.getMonth()).toBeGreaterThanOrEqual(params.month.min);
    expect(date.getMonth()).toBeLessThanOrEqual(params.month.max);

    expect(date.getDate()).toBeGreaterThanOrEqual(params.day.min);
    expect(date.getDate()).toBeLessThanOrEqual(params.day.max);

    expect(date.getHours()).toBeGreaterThanOrEqual(params.hour.min);
    expect(date.getHours()).toBeLessThanOrEqual(params.hour.max);

    expect(date.getMinutes()).toBeGreaterThanOrEqual(params.minute.min);
    expect(date.getMinutes()).toBeLessThanOrEqual(params.minute.max);

    expect(date.getSeconds()).toBeGreaterThanOrEqual(params.second.min);
    expect(date.getSeconds()).toBeLessThanOrEqual(params.second.max);

    expect(date.getMilliseconds()).toBeGreaterThanOrEqual(params.ms.min);
    expect(date.getMilliseconds()).toBeLessThanOrEqual(params.ms.max);
  });

  it('should throw error for invalid year', () => {
    expect(() => {
      DateGen.between({ year: { min: 1200, max: 2020 } });
    }).toThrowError('Invalid date param: year- min. Informed value: [1200] must be between: [1500] and [2500]');

    expect(() => {
      DateGen.between({ year: { min: 2000, max: 9020 } });
    }).toThrowError('Invalid date param: year- max. Informed value: [9020] must be between: [1500] and [2500]');

    expect(() => {
      DateGen.between({ year: 1000 });
    }).toThrowError('Invalid date param: year. Informed value: [1000] must be between: [1500] and [2500]');
  });

  it('should throw error for invalid month', () => {
    expect(() => {
      DateGen.between({ month: { min: -1999, max: 3 } });
    }).toThrowError('Invalid date param: month- min. Informed value: [-1999] must be between: [0] and [11]');

    expect(() => {
      DateGen.between({ month: { min: 1, max: 9020 } });
    }).toThrowError('Invalid date param: month- max. Informed value: [9020] must be between: [0] and [11]');

    expect(() => {
      DateGen.between({ month: 1000 });
    }).toThrowError('Invalid date param: month. Informed value: [1000] must be between: [0] and [11]');
  });

  it('should throw error for invalid day', () => {
    expect(() => {
      DateGen.between({ day: { min: -1999, max: 3 } });
    }).toThrowError('Invalid date param: day- min. Informed value: [-1999] must be between: [1] and [31]');

    expect(() => {
      DateGen.between({ day: { min: 1, max: 9020 } });
    }).toThrowError('Invalid date param: day- max. Informed value: [9020] must be between: [1] and [31]');

    expect(() => {
      DateGen.between({ day: 1000 });
    }).toThrowError('Invalid date param: day. Informed value: [1000] must be between: [1] and [31]');
  });

  it('should throw error for invalid hour', () => {
    expect(() => {
      DateGen.between({ hour: { min: -1999, max: 3 } });
    }).toThrowError('Invalid date param: hour- min. Informed value: [-1999] must be between: [0] and [23]');

    expect(() => {
      DateGen.between({ hour: { min: 1, max: 9020 } });
    }).toThrowError('Invalid date param: hour- max. Informed value: [9020] must be between: [0] and [23]');

    expect(() => {
      DateGen.between({ hour: 1000 });
    }).toThrowError('Invalid date param: hour. Informed value: [1000] must be between: [0] and [23]');
  });

  it('should throw error for invalid minute', () => {
    expect(() => {
      DateGen.between({ minute: { min: -1999, max: 3 } });
    }).toThrowError('Invalid date param: minute- min. Informed value: [-1999] must be between: [0] and [59]');

    expect(() => {
      DateGen.between({ minute: { min: 1, max: 9020 } });
    }).toThrowError('Invalid date param: minute- max. Informed value: [9020] must be between: [0] and [59]');

    expect(() => {
      DateGen.between({ minute: 1000 });
    }).toThrowError('Invalid date param: minute. Informed value: [1000] must be between: [0] and [59]');
  });

  it('should throw error for invalid second', () => {
    expect(() => {
      DateGen.between({ second: { min: -1999, max: 3 } });
    }).toThrowError('Invalid date param: second- min. Informed value: [-1999] must be between: [0] and [59]');

    expect(() => {
      DateGen.between({ second: { min: 1, max: 9020 } });
    }).toThrowError('Invalid date param: second- max. Informed value: [9020] must be between: [0] and [59]');

    expect(() => {
      DateGen.between({ second: 1000 });
    }).toThrowError('Invalid date param: second. Informed value: [1000] must be between: [0] and [59]');
  });

  it('should throw error for invalid ms', () => {
    expect(() => {
      DateGen.between({ ms: { min: -1999, max: 3 } });
    }).toThrowError('Invalid date param: ms- min. Informed value: [-1999] must be between: [0] and [999]');

    expect(() => {
      DateGen.between({ ms: { min: 1, max: 9020 } });
    }).toThrowError('Invalid date param: ms- max. Informed value: [9020] must be between: [0] and [999]');

    expect(() => {
      DateGen.between({ ms: 1000 });
    }).toThrowError('Invalid date param: ms. Informed value: [1000] must be between: [0] and [999]');
  });
});
