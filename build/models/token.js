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
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
var error_1 = __importStar(require("../helpers/error"));
var TOKEN_COLLECTION = 'tokens';
var UserToken = (function () {
    function UserToken(access_token, refresh_token, user_id, id) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.user_id = user_id;
        this._id = id;
    }
    Object.defineProperty(UserToken, "tokenCollection", {
        get: function () {
            return db_1.PersistenceManager.instance.collection(TOKEN_COLLECTION);
        },
        enumerable: false,
        configurable: true
    });
    UserToken.prototype.invalidate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, UserToken.tokenCollection.deleteOne({
                            access_token: this.access_token,
                        })];
                    case 1:
                        result = _a.sent();
                        return [2, result.deletedCount !== 0];
                }
            });
        });
    };
    UserToken.invalidate = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, UserToken.tokenCollection.deleteMany({
                            user_id: user_id,
                        })];
                    case 1:
                        result = _a.sent();
                        return [2, result.deletedCount !== 0];
                }
            });
        });
    };
    UserToken.create = function (_a, user_id) {
        var access_token = _a.access_token, refresh_token = _a.refresh_token;
        return new UserToken(access_token, refresh_token, user_id);
    };
    UserToken.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = this.doc();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, UserToken.tokenCollection.insertOne(token)];
                    case 2:
                        result = _a.sent();
                        this._id = result.insertedId;
                        return [2, this];
                    case 3:
                        e_1 = _a.sent();
                        throw error_1.default.internalServerError(undefined, error_1.ErrorType.UNABLE_TO_INSERT_RECORD, e_1);
                    case 4: return [2];
                }
            });
        });
    };
    UserToken.findOne = function (token, key) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, UserToken.tokenCollection.findOne((_a = {},
                            _a[key] = token,
                            _a))];
                    case 1:
                        result = _b.sent();
                        if (!result) {
                            return [2, null];
                        }
                        return [2, new UserToken(result.access_token, result.refresh_token, result._id)];
                }
            });
        });
    };
    UserToken.prototype.doc = function () {
        return {
            user_id: this.user_id,
            access_token: this.access_token,
            refresh_token: this.refresh_token,
        };
    };
    return UserToken;
}());
exports.default = UserToken;
//# sourceMappingURL=token.js.map