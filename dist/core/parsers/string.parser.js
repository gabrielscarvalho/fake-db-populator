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
exports.StringParser = void 0;
var parser_1 = require("./parser");
var StringParser = /** @class */ (function (_super) {
    __extends(StringParser, _super);
    function StringParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'string';
        _this.description = 'Parse as simple string';
        return _this;
    }
    StringParser.prototype.parse = function (val) {
        if (val !== null && val !== undefined) {
            if (typeof val === 'object') {
                throw new Error('StringParser received invalid value: object. Valid values are: string or number. Received value:' +
                    val);
            }
            return this.addQuotes(val);
        }
        else {
            return this.getNullString();
        }
    };
    return StringParser;
}(parser_1.Parser));
exports.StringParser = StringParser;
