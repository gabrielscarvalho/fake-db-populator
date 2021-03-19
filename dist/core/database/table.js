"use strict";
exports.__esModule = true;
exports.Table = void 0;
var data_row_1 = require("../data/data-row");
var named_map_1 = require("../utils/named.map");
var column_1 = require("./column");
var Table = /** @class */ (function () {
    function Table(database, name) {
        this._afterGenDataFn = function (dataRow) { return dataRow; };
        this.name = name;
        this.database = database;
        this.columns = new named_map_1.NamedMap();
    }
    Table.prototype.setUniqueKeys = function () {
        var _this = this;
        var columnNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            columnNames[_i] = arguments[_i];
        }
        (columnNames || []).forEach(function (columnName) {
            var column = _this.getColumn(columnName);
            column.isPartOfUniqueKey = true;
        });
        return this;
    };
    Table.prototype.getUniqueKeyColumns = function () {
        var uniqueColumns = (this.columns.getValues() || []).filter(function (column) {
            return column.isPartOfUniqueKey;
        });
        return uniqueColumns;
    };
    Table.prototype.addColumn = function (columnName, type, valueGen) {
        var parser = this.database.getParser(type);
        var column = new column_1.Column(this, columnName, parser, valueGen);
        this.columns.add(columnName, column, { throwIfExists: true });
        return this;
    };
    Table.prototype.getColumn = function (columnName) {
        return this.columns.getForced(columnName);
    };
    Table.prototype.getLastDataRow = function () {
        return this.database.getLastDataRow(this.name);
    };
    Table.prototype.createNewDataRowAndStore = function (queryCommand, extraData, comment) {
        if (extraData === void 0) { extraData = {}; }
        if (comment === void 0) { comment = null; }
        var dataRow = this._afterGenDataFn(new data_row_1.DataRow(queryCommand, this, extraData, comment));
        this.database.addDataRow(dataRow);
        return dataRow;
    };
    Table.prototype.afterGenerateData = function (fn) {
        this._afterGenDataFn = fn;
        return this;
    };
    return Table;
}());
exports.Table = Table;
