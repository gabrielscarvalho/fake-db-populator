"use strict";
exports.__esModule = true;
exports.Column = void 0;
var Column = /** @class */ (function () {
    /**
     * **WARNING**: Do not create this object by yourself.
     * Use `database.addTable(tableName).addColumn` instead
     */
    function Column(table, name, parser, valueGen) {
        this.isPartOfUniqueKey = false;
        this.table = table;
        this.name = name;
        this.parser = parser;
        this.valueGen = valueGen;
    }
    return Column;
}());
exports.Column = Column;
