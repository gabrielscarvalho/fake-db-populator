"use strict";
exports.__esModule = true;
exports.DataRowParsed = void 0;
var named_map_1 = require("../utils/named.map");
/**
 * Contains `DataRow` only parsed values to simplify query creation doubts.
 */
var DataRowParsed = /** @class */ (function () {
    function DataRowParsed(entityParser, dataRow) {
        var _this = this;
        this.entityParser = entityParser;
        this.dataRow = dataRow;
        this.values = new named_map_1.NamedMap();
        this.unique = new named_map_1.NamedMap();
        this.queryCommand = this.dataRow.queryCommand;
        this.tableName = this.entityParser.parse(this.dataRow.table.name);
        dataRow.data.forEachEntry(function (rawColumName, column) {
            var parsedColumnName = _this.entityParser.parse(rawColumName);
            var parsedValue = column.parsedValue;
            _this.values.add(parsedColumnName, parsedValue);
            if (column.isPartOfUniqueKey()) {
                _this.unique.add(parsedColumnName, parsedValue);
            }
        });
    }
    return DataRowParsed;
}());
exports.DataRowParsed = DataRowParsed;
