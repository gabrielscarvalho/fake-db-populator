"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Database = void 0;
var lodash_1 = __importDefault(require("lodash"));
var data_row_parsed_1 = require("../data/data-row-parsed");
var entity_parser_1 = require("../parsers/entity.parser");
var query_command_enum_1 = __importDefault(require("../query-builder/query-command.enum"));
var named_map_1 = require("../utils/named.map");
var optional_1 = require("../utils/optional");
var table_1 = require("./table");
var Database = /** @class */ (function () {
    function Database(reservedWords) {
        this.reservedWords = reservedWords;
        this.tables = new named_map_1.NamedMap();
        this.parsers = new named_map_1.NamedMap();
        this.dataRows = [];
        this.entityParser = new entity_parser_1.EntityParser(this.reservedWords);
    }
    Database.prototype.addParser = function (parser) {
        this.parsers.add(parser.type, parser);
        return this;
    };
    Database.prototype.getParser = function (parserName) {
        return this.parsers.getForced(parserName);
    };
    Database.prototype.addTable = function (tableName) {
        var table = new table_1.Table(this, tableName);
        this.tables.add(tableName, table, { throwIfExists: true });
        return table;
    };
    Database.prototype.getTable = function (tableName) {
        return this.tables.getForced(tableName);
    };
    Database.prototype.getLastDataRow = function (tableName) {
        var lastRow = null;
        this.dataRows.forEach(function (dataRow) {
            if (dataRow.table.name === tableName) {
                lastRow = dataRow;
            }
        });
        return optional_1.Optional.fromValue(lastRow);
    };
    Database.prototype.insert = function (tableName, extraData, comment) {
        if (extraData === void 0) { extraData = {}; }
        if (comment === void 0) { comment = null; }
        var dataRow = this.getTable(tableName)
            .createNewDataRowAndStore(query_command_enum_1["default"].INSERT, extraData, comment);
        return dataRow;
    };
    Database.prototype.addDataRow = function (dataRow) {
        this.dataRows.push(dataRow);
        return this;
    };
    Database.prototype.toSQL = function () {
        var _this = this;
        var sqls = [];
        this.dataRows.forEach(function (dataRow) {
            if (!!dataRow.comment) {
                sqls.push(_this.createComment(dataRow.comment));
            }
            sqls.push(_this.createCommand(dataRow));
        });
        return sqls;
    };
    Database.prototype.rollback = function () {
        var _this = this;
        var queries = [];
        queries.push(this.createComment(' --- ROLLBACK'));
        var alreadyExecuted = (this.dataRows || []).filter(function (dataRow) {
            return dataRow.hasCreatedQuery;
        });
        var deleteRows = lodash_1["default"].cloneDeep(alreadyExecuted).reverse();
        (deleteRows || []).forEach(function (dataRow) {
            dataRow.queryCommand = query_command_enum_1["default"].DELETE;
            queries.push(_this.createCommand(dataRow));
            if (!!dataRow.comment) {
                queries.push(_this.createComment(dataRow.comment));
            }
        });
        return queries;
    };
    Database.prototype.printParsers = function () {
        console.log('|-- PARSERS ------------------------');
        (this.parsers.getValues() || []).forEach(function (value) {
            var description = value.description ? value.description : "Parses to format " + value.type;
            var type = value.type.padEnd(30, ' ');
            console.log("\t" + type + " " + description);
        });
    };
    Database.prototype.createCommand = function (dataRow) {
        var query = null;
        var dataRowParsed = new data_row_parsed_1.DataRowParsed(this.entityParser, dataRow);
        if (dataRow.queryCommand === query_command_enum_1["default"].INSERT) {
            query = this.createInsertQuery(dataRowParsed);
        }
        else if (dataRow.queryCommand === query_command_enum_1["default"].DELETE) {
            query = this.createDeleteQuery(dataRowParsed);
        }
        if (query === null) {
            throw new Error("Impl not found to query command:  [" + dataRow.queryCommand + "].");
        }
        dataRow.hasCreatedQuery = true;
        return query;
    };
    return Database;
}());
exports.Database = Database;
