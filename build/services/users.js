"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var error_1 = __importStar(require("../helpers/error"));
var user_1 = __importDefault(require("../models/user"));
var password_1 = require("../helpers/password");
var token_1 = require("../helpers/token");
var token_2 = __importDefault(require("../models/token"));
var email_1 = require("../helpers/email");
var sha_1 = require("../helpers/sha");
var logger_1 = __importDefault(require("../helpers/logger"));
var forgotPasswordTokens = {};
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isValid, token_pair, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4, user_1.default.findOne(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw error_1.default.notFound(error_1.ErrorType.USER_DOES_NOT_EXIST);
                        }
                        return [4, (0, sha_1.compare)(password, user.password)];
                    case 2:
                        isValid = _a.sent();
                        if (!isValid) {
                            throw error_1.default.badRequest(error_1.ErrorType.EMAIL_OR_PASSWORD_IS_INVALID);
                        }
                        token_pair = (0, token_1.tokenPair)(user.id.toHexString());
                        return [4, token_2.default.invalidate(user.id)];
                    case 3:
                        _a.sent();
                        return [4, token_2.default.create(token_pair, user.id).save()];
                    case 4:
                        _a.sent();
                        return [2, token_pair];
                    case 5:
                        e_1 = _a.sent();
                        if (e_1 instanceof error_1.default) {
                            throw e_1;
                        }
                        throw error_1.default.internalServerError(undefined, undefined, e_1);
                    case 6: return [2];
                }
            });
        });
    };
    UserService.prototype.register = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, hashed_password;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, email_1.validateEmail)(email)) {
                            throw error_1.default.badRequest(error_1.ErrorType.INVALID_EMAIL);
                        }
                        if (!(0, password_1.validatePassword)(password)) {
                            throw error_1.default.badRequest(error_1.ErrorType.INVALID_PASSWORD);
                        }
                        return [4, user_1.default.findOne(email)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            throw error_1.default.badRequest(error_1.ErrorType.USER_ALREADY_EXISTS);
                        }
                        return [4, (0, sha_1.hash)(password)];
                    case 2:
                        hashed_password = _a.sent();
                        return [4, user_1.default.create(email, hashed_password).save()];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    UserService.prototype.forgotPassword = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, email_1.validateEmail)(email)) {
                            throw error_1.default.notFound(error_1.ErrorType.USER_DOES_NOT_EXIST);
                        }
                        return [4, user_1.default.findOne(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw error_1.default.notFound(error_1.ErrorType.USER_DOES_NOT_EXIST);
                        }
                        token = (0, token_1.forgotPasswordToken)(user.email);
                        forgotPasswordTokens[user.email] = token;
                        logger_1.default.logger.log('Token', token);
                        return [2];
                }
            });
        });
    };
    UserService.prototype.resetPassword = function (token, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var data, user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = (0, token_1.verifyToken)(token);
                        if (!data) {
                            throw error_1.default.badRequest(error_1.ErrorType.RESET_PASSWORD_TOKEN_EXPIRED);
                        }
                        if (!(0, password_1.validatePassword)(newPassword)) {
                            throw error_1.default.badRequest(error_1.ErrorType.INVALID_PASSWORD);
                        }
                        return [4, user_1.default.findOne(data.email)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw error_1.default.internalServerError(undefined, error_1.ErrorType.USER_DOES_NOT_EXIST);
                        }
                        _a = user;
                        return [4, (0, sha_1.hash)(newPassword)];
                    case 2:
                        _a.password = _b.sent();
                        return [4, user.update()];
                    case 3:
                        _b.sent();
                        return [4, token_2.default.invalidate(user.id)];
                    case 4:
                        _b.sent();
                        delete forgotPasswordTokens[user.email];
                        return [2];
                }
            });
        });
    };
    UserService.instance = new UserService();
    return UserService;
}());
exports.default = UserService;
//# sourceMappingURL=users.js.map