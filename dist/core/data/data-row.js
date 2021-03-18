"use strict";
exports.__esModule = true;
exports.DataRow = void 0;
var map_1 = require("../utils/map");
var data_row_column_1 = require("./data-row-column");
var DataRow = /** @class */ (function () {
    function DataRow(queryCommand, table, extraData, comment) {
        if (extraData === void 0) { extraData = {}; }
        if (comment === void 0) { comment = null; }
        this.queryCommand = queryCommand;
        this.table = table;
        this.extraData = extraData;
        this.comment = comment;
        this.hasCreatedQuery = false;
        this.hasCreatedQuery = false;
        this.data = new map_1.NamedMap();
        this.generateData();
    }
    DataRow.prototype.getColumnData = function (columnName) {
        var optDataRow = this.data.get(columnName, { throwIfNotExists: true });
        return optDataRow.get({ skipValidation: true });
    };
    DataRow.prototype.getRawValue = function (columnName) {
        return this.getColumnData(columnName).rawValue;
    };
    DataRow.prototype.setRawValue = function (columnName, newRawValue) {
        this.getColumnData(columnName).setValue(newRawValue);
    };
    DataRow.prototype.print = function () {
        var _this = this;
        var obj = new Object();
        this.data.getKeys().forEach(function (keyName) {
            var optDataRowColumn = _this.data.get(keyName, { throwIfNotExists: true });
            var dataRowColumn = optDataRowColumn.get({ skipValidation: true });
            obj[keyName] = dataRowColumn.rawValue;
        });
        console.log("DataRow object from: [" + this.table.name + "] contains value: ", JSON.stringify(obj));
    };
    DataRow.prototype.generateData = function () {
        var _this = this;
        this.table.columns.getValues().forEach(function (column) {
            var value = null;
            if ((_this.extraData || {}).hasOwnProperty(column.name)) {
                var forcedValue = _this.extraData[column.name];
                value = forcedValue;
            }
            else {
                try {
                    value = column.valueGen();
                }
                catch (err) {
                    throw new Error("Error while calculating the value of column: " + column.table.name + "." + column.name + ": " + err.message);
                }
            }
            var dataColumn = new data_row_column_1.DataRowColumn(_this, column, value);
            _this.data.add(column.name, dataColumn, { throwIfExists: true });
        });
    };
    return DataRow;
}());
exports.DataRow = DataRow;
