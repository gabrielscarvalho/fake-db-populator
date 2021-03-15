"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Database = void 0;
var table_1 = require("./table");
var map_1 = require("../utils/map");
var optional_1 = require("../utils/optional");
var query_command_enum_1 = __importDefault(require("../query-builder/query-command.enum"));
var reserved_words_1 = require("./reserved-words");
var lodash_1 = __importDefault(require("lodash"));
var entity_parser_1 = require("../parsers/entity.parser");
var Database = /** @class */ (function () {
    function Database() {
        this.reservedWords = new reserved_words_1.DatabaseReservedWords();
        this.tables = new map_1.NamedMap();
        this.parsers = new map_1.NamedMap();
        this.dataRows = [];
        this.entityParser = new entity_parser_1.EntityParser(this.reservedWords);
    }
    Database.prototype.addParser = function (parser) {
        this.parsers.add(parser.type, parser);
        return this;
    };
    Database.prototype.getParser = function (parserName) {
        var optParser = this.parsers.get(parserName, { throwIfNotExists: true });
        return optParser.get({ skipValidation: true });
    };
    Database.prototype.getEntityParser = function () {
        return this.entityParser;
    };
    Database.prototype.addTable = function (tableName) {
        var table = new table_1.Table(this, tableName);
        this.tables.add(tableName, table, { throwIfExists: true });
        return table;
    };
    Database.prototype.getTable = function (tableName) {
        var optTable = this.tables.get(tableName, { throwIfNotExists: true });
        return optTable.get({ skipValidation: true });
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
        if (dataRow.queryCommand === query_command_enum_1["default"].INSERT) {
            query = this.createInsertQuery(dataRow);
        }
        else if (dataRow.queryCommand === query_command_enum_1["default"].DELETE) {
            query = this.createDeleteQuery(dataRow);
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
