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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcrypt_salt_rounds = exports.mongo_db_config = exports.jwt_config = void 0;
exports.isDevelopment = isDevelopment;
var error_1 = __importStar(require("./error"));
var node_crypto_1 = require("node:crypto");
var envs = process.env;
var required = [
    'MONGO_DB_NAME',
    'MONGO_PORT',
    'MONGO_USER',
    'MONGO_PASSWORD',
    'NODE_ENV',
    'SERVER_PORT'
];
function init() {
    for (var _i = 0, required_1 = required; _i < required_1.length; _i++) {
        var env = required_1[_i];
        var value = process.env[env];
        if (!value) {
            throw error_1.default.internalServerError(env, error_1.ErrorType.MISSING_REQUIRED_ENV);
        }
    }
}
init();
var MONGO_DB_NAME = envs.MONGO_DB_NAME, MONGO_PORT = envs.MONGO_PORT, MONGO_USER = envs.MONGO_USER, MONGO_PASSWORD = envs.MONGO_PASSWORD, NODE_ENV = envs.NODE_ENV, MONGO_HOST = envs.MONGO_HOST, _a = envs.JWT_HMAC_KEY, JWT_HMAC_KEY = _a === void 0 ? (0, node_crypto_1.randomBytes)(32).toString('base64') : _a, _b = envs.JWT_ISSUER, JWT_ISSUER = _b === void 0 ? 'Issuer' : _b, _c = envs.ACCESS_TOKEN_EXPIRATION, ACCESS_TOKEN_EXPIRATION = _c === void 0 ? 86400 : _c, _d = envs.REFRESH_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION = _d === void 0 ? 30 * 86400 : _d;
function isDevelopment() {
    return NODE_ENV === 'dev';
}
exports.jwt_config = {
    issuer: JWT_ISSUER,
    signing_key: JWT_HMAC_KEY,
    access_token_expiration: ACCESS_TOKEN_EXPIRATION,
    refresh_token_expiration: REFRESH_TOKEN_EXPIRATION
};
exports.mongo_db_config = {
    port: MONGO_PORT,
    name: MONGO_DB_NAME,
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    host: MONGO_HOST,
    uri: function () {
        return "mongodb://".concat(this.user, ":").concat(this.password, "@").concat(this.host, ":").concat(this.port);
    }
};
exports.bcrypt_salt_rounds = envs.BCRYPT_SALT_ROUNDS ? Number(envs.BCRYPT_SALT_ROUNDS) : 10;
exports.default = envs;
//# sourceMappingURL=env.js.map