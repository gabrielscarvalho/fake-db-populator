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
exports.RawParser = void 0;
var parser_1 = require("./parser");
var RawParser = /** @class */ (function (_super) {
    __extends(RawParser, _super);
    function RawParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'raw';
        _this.description = 'Will not parse. The received value will be used directly on the query. You can use this type to send functions, like NOW()';
        return _this;
    }
    RawParser.prototype.parse = function (val) {
        if (val === null || val === undefined) {
            return this.getNullString();
        }
        if (typeof val === 'object') {
            throw new Error('RawParser received invalid value: object. Valid values are: string or number. Received value:' +
                val);
        }
        return String(val);
    };
    return RawParser;
}(parser_1.Parser));
exports.RawParser = RawParser;
