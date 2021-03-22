"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.NamedMap = void 0;
var lodash_1 = __importDefault(require("lodash"));
var optional_1 = require("./optional");
var NamedMap = /** @class */ (function () {
    function NamedMap() {
        this.data = new Map();
    }
    NamedMap.prototype.has = function (name) {
        return this.data.has(name);
    };
    NamedMap.prototype.add = function (name, content, config) {
        if (config === void 0) { config = { throwIfExists: false }; }
        if (this.has(name) && config.throwIfExists) {
            throw new Error("Cannot add [" + name + "] to list. The value is already in use.");
        }
        this.data.set(name, content);
        return this;
    };
    NamedMap.prototype.get = function (name) {
        if (!this.has(name)) {
            return optional_1.Optional.fromNull();
        }
        return optional_1.Optional.fromValue(this.data.get(name));
    };
    NamedMap.prototype.getForced = function (name) {
        if (!this.has(name)) {
            var validKeys = this.getKeys().join(',');
            throw new Error("Could not get unknown '" + name + "' from list.  Did you spell it right? Valid values: [" + validKeys + "]");
        }
        return this.data.get(name);
    };
    NamedMap.prototype["delete"] = function (name, config) {
        if (config === void 0) { config = { throwIfNotExists: false }; }
        if (!this.has(name)) {
            if (config.throwIfNotExists) {
                var validKeys = this.getKeys().join(',');
                throw new Error("Could not delete unknown '" + name + "' from list. Did you spell it right? Valid values: [" + validKeys + "]");
            }
            return false;
        }
        this.data["delete"](name);
        return true;
    };
    NamedMap.prototype.getKeys = function () {
        var names = [];
        this.data.forEach(function (val, name) {
            names.push(name);
        });
        return names;
    };
    NamedMap.prototype.forEachEntry = function (callback) {
        var _this = this;
        this.getKeys().forEach(function (keyName) {
            var value = _this.get(keyName).getForced();
            callback(keyName, value);
        });
    };
    NamedMap.prototype.getValues = function () {
        var values = [];
        this.data.forEach(function (val) {
            values.push(val);
        });
        return values;
    };
    NamedMap.prototype.find = function (filter) {
        var x = lodash_1["default"].find(this.getValues(), filter);
        return optional_1.Optional.fromValue(x);
    };
    return NamedMap;
}());
exports.NamedMap = NamedMap;
