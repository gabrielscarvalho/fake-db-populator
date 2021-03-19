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
    Optional.fromNull = function () {
        return new Optional();
    };
    Optional.fromValue = function (value) {
        return new Optional(value);
    };
    Optional.prototype.isPresent = function () {
        this.hasChecked = true;
        return !!this.data;
    };
    Optional.prototype.get = function () {
        if (!this.hasChecked) {
            throw new Error('It is required to check if value is present before getting it. Call isPresent() before.');
        }
        return this.data;
    };
    /**
     * Skip the isPresent step - but will throw error if value is not present.
     * @return T
     */
    Optional.prototype.getForced = function () {
        if (!this.isPresent()) {
            throw new Error('Optional forced get of non existent value');
        }
        return this.data;
    };
    return Optional;
}());
exports.Optional = Optional;
