"use strict";
exports.__esModule = true;
exports.AutoIncrement = void 0;
var map_1 = require("../utils/map");
var AutoIncrement = /** @class */ (function () {
    function AutoIncrement() {
        this.ids = new map_1.NamedMap();
    }
    AutoIncrement.prototype.initialId = function (uniqueName, initialValue) {
        this.ids.add(uniqueName, initialValue, { throwIfExists: true });
        return this;
    };
    AutoIncrement.prototype.valueGen = function (uniqueName, incrementBy) {
        var _this = this;
        if (incrementBy === void 0) { incrementBy = 1; }
        var optCurrent = this.ids.get(uniqueName);
        var currentId = optCurrent.isPresent() ? optCurrent.get() : 0;
        return function () {
            currentId = currentId + incrementBy;
            _this.ids.add(uniqueName, currentId);
            return currentId;
        };
    };
    return AutoIncrement;
}());
exports.AutoIncrement = AutoIncrement;
