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
exports.DateTimeParser = void 0;
var date_parser_1 = require("./date.parser");
var DateTimeParser = /** @class */ (function (_super) {
    __extends(DateTimeParser, _super);
    function DateTimeParser(reservedWords, format) {
        if (format === void 0) { format = 'YYYY-MM-DD hh:mm:ss'; }
        var _this = _super.call(this, reservedWords, format) || this;
        _this.type = 'datetime';
        return _this;
    }
    return DateTimeParser;
}(date_parser_1.DateParser));
exports.DateTimeParser = DateTimeParser;
