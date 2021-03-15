"use strict";
exports.__esModule = true;
exports.Column = void 0;
var Column = /** @class */ (function () {
    function Column(table, name, parser, valueGen) {
        this.table = table;
        this.name = name;
        this.parser = parser;
        this.valueGen = valueGen;
    }
    return Column;
}());
exports.Column = Column;
