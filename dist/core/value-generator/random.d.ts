import { iValueGenerator } from '../../interfaces';
export declare class Random {
    static Number(min?: number, max?: number, decimals?: number): iValueGenerator;
    static String(prefix: any, length?: number): iValueGenerator;
    /**
       * Returns a random item from list
       * @see docs https://chancejs.com/text/pickone.html
      */
    static PickOne(list: any[]): iValueGenerator;
    /**
       * Returns a random word
       * @see docs https://chancejs.com/text/bool.html
      */
    static Boolean(options?: object): iValueGenerator;
    /**
    * Returns a random char
    * @see docs https://chancejs.com/person/name.html
    */
    static Name(options?: object): iValueGenerator;
    /**
      * Returns a random char
      * @see docs https://chancejs.com/person/last.html
      */
    static LastName(options?: object): iValueGenerator;
    /**
      * Returns a random email
      * @see docs https://chancejs.com/web/email.html
     */
    static Email(options?: object): iValueGenerator;
    /**
       * Returns a random word
       * @see docs https://chancejs.com/text/word.html
      */
    static Word(options?: object): iValueGenerator;
    /**
      * Returns a random word
      * @see docs https://chancejs.com/text/word.html
      */
    static Sentence(options?: object): iValueGenerator;
    /**
      * Returns a random guid
      * @see docs https://chancejs.com/miscellaneous/guid.html
    */
    static Guid(options?: object): iValueGenerator;
    /**
    * Returns a random hash
    * @see docs https://chancejs.com/miscellaneous/hash.html
    */
    static Hash(options?: object): iValueGenerator;
    /**
      * Returns a random char
      * @see docs https://chancejs.com/miscellaneous/hash.html
      */
    static Char(options?: object): iValueGenerator;
    /**
      * Returns a random cpf
      * @see docs https://chancejs.com/person/cpf.html
      */
    static Cpf(): iValueGenerator;
}
