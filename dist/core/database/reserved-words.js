"use strict";
exports.__esModule = true;
exports.DatabaseReservedWords = void 0;
var SINGLE_QUOTES = "'";
var DOUBLE_QUOTES = '"';
var DatabaseReservedWords = /** @class */ (function () {
    function DatabaseReservedWords() {
        this["null"] = 'null';
        this.quotesForValues = SINGLE_QUOTES;
        this.quotesForEntities = DOUBLE_QUOTES;
        this.boolean = {
            "true": 'true',
            "false": 'false'
        };
    }
    return DatabaseReservedWords;
}());
exports.DatabaseReservedWords = DatabaseReservedWords;
