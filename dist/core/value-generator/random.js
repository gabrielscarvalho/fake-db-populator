"use strict";
exports.__esModule = true;
exports.Random = void 0;
var chance_1 = require("chance");
var randexp_1 = require("randexp");
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
    /**
     * Returns a random item from list
     * @see docs https://chancejs.com/basics/string.html
     */
    Random.String = function (options) {
        if (options === void 0) { options = { length: 8, alpha: true }; }
        return function () {
            return chance.string(options);
        };
    };
    /**
     * Returns a random number with specific length
     * @see docs https://chancejs.com/basics/string.html
     */
    Random.NumberWithLength = function (length) {
        return Random.String({ length: length, numeric: true, alpha: false });
    };
    /**
     * Returns a random value from a regex.
     * @see docs https://www.npmjs.com/package/randexp
     */
    Random.FromRegularExpression = function (pattern) {
        return function () {
            return randexp_1.randexp(pattern);
        };
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
     * Returns a random boolean
     * @see docs https://chancejs.com/text/bool.html
     */
    Random.Boolean = function (options) {
        if (options === void 0) { options = { likelihood: 50 }; }
        return function () {
            return chance.bool(options);
        };
    };
    /**
     * Returns a random first name
     * @see docs https://chancejs.com/person/first.html
     */
    Random.FirstName = function (options) {
        if (options === void 0) { options = {}; }
        return function () {
            return chance.first(options);
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
     * Returns a random name
     * @see docs https://chancejs.com/person/name.html
     */
    Random.FullName = function (options) {
        if (options === void 0) { options = { nationality: 'en' }; }
        return function () {
            return chance.name(options);
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
        if (options === void 0) { options = {
            alpha: true
        }; }
        return function () {
            return chance.character(options);
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
    /**
     * Returns a random avatar image url
     * @see docs https://chancejs.com/web/avatar.html
     */
    Random.AvatarURL = function (options) {
        if (options === void 0) { options = {}; }
        return function () {
            return chance.avatar(options);
        };
    };
    /**
     * Returns a random address
     * @see docs https://chancejs.com/location/street.html
     */
    Random.Street = function (options) {
        if (options === void 0) { options = { country: 'us' }; }
        return function () {
            return chance.street(options);
        };
    };
    /**
     * Returns a random city
     * @see docs https://chancejs.com/location/city.html
     */
    Random.City = function () {
        return function () {
            return chance.city();
        };
    };
    /**
     * Returns a random country
     * @see docs https://chancejs.com/location/country.html
     */
    Random.Country = function (options) {
        if (options === void 0) { options = { full: true }; }
        return function () {
            return chance.country(options);
        };
    };
    Random.PATTERNS = {
        brazil: {
            POSTAL_CODE: /^\d{5}-\d{3}$/,
            PHONE: /^([0-9]{2}) [0-9]{4}-[0-9]{4}$/
        }
    };
    return Random;
}());
exports.Random = Random;
