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
exports.NumberParser = void 0;
var lodash_1 = require("lodash");
var parser_1 = require("./parser");
var NumberParser = /** @class */ (function (_super) {
    __extends(NumberParser, _super);
    function NumberParser(reservedWords, precision) {
        if (precision === void 0) { precision = 2; }
        var _this = _super.call(this, reservedWords) || this;
        _this.type = 'number';
        _this.precision = 2;
        _this.description = 'Parse number to float or int string';
        _this.description = "Parse number to number with precision: " + precision;
        return _this;
    }
    NumberParser.prototype.parse = function (val) {
        if (val === null || val === undefined) {
            return this.getNullString();
        }
        if ((!lodash_1.isString(val) && !lodash_1.isNumber(val)) || isNaN(Number(val))) {
            throw new Error('NumberParser received invalid value: object. Valid values are: number or string. Received value:' +
                val);
        }
        var preparedValue = null;
        if (this.precision === 0) {
            preparedValue = String(parseInt(String(val)));
        }
        else {
            preparedValue = parseFloat(String(val)).toFixed(this.precision);
        }
        return preparedValue;
    };
    NumberParser.withPrecision = function (reservedWords, type, precision) {
        var parser = new NumberParser(reservedWords, precision);
        parser.type = type;
        parser.precision = precision;
        return parser;
    };
    return NumberParser;
}(parser_1.Parser));
exports.NumberParser = NumberParser;
