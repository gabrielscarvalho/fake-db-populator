"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.DateGen = void 0;
var chance_1 = require("chance");
var lodash_1 = __importDefault(require("lodash"));
var chance = new chance_1.Chance();
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
                max: 30
            },
            hour: {
                min: 0,
                max: 12
            },
            minute: {
                min: 0,
                max: 60
            },
            second: {
                min: 0,
                max: 60
            }
        };
    };
    DateGen.between = function (range) {
        if (range === void 0) { range = {}; }
        var dateRange = Object.assign(lodash_1["default"].cloneDeep(DateGen.getDefaultDateRange()), range);
        return function () {
            var year = chance.integer(dateRange.year);
            var month = chance.integer(dateRange.month);
            var day = chance.integer(dateRange.day);
            var hour = chance.integer(dateRange.hour);
            var minute = chance.integer(dateRange.minute);
            var second = chance.integer(dateRange.second);
            return new Date(year, month, day, hour, minute, second);
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
