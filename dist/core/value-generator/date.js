"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.DateGen = void 0;
var chance_1 = require("chance");
var lodash_1 = __importDefault(require("lodash"));
var chance = new chance_1.Chance();
var checkRange = function (fieldName, value, min, max) {
    if (value < min || value > max) {
        throw new Error("Invalid date param: " + fieldName + ". Informed value: [" + value + "] must be between: [" + min + "] and [" + max + "]");
    }
};
var checkLimits = function (fieldName, value, min, max) {
    if (lodash_1["default"].isNumber(value)) {
        checkRange(fieldName, value, min, max);
    }
    else {
        checkRange(fieldName + "- min", value.min, min, max);
        checkRange(fieldName + "- max", value.max, min, max);
    }
};
var DateGen = /** @class */ (function () {
    function DateGen() {
    }
    DateGen.getDefaultDateRange = function () {
        return {
            year: {
                min: 1970,
                max: 2050
            },
            month: {
                min: 0,
                max: 11
            },
            day: {
                min: 1,
                max: 31
            },
            hour: {
                min: 0,
                max: 12
            },
            minute: {
                min: 0,
                max: 59
            },
            second: {
                min: 0,
                max: 59
            },
            ms: {
                min: 0,
                max: 999
            }
        };
    };
    DateGen.between = function (range) {
        if (range === void 0) { range = {}; }
        var dateRange = Object.assign(lodash_1["default"].cloneDeep(DateGen.getDefaultDateRange()), range);
        checkLimits('year', dateRange.year, 1500, 2500);
        checkLimits('month', dateRange.month, 0, 11);
        checkLimits('day', dateRange.day, 1, 31);
        checkLimits('hour', dateRange.hour, 0, 23);
        checkLimits('minute', dateRange.minute, 0, 59);
        checkLimits('second', dateRange.second, 0, 59);
        checkLimits('ms', dateRange.ms, 0, 999);
        return function () {
            var year = lodash_1["default"].isNumber(dateRange.year) ? dateRange.year : chance.integer(dateRange.year);
            var month = lodash_1["default"].isNumber(dateRange.month) ? dateRange.month : chance.integer(dateRange.month);
            var day = lodash_1["default"].isNumber(dateRange.day) ? dateRange.day : chance.integer(dateRange.day);
            var hour = lodash_1["default"].isNumber(dateRange.hour) ? dateRange.hour : chance.integer(dateRange.hour);
            var minute = lodash_1["default"].isNumber(dateRange.minute) ? dateRange.minute : chance.integer(dateRange.minute);
            var second = lodash_1["default"].isNumber(dateRange.second) ? dateRange.second : chance.integer(dateRange.second);
            var ms = lodash_1["default"].isNumber(dateRange.ms) ? dateRange.ms : chance.integer(dateRange.ms);
            return new Date(year, month, day, hour, minute, second, ms);
        };
    };
    /**
     * Returns a random date
     * @see docs https://chancejs.com/text/date.html
     */
    DateGen.Random = function () {
        return function () {
            return chance.date();
        };
    };
    return DateGen;
}());
exports.DateGen = DateGen;
