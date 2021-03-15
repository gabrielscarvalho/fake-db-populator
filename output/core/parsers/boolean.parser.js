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
exports.BooleanParser = void 0;
var parser_1 = require("./parser");
var BooleanParser = /** @class */ (function (_super) {
    __extends(BooleanParser, _super);
    function BooleanParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'boolean';
        _this.description = "Parses values to boolean.";
        return _this;
    }
    BooleanParser.prototype.parse = function (val) {
        var bool = this.reservedWords.boolean;
        return (!!val) ? bool["true"] : bool["false"];
    };
    return BooleanParser;
}(parser_1.Parser));
exports.BooleanParser = BooleanParser;
