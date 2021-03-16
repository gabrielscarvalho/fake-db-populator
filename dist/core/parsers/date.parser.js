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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.DateParser = void 0;
var moment_1 = __importDefault(require("moment"));
var parser_1 = require("./parser");
var DateParser = /** @class */ (function (_super) {
    __extends(DateParser, _super);
    function DateParser(reservedWords, format) {
        if (format === void 0) { format = 'YYYY-MM-DD'; }
        var _this = _super.call(this, reservedWords) || this;
        _this.format = format;
        _this.type = 'date';
        _this.description = "Parse date to format: \"" + _this.format + "\"";
        return _this;
    }
    DateParser.prototype.parse = function (val) {
        if (!val) {
            return this.getNullString();
        }
        var dateString = moment_1["default"](val).format(this.format);
        return this.addQuotes(dateString);
    };
    return DateParser;
}(parser_1.Parser));
exports.DateParser = DateParser;
