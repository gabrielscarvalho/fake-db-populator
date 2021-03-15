"use strict";
exports.__esModule = true;
exports.LastValue = void 0;
exports.LastValue = function (column, defaultValue, config) {
    if (defaultValue === void 0) { defaultValue = null; }
    if (config === void 0) { config = { throwErrorIfNotExists: false }; }
    return function () {
        var optLastDataRow = column.table.getLastDataRow();
        if (optLastDataRow.isPresent()) {
            var lastDataRow = optLastDataRow.get();
            return lastDataRow.getRawValue(column.name);
        }
        if (config.throwErrorIfNotExists) {
            throw new Error("There was no last value for column: [" + column.table.name + "." + column.name + "]. Assure to create a register to this table before or change the flag throwErrorIfNotExists to false.");
        }
        return defaultValue;
    };
};
