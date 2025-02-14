"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = __importDefault(require("../services/users"));
var status_1 = __importDefault(require("../helpers/status"));
var response_1 = require("../helpers/response");
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.login = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, tokenPair;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, email = _a.email, password = _a.password;
                        return [4, users_1.default.instance.login(email, password)];
                    case 1:
                        tokenPair = _b.sent();
                        response.status(status_1.default.OK).send((0, response_1.buildResponse)({
                            data: tokenPair,
                            code: status_1.default.OK,
                            type: response_1.ResponseType.LOGIN_SUCCESSFUL,
                            success: true,
                        }));
                        return [2];
                }
            });
        });
    };
    UserController.prototype.register = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, email = _a.email, password = _a.password;
                        return [4, users_1.default.instance.register(email, password)];
                    case 1:
                        _b.sent();
                        response.status(status_1.default.CREATED).send((0, response_1.buildResponse)({
                            code: status_1.default.CREATED,
                            type: response_1.ResponseType.REGISTER_SUCCESSFUL,
                            success: true,
                        }));
                        return [2];
                }
            });
        });
    };
    UserController.prototype.forgotPassword = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var email;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.body.email;
                        return [4, users_1.default.instance.forgotPassword(email)];
                    case 1:
                        _a.sent();
                        response.status(status_1.default.ACCEPTED).send((0, response_1.buildResponse)({
                            code: status_1.default.ACCEPTED,
                            type: response_1.ResponseType.FORGOT_PASSWORD_EMAIL_SENT,
                            success: true,
                        }));
                        return [2];
                }
            });
        });
    };
    UserController.prototype.resetPassword = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, token, newPassword;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, token = _a.token, newPassword = _a.newPassword;
                        return [4, users_1.default.instance.resetPassword(token, newPassword)];
                    case 1:
                        _b.sent();
                        response.status(status_1.default.OK).send((0, response_1.buildResponse)({
                            code: status_1.default.OK,
                            type: response_1.ResponseType.RESET_PASSWORD_SUCCESSFUL,
                            success: true,
                        }));
                        return [2];
                }
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=user.js.map