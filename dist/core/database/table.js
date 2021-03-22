"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Table = void 0;
var data_row_1 = require("../data/data-row");
var query_command_enum_1 = __importDefault(require("../query-builder/query-command.enum"));
var named_map_1 = require("../utils/named.map");
var column_1 = require("./column");
var Table = /** @class */ (function () {
    /**
     * **WARNING**: Do not create this object by yourself.
     * Use `database.addTable(tableName)` instead
     */
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
        if (columnNames.length == 0) {
            throw new Error('setUniqueKeys require at least 1 column');
        }
        columnNames.forEach(function (columnName) {
            var column = _this.getColumn(columnName);
            column.isPartOfUniqueKey = true;
        });
        return this;
    };
    Table.prototype.getUniqueKeyColumns = function () {
        var uniqueColumns = this.columns.getValues().filter(function (column) {
            return column.isPartOfUniqueKey;
        });
        return uniqueColumns;
    };
    Table.prototype.addColumn = function (columnName, type, valueGen) {
        var parser = this.database.getParser(type);
        var column = new column_1.Column(this, columnName, parser, valueGen);
        if (!valueGen) {
            throw new Error("Column: [" + this.name + "." + columnName + "] is missing valueGenerator param. Example: table.addColumn('column_name', 'parser', valGeneratorFn);");
        }
        this.columns.add(columnName, column, { throwIfExists: true });
        return this;
    };
    Table.prototype.getColumn = function (columnName) {
        return this.columns.getForced(columnName);
    };
    Table.prototype.getLastDataRow = function () {
        return this.database.getLastDataRow(this.name);
    };
    Table.prototype.insert = function (extraData, comment) {
        if (extraData === void 0) { extraData = {}; }
        if (comment === void 0) { comment = null; }
        var dataRow = this._afterGenDataFn(new data_row_1.DataRow(query_command_enum_1["default"].INSERT, this, extraData, comment));
        dataRow.reApplyForcedValues();
        this.database.dangerous_addDataRow(dataRow);
        return dataRow;
    };
    Table.prototype.afterGenerateData = function (fn) {
        this._afterGenDataFn = fn;
        return this;
    };
    return Table;
}());
exports.Table = Table;
