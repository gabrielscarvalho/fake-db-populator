"use strict";
exports.__esModule = true;
exports.Random = void 0;
var chance_1 = require("chance");
var chance = new chance_1.Chance();
var Random = /** @class */ (function () {
    function Random() {
    }
    Random.Number = function (min, max, decimals) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 999; }
        if (decimals === void 0) { decimals = 5; }
        return function () {
            if (decimals && decimals > 0) {
                return chance.floating({ min: min, max: max, fixed: decimals });
            }
            return chance.integer({ min: min, max: max });
        };
    };
    Random.String = function (prefix, length) {
        if (length === void 0) { length = 5; }
        return function () { return prefix + '' + chance.string({ length: length, alpha: true }); };
    };
    /**
       * Returns a random item from list
       * @see docs https://chancejs.com/text/pickone.html
      */
    Random.PickOne = function (list) {
        return function () {
            return chance.pickone(list);
        };
    };
    /**
       * Returns a random word
       * @see docs https://chancejs.com/text/bool.html
      */
    Random.Boolean = function (options) {
        if (options === void 0) { options = { likelihood: 50 }; }
        return function () {
            return chance.bool(options);
        };
    };
    /**
    * Returns a random char
    * @see docs https://chancejs.com/person/name.html
    */
    Random.Name = function (options) {
        if (options === void 0) { options = { nationality: 'en' }; }
        return function () {
            return chance.name(options);
        };
    };
    /**
      * Returns a random char
      * @see docs https://chancejs.com/person/last.html
      */
    Random.LastName = function (options) {
        if (options === void 0) { options = { nationality: 'en' }; }
        return function () {
            return chance.last(options);
        };
    };
    /**
      * Returns a random email
      * @see docs https://chancejs.com/web/email.html
     */
    Random.Email = function (options) {
        if (options === void 0) { options = {}; }
        return function () {
            return chance.email(options);
        };
    };
    /**
       * Returns a random word
       * @see docs https://chancejs.com/text/word.html
      */
    Random.Word = function (options) {
        if (options === void 0) { options = { syllables: 3 }; }
        return function () {
            return chance.word(options);
        };
    };
    /**
      * Returns a random word
      * @see docs https://chancejs.com/text/word.html
      */
    Random.Sentence = function (options) {
        if (options === void 0) { options = { words: 3 }; }
        return function () {
            return chance.sentence(options);
        };
    };
    /**
      * Returns a random guid
      * @see docs https://chancejs.com/miscellaneous/guid.html
    */
    Random.Guid = function (options) {
        if (options === void 0) { options = {}; }
        return function () {
            return chance.guid(options);
        };
    };
    /**
    * Returns a random hash
    * @see docs https://chancejs.com/miscellaneous/hash.html
    */
    Random.Hash = function (options) {
        if (options === void 0) { options = {}; }
        return function () {
            return chance.hash(options);
        };
    };
    /**
      * Returns a random char
      * @see docs https://chancejs.com/miscellaneous/hash.html
      */
    Random.Char = function (options) {
        if (options === void 0) { options = { alpha: true }; }
        return function () {
            return chance.char(options);
        };
    };
    /**
      * Returns a random cpf
      * @see docs https://chancejs.com/person/cpf.html
      */
    Random.Cpf = function () {
        return function () {
            return chance.cpf();
        };
    };
    return Random;
}());
exports.Random = Random;
