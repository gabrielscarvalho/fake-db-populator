import { Chance } from 'chance';
import { iValueGenerator } from '../../interfaces';
import { randexp } from 'randexp';
const chance = new Chance();

export class Random {
  public static PATTERNS = {
    brazil: {
      POSTAL_CODE: /^\d{5}-\d{3}$/,
      PHONE: /^([0-9]{2}) [0-9]{4}-[0-9]{4}$/,
    },
  };

  public static Number(min: number = 0, max: number = 999, decimals: number = 5): iValueGenerator {
    return () => {
      if (decimals && decimals > 0) {
        return chance.floating({ min, max, fixed: decimals });
      }
      return chance.integer({ min, max });
    };
  }

  /**
   * Returns a random item from list
   * @see docs https://chancejs.com/basics/string.html
   */
  public static String(
    options: {
      length?: number;
      casing?: 'upper';
      alpha?: boolean;
      numeric?: boolean;
    } = { length: 8, alpha: true }
  ): iValueGenerator {
    return () => {
      return chance.string(options);
    };
  }

  /**
   * Returns a random number with specific length
   * @see docs https://chancejs.com/basics/string.html
   */
  public static NumberWithLength(length: number): iValueGenerator {
    return Random.String({ length, numeric: true, alpha: false });
  }

  /**
   * Returns a random value from a regex.
   * @see docs https://www.npmjs.com/package/randexp
   */
  public static FromRegularExpression(pattern: RegExp): iValueGenerator {
    return () => {
      return randexp(pattern);
    };
  }

  /**
   * Returns a random item from list
   * @see docs https://chancejs.com/text/pickone.html
   */
  public static PickOne(list: any[]): iValueGenerator {
    return () => {
      return chance.pickone(list);
    };
  }

  /**
   * Returns a random boolean
   * @see docs https://chancejs.com/text/bool.html
   */
  public static Boolean(options: { likelihood: number } = { likelihood: 50 }): iValueGenerator {
    return () => {
      return chance.bool(options);
    };
  }

  /**
   * Returns a random first name
   * @see docs https://chancejs.com/person/first.html
   */
  public static FirstName(options: { gender?: 'male' | 'female'; nationality?: 'us' | 'en' } = {}): iValueGenerator {
    return () => {
      return chance.first(options);
    };
  }

  /**
   * Returns a random char
   * @see docs https://chancejs.com/person/last.html
   */
  public static LastName(options: { nationality: string } = { nationality: 'en' }): iValueGenerator {
    return () => {
      return chance.last(options);
    };
  }

  /**
   * Returns a random name
   * @see docs https://chancejs.com/person/name.html
   */
  public static FullName(options: { nationality: string } = { nationality: 'en' }): iValueGenerator {
    return () => {
      return chance.name(options);
    };
  }

  /**
   * Returns a random email
   * @see docs https://chancejs.com/web/email.html
   */
  public static Email(options: { domain?: string } = {}): iValueGenerator {
    return () => {
      return chance.email(options);
    };
  }

  /**
   * Returns a random word
   * @see docs https://chancejs.com/text/word.html
   */
  public static Word(options: { syllables: number } = { syllables: 3 }): iValueGenerator {
    return () => {
      return chance.word(options);
    };
  }

  /**
   * Returns a random word
   * @see docs https://chancejs.com/text/word.html
   */
  public static Sentence(options: { words: number } = { words: 3 }): iValueGenerator {
    return () => {
      return chance.sentence(options);
    };
  }

  /**
   * Returns a random guid
   * @see docs https://chancejs.com/miscellaneous/guid.html
   */
  public static Guid(options: { version?: number } = {}): iValueGenerator {
    return () => {
      return chance.guid(options);
    };
  }

  /**
   * Returns a random hash
   * @see docs https://chancejs.com/miscellaneous/hash.html
   */
  public static Hash(options: { length?: number; casing?: 'upper' } = {}): iValueGenerator {
    return () => {
      return chance.hash(options);
    };
  }

  /**
   * Returns a random char
   * @see docs https://chancejs.com/miscellaneous/hash.html
   */
  public static Char(
    options: { alpha: boolean; pool?: string; numeric?: boolean; casing?: 'lower' | 'upper'; symbols?: boolean } = {
      alpha: true,
    }
  ): iValueGenerator {
    return () => {
      return chance.character(options);
    };
  }

  /**
   * Returns a random cpf
   * @see docs https://chancejs.com/person/cpf.html
   */
  public static Cpf(): iValueGenerator {
    return () => {
      return chance.cpf();
    };
  }

  /**
   * Returns a random avatar image url
   * @see docs https://chancejs.com/web/avatar.html
   */
  public static AvatarURL(options: { protocol?: 'http' | 'https'; fileExtension?: string } = {}): iValueGenerator {
    return () => {
      return chance.avatar(options);
    };
  }

  /**
   * Returns a random address
   * @see docs https://chancejs.com/location/street.html
   */
  public static Street(
    options: {
      country: 'it' | 'us';
      syllables?: number;
      short_suffix?: boolean;
    } = { country: 'us' }
  ): iValueGenerator {
    return () => {
      return chance.street(options);
    };
  }

  /**
   * Returns a random city
   * @see docs https://chancejs.com/location/city.html
   */
  public static City(): iValueGenerator {
    return () => {
      return chance.city();
    };
  }

  /**
   * Returns a random country
   * @see docs https://chancejs.com/location/country.html
   */
  public static Country(options: { full: boolean } = { full: true }): iValueGenerator {
    return () => {
      return chance.country(options);
    };
  }
}
