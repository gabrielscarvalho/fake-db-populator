import { Chance } from 'chance';
import _ from 'lodash';
import { iValueGenerator } from '../../interfaces';
const chance = new Chance();

interface DateRange {
  year:
    | number
    | {
        min: number;
        max: number;
      };
  month:
    | number
    | {
        min: number;
        max: number;
      };
  day:
    | number
    | {
        min: number;
        max: number;
      };
  hour:
    | number
    | {
        min: number;
        max: number;
      };
  minute:
    | number
    | {
        min: number;
        max: number;
      };
  second:
    | number
    | {
        min: number;
        max: number;
      };
  ms:
    | number
    | {
        min: number;
        max: number;
      };
}

const checkRange = (fieldName: string, value: number, min: number, max: number) => {
  if (value < min || value > max) {
    throw new Error(
      `Invalid date param: ${fieldName}. Informed value: [${value}] must be between: [${min}] and [${max}]`
    );
  }
};

const checkLimits = (fieldName: string, value: number | { min: number; max: number }, min: number, max: number) => {
  if (_.isNumber(value)) {
    checkRange(fieldName, value, min, max);
  } else {
    checkRange(`${fieldName}- min`, value.min, min, max);
    checkRange(`${fieldName}- max`, value.max, min, max);
  }
};

export class DateGen {
  public static getDefaultDateRange(): DateRange {
    return {
      year: {
        min: 1970,
        max: 2050,
      },
      month: {
        min: 0,
        max: 11,
      },
      day: {
        min: 1,
        max: 31,
      },
      hour: {
        min: 0,
        max: 12,
      },
      minute: {
        min: 0,
        max: 59,
      },
      second: {
        min: 0,
        max: 59,
      },
      ms: {
        min: 0,
        max: 999,
      },
    };
  }

  public static between(range: Partial<DateRange> = {}): iValueGenerator {
    const dateRange = Object.assign(_.cloneDeep(DateGen.getDefaultDateRange()), range);

    checkLimits('year', dateRange.year, 1500, 2500);

    checkLimits('month', dateRange.month, 0, 11);
    checkLimits('day', dateRange.day, 1, 31);
    checkLimits('hour', dateRange.hour, 0, 23);
    checkLimits('minute', dateRange.minute, 0, 59);
    checkLimits('second', dateRange.second, 0, 59);
    checkLimits('ms', dateRange.ms, 0, 999);

    return () => {
      const year = _.isNumber(dateRange.year) ? dateRange.year : chance.integer(dateRange.year);
      const month = _.isNumber(dateRange.month) ? dateRange.month : chance.integer(dateRange.month);
      const day = _.isNumber(dateRange.day) ? dateRange.day : chance.integer(dateRange.day);
      const hour = _.isNumber(dateRange.hour) ? dateRange.hour : chance.integer(dateRange.hour);
      const minute = _.isNumber(dateRange.minute) ? dateRange.minute : chance.integer(dateRange.minute);
      const second = _.isNumber(dateRange.second) ? dateRange.second : chance.integer(dateRange.second);
      const ms = _.isNumber(dateRange.ms) ? dateRange.ms : chance.integer(dateRange.ms);

      return new Date(year, month, day, hour, minute, second, ms);
    };
  }

  /**
   * Returns a random date
   * @see docs https://chancejs.com/text/date.html
   */
  public static Random(): iValueGenerator {
    return () => {
      return chance.date();
    };
  }
}
