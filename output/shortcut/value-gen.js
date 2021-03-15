"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var auto_increment_1 = require("../core/value-generator/auto-increment");
__createBinding(exports, auto_increment_1, "AutoIncrement");
var date_1 = require("../core/value-generator/date");
__createBinding(exports, date_1, "DateGen");
var fixed_1 = require("../core/value-generator/fixed");
__createBinding(exports, fixed_1, "Fixed");
var last_value_1 = require("../core/value-generator/last-value");
__createBinding(exports, last_value_1, "LastValue");
var random_1 = require("../core/value-generator/random");
__createBinding(exports, random_1, "Random");
