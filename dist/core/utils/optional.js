"use strict";
exports.__esModule = true;
exports.Optional = void 0;
var Optional = /** @class */ (function () {
    function Optional(value) {
        if (value === void 0) { value = null; }
        this.data = null;
        this.hasChecked = false;
        this.data = value;
    }
    Optional.prototype.set = function (value) {
        this.data = value;
    };
    Optional.fromNullable = function () {
        return new Optional();
    };
    Optional.fromValue = function (value) {
        return new Optional(value);
    };
    Optional.prototype.isPresent = function () {
        this.hasChecked = true;
        return !!this.data;
    };
    Optional.prototype.get = function (config) {
        if (config === void 0) { config = { skipValidation: false }; }
        if (!config.skipValidation && !this.hasChecked) {
            throw new Error('It is required to check if value is present before getting it. Call isPresent() before.');
        }
        return this.data;
    };
    return Optional;
}());
exports.Optional = Optional;
