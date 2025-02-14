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
exports.tokenPair = tokenPair;
exports.forgotPasswordToken = forgotPasswordToken;
exports.verifyToken = verifyToken;
var jsonwebtoken_1 = require("jsonwebtoken");
var env_1 = require("./env");
var error_1 = __importStar(require("./error"));
var signing_key = env_1.jwt_config.signing_key, issuer = env_1.jwt_config.issuer, refresh_token_expiration = env_1.jwt_config.refresh_token_expiration, access_token_expiration = env_1.jwt_config.access_token_expiration;
function tokenPair(userId) {
    var data = {
        sub: userId,
    };
    var access_token = generateToken(data, access_token_expiration);
    var refresh_token = generateToken(data, refresh_token_expiration);
    return { access_token: access_token, refresh_token: refresh_token };
}
function forgotPasswordToken(email) {
    return generateToken({ email: email }, access_token_expiration);
}
function generateToken(data, expiresIn) {
    return (0, jsonwebtoken_1.sign)(data, signing_key, {
        issuer: issuer,
        algorithm: 'HS256',
        expiresIn: expiresIn,
    });
}
function verifyToken(token) {
    try {
        return (0, jsonwebtoken_1.verify)(token, signing_key);
    }
    catch (e) {
        if (['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'].includes(e.name)) {
            return null;
        }
        throw error_1.default.internalServerError(token, error_1.ErrorType.FAILED_TO_VERIFY_TOKEN, e);
    }
}
//# sourceMappingURL=token.js.map