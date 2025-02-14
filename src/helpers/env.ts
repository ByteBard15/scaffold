import CustomError, {ErrorType} from "./error";
import {randomBytes} from "node:crypto";

const envs = process.env

const required = [
    'MONGO_DB_NAME',
    'MONGO_PORT',
    'MONGO_USER',
    'MONGO_PASSWORD',
    'NODE_ENV',
    'SERVER_PORT'
]

function init() {
    for (const env of required) {
        const value  = process.env[env]
        if (!value) {
            throw CustomError.internalServerError(env, ErrorType.MISSING_REQUIRED_ENV)
        }
    }
}

init()

const {
    MONGO_DB_NAME,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASSWORD,
    NODE_ENV,
    MONGO_HOST,
    JWT_HMAC_KEY = randomBytes(32).toString('base64'),
    JWT_ISSUER = 'Issuer',
    ACCESS_TOKEN_EXPIRATION = 86400, // 1 day
    REFRESH_TOKEN_EXPIRATION = 30 * 86400 // 30 days
} = envs

export function isDevelopment() {
    return NODE_ENV === 'dev'
}

export const jwt_config = {
    issuer: JWT_ISSUER,
    signing_key: JWT_HMAC_KEY,
    access_token_expiration: ACCESS_TOKEN_EXPIRATION,
    refresh_token_expiration: REFRESH_TOKEN_EXPIRATION
}

export const mongo_db_config = {
    port: MONGO_PORT,
    name: MONGO_DB_NAME,
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    host: MONGO_HOST,
    uri: function() {
        return `mongodb://${this.user}:${this.password}@${this.host}:${this.port}`
    }
}

export const bcrypt_salt_rounds = envs.BCRYPT_SALT_ROUNDS ? Number(envs.BCRYPT_SALT_ROUNDS) : 10

export default envs
