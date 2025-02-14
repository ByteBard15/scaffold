"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorType = void 0;
var status_1 = __importDefault(require("./status"));
var ErrorType;
(function (ErrorType) {
    ErrorType["MISSING_REQUIRED_ENV"] = "MISSING_REQUIRED_ENV";
    ErrorType["DATABASE_NOT_INITIALIZED"] = "DATABASE_NOT_INITIALIZED";
    ErrorType["UNABLE_TO_INSERT_RECORD"] = "UNABLE_TO_INSERT_RECORD";
    ErrorType["USER_DOES_NOT_EXIST"] = "USER_DOES_NOT_EXIST";
    ErrorType["USER_ALREADY_EXISTS"] = "USER_ALREADY_EXISTS";
    ErrorType["FAILED_TO_VERIFY_TOKEN"] = "FAILED_TO_VERIFY_TOKEN";
    ErrorType["INVALID_EMAIL"] = "INVALID_EMAIL";
    ErrorType["INVALID_PASSWORD"] = "INVALID_PASSWORD";
    ErrorType["EMAIL_OR_PASSWORD_IS_INVALID"] = "EMAIL_OR_PASSWORD_IS_INVALID";
    ErrorType["RESET_PASSWORD_TOKEN_EXPIRED"] = "RESET_PASSWORD_TOKEN_EXPIRED";
    ErrorType["UNKNOWN_ERROR_OCCURRED"] = "UNKNOWN_ERROR_OCCURRED";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
var CustomError = (function (_super) {
    __extends(CustomError, _super);
    function CustomError(params) {
        var _this = this;
        var type = params.type, code = params.code, data = params.data, source = params.source;
        _this = _super.call(this, type) || this;
        Object.setPrototypeOf(_this, CustomError.prototype);
        Error.captureStackTrace(_this, _this.constructor);
        _this._code = code;
        _this._data = data;
        _this._type = type;
        _this._source = source;
        return _this;
    }
    Object.defineProperty(CustomError.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomError.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomError.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    CustomError.internalServerError = function (data, type, source) {
        return new CustomError({
            type: type,
            code: status_1.default.INTERNAL_SERVER_ERROR,
            source: source,
            data: data,
        });
    };
    CustomError.badRequest = function (type, data) {
        return new CustomError({
            type: type,
            data: data,
            code: status_1.default.BAD_REQUEST,
        });
    };
    CustomError.notFound = function (type, data) {
        return new CustomError({
            type: type,
            data: data,
            code: status_1.default.NOT_FOUND,
        });
    };
    CustomError.forbidden = function (type, data) {
        return new CustomError({
            type: type,
            data: data,
            code: status_1.default.FORBIDDEN,
        });
    };
    return CustomError;
}(Error));
exports.default = CustomError;
//# sourceMappingURL=error.js.map