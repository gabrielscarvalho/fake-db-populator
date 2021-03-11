import { Chance } from 'chance';
import { iValueGenerator } from '../../interfaces';
const chance = new Chance();

export class Random {

  public static Number(min: number = 0, max: number = 999, decimals: number = 5): iValueGenerator {
    return () => {
      if (decimals && decimals > 0) {
        return chance.floating({ min, max, fixed: decimals });
      }
      return chance.integer({ min, max });
    }
  }

  public static String(prefix, length = 5): iValueGenerator {
    return () => prefix + '' + chance.string({ length, alpha: true });
  }

  /**
  * Returns a random char
  * @see docs https://chancejs.com/person/name.html
  */
  public static Name(options: object = { nationality: 'en' }): iValueGenerator {
    return () => {
      return chance.name(options);
    }
  }

  /**
    * Returns a random char
    * @see docs https://chancejs.com/person/last.html
    */
  public static LastName(options: object = { nationality: 'en' }): iValueGenerator {
    return () => {
      return chance.last(options);
    }
  }



  /**
    * Returns a random email
    * @see docs https://chancejs.com/web/email.html
   */
  public static Email(options: object = {}): iValueGenerator {
    return () => {
      return chance.email(options);
    }
  }
}
