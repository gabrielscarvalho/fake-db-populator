"use strict";
exports.__esModule = true;
exports.DataRowColumn = void 0;
var fixed_1 = require("../value-generator/fixed");
var DataRowColumn = /** @class */ (function () {
    function DataRowColumn(dataRow, column, rawValue) {
        this.dataRow = dataRow;
        this.column = column;
        this.rawValue = rawValue;
        this.setValue(rawValue);
    }
    DataRowColumn.prototype.getRawValueAsValueGen = function () {
        return fixed_1.Fixed(this.rawValue);
    };
    DataRowColumn.prototype.setValue = function (rawValue) {
        this.rawValue = rawValue;
        this.parsedValue = this.column.parser.parse(rawValue);
    };
    DataRowColumn.prototype.getColumnName = function () {
        return this.column.name;
    };
    return DataRowColumn;
}());
exports.DataRowColumn = DataRowColumn;
