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
exports.MySQLDatabase = void 0;
var database_1 = require("../core/database/database");
var boolean_parser_1 = require("../core/parsers/boolean.parser");
var date_parser_1 = require("../core/parsers/date.parser");
var datetime_parser_1 = require("../core/parsers/datetime.parser");
var int_parser_1 = require("../core/parsers/int.parser");
var number_parser_1 = require("../core/parsers/number.parser");
var raw_parser_1 = require("../core/parsers/raw.parser");
var string_parser_1 = require("../core/parsers/string.parser");
var database_2 = require("../shortcut/database");
var MySQLDatabase = /** @class */ (function (_super) {
    __extends(MySQLDatabase, _super);
    function MySQLDatabase() {
        var _this = this;
        var reservedWords = new database_2.DatabaseReservedWords();
        reservedWords.quotesForEntities = '`';
        _this = _super.call(this, reservedWords) || this;
        _this.addParser(new string_parser_1.StringParser(reservedWords));
        _this.addParser(new number_parser_1.NumberParser(reservedWords));
        _this.addParser(new int_parser_1.IntParser(reservedWords));
        _this.addParser(new date_parser_1.DateParser(reservedWords));
        _this.addParser(new datetime_parser_1.DateTimeParser(reservedWords));
        _this.addParser(new raw_parser_1.RawParser(reservedWords));
        _this.addParser(new boolean_parser_1.BooleanParser(reservedWords));
        return _this;
    }
    MySQLDatabase.prototype.createComment = function (comment) {
        return "/* " + comment + " */ ";
    };
    MySQLDatabase.prototype.createInsertQuery = function (dataRow) {
        var columns = dataRow.values.getKeys().join(', ');
        var values = dataRow.values.getValues().join(', ');
        var table = dataRow.tableName;
        return "INSERT INTO " + table + " (" + columns + ") VALUES (" + values + ");";
    };
    MySQLDatabase.prototype.createDeleteQuery = function (dataRow) {
        var tableName = dataRow.tableName;
        var whereData = [];
        dataRow.unique.forEachEntry(function (columnName, value) {
            whereData.push(columnName + "=" + value);
        });
        var where = whereData.join(' AND ');
        return "DELETE FROM " + tableName + " WHERE " + where + ";";
    };
    return MySQLDatabase;
}(database_1.Database));
exports.MySQLDatabase = MySQLDatabase;
