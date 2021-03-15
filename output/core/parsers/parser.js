"use strict";
exports.__esModule = true;
exports.Parser = void 0;
var Parser = /** @class */ (function () {
    function Parser(reservedWords) {
        this.reservedWords = reservedWords;
    }
    Parser.prototype.addQuotes = function (value) {
        var quote = this.reservedWords.quotesForValues;
        return "" + quote + value + quote;
    };
    Parser.prototype.getNullString = function () {
        return this.reservedWords["null"];
    };
    Parser.prototype.addQuotesForEntities = function (value) {
        var quote = this.reservedWords.quotesForEntities;
        return "" + quote + value + quote;
    };
    return Parser;
}());
exports.Parser = Parser;
