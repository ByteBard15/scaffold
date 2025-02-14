"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = (function () {
    function Logger(stream) {
        if (stream === void 0) { stream = process.stdout; }
        this.stream = stream;
    }
    Logger.prototype.parse = function (args) {
        return JSON.stringify(args, null, 2);
    };
    Logger.prototype.log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.info(message, args);
    };
    Logger.prototype.info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.stream.write("[INFO] (".concat(new Date().toISOString(), ") ").concat(message, ", ").concat(this.parse(args), "\n"));
    };
    Logger.prototype.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.stream.write("[ERROR] (".concat(new Date().toISOString(), ") ").concat(message, ", ").concat(this.parse(args), "\n"));
    };
    Logger.logger = new Logger();
    return Logger;
}());
exports.default = Logger;
//# sourceMappingURL=logger.js.map