import { iValueGenerator } from '../../interfaces';
export declare class Random {
    static PATTERNS: {
        brazil: {
            POSTAL_CODE: RegExp;
            PHONE: RegExp;
        };
    };
    static Number(min?: number, max?: number, decimals?: number): iValueGenerator;
    /**
     * Returns a random item from list
     * @see docs https://chancejs.com/basics/string.html
     */
    static String(options?: {
        length?: number;
        casing?: 'upper';
        alpha?: boolean;
        numeric?: boolean;
    }): iValueGenerator;
    /**
     * Returns a random number with specific length
     * @see docs https://chancejs.com/basics/string.html
     */
    static NumberWithLength(length: number): iValueGenerator;
    /**
     * Returns a random value from a regex.
     * @see docs https://www.npmjs.com/package/randexp
     */
    static FromRegularExpression(pattern: RegExp): iValueGenerator;
    /**
     * Returns a random item from list
     * @see docs https://chancejs.com/text/pickone.html
     */
    static PickOne(list: any[]): iValueGenerator;
    /**
     * Returns a random boolean
     * @see docs https://chancejs.com/text/bool.html
     */
    static Boolean(options?: {
        likelihood: number;
    }): iValueGenerator;
    /**
     * Returns a random first name
     * @see docs https://chancejs.com/person/first.html
     */
    static FirstName(options?: {
        gender?: 'male' | 'female';
        nationality?: 'us' | 'en';
    }): iValueGenerator;
    /**
     * Returns a random char
     * @see docs https://chancejs.com/person/last.html
     */
    static LastName(options?: {
        nationality: string;
    }): iValueGenerator;
    /**
     * Returns a random name
     * @see docs https://chancejs.com/person/name.html
     */
    static FullName(options?: {
        nationality: string;
    }): iValueGenerator;
    /**
     * Returns a random email
     * @see docs https://chancejs.com/web/email.html
     */
    static Email(options?: {
        domain?: string;
    }): iValueGenerator;
    /**
     * Returns a random word
     * @see docs https://chancejs.com/text/word.html
     */
    static Word(options?: {
        syllables: number;
    }): iValueGenerator;
    /**
     * Returns a random word
     * @see docs https://chancejs.com/text/word.html
     */
    static Sentence(options?: {
        words: number;
    }): iValueGenerator;
    /**
     * Returns a random guid
     * @see docs https://chancejs.com/miscellaneous/guid.html
     */
    static Guid(options?: {
        version?: number;
    }): iValueGenerator;
    /**
     * Returns a random hash
     * @see docs https://chancejs.com/miscellaneous/hash.html
     */
    static Hash(options?: {
        length?: number;
        casing?: 'upper';
    }): iValueGenerator;
    /**
     * Returns a random char
     * @see docs https://chancejs.com/miscellaneous/hash.html
     */
    static Char(options?: {
        alpha: boolean;
        pool?: string;
        numeric?: boolean;
        casing?: 'lower' | 'upper';
        symbols?: boolean;
    }): iValueGenerator;
    /**
     * Returns a random cpf
     * @see docs https://chancejs.com/person/cpf.html
     */
    static Cpf(): iValueGenerator;
    /**
     * Returns a random avatar image url
     * @see docs https://chancejs.com/web/avatar.html
     */
    static AvatarURL(options?: {
        protocol?: 'http' | 'https';
        fileExtension?: string;
    }): iValueGenerator;
    /**
     * Returns a random address
     * @see docs https://chancejs.com/location/street.html
     */
    static Street(options?: {
        country: 'it' | 'us';
        syllables?: number;
        short_suffix?: boolean;
    }): iValueGenerator;
    /**
     * Returns a random city
     * @see docs https://chancejs.com/location/city.html
     */
    static City(): iValueGenerator;
    /**
     * Returns a random country
     * @see docs https://chancejs.com/location/country.html
     */
    static Country(options?: {
        full: boolean;
    }): iValueGenerator;
}
