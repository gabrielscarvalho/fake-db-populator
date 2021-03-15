"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PostgresDatabase = void 0;
var database_1 = require("../core/database/database");
var boolean_parser_1 = require("../core/parsers/boolean.parser");
var date_parser_1 = require("../core/parsers/date.parser");
var datetime_parser_1 = require("../core/parsers/datetime.parser");
var int_parser_1 = require("../core/parsers/int.parser");
var number_parser_1 = require("../core/parsers/number.parser");
var raw_parser_1 = require("../core/parsers/raw.parser");
var string_parser_1 = require("../core/parsers/string.parser");
var PostgresDatabase = /** @class */ (function (_super) {
    __extends(PostgresDatabase, _super);
    function PostgresDatabase() {
        var _this = _super.call(this) || this;
        _this.addParser(new string_parser_1.StringParser(_this.reservedWords));
        _this.addParser(new number_parser_1.NumberParser(_this.reservedWords));
        _this.addParser(new int_parser_1.IntParser(_this.reservedWords));
        _this.addParser(new date_parser_1.DateParser(_this.reservedWords));
        _this.addParser(new datetime_parser_1.DateTimeParser(_this.reservedWords));
        _this.addParser(new raw_parser_1.RawParser(_this.reservedWords));
        _this.addParser(new boolean_parser_1.BooleanParser(_this.reservedWords));
        return _this;
    }
    PostgresDatabase.prototype.createComment = function (comment) {
        return "/* " + comment + " */ ";
    };
    PostgresDatabase.prototype.createInsertQuery = function (dataRow) {
        var _this = this;
        var columns = dataRow.getColumnsName().map(function (columnName) {
            return _this.getEntityParser().parse(columnName);
        }).join(', ');
        var values = dataRow.getColumnsParsedValue().join(', ');
        var table = this.getEntityParser().parse(dataRow.table.name);
        return "INSERT INTO " + table + " (" + columns + ") VALUES (" + values + ");";
    };
    PostgresDatabase.prototype.createDeleteQuery = function (dataRow) {
        var _this = this;
        var tableName = this.getEntityParser().parse(dataRow.table.name);
        var dataRowColumns = dataRow.getUniqueKeyColumns();
        var whereData = [];
        (dataRowColumns || []).forEach(function (dataRowColumn) {
            var columnName = _this.getEntityParser().parse(dataRowColumn.getColumnName());
            whereData.push(columnName + "=" + dataRowColumn.parsedValue);
        });
        var where = whereData.join(' AND ');
        return "DELETE FROM " + tableName + " WHERE " + where + ";";
    };
    return PostgresDatabase;
}(database_1.Database));
exports.PostgresDatabase = PostgresDatabase;
