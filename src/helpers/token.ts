import { sign, verify } from 'jsonwebtoken'
import {jwt_config} from "./env";
import CustomError, {ErrorType} from "./error";

const { signing_key, issuer, refresh_token_expiration, access_token_expiration } = jwt_config

export interface JwtTokenPair {
    access_token: string
    refresh_token: string
}

export function tokenPair(userId: string): JwtTokenPair {
    const data = {
        sub: userId,
    }
    const access_token = generateToken(data, access_token_expiration as number)
    const refresh_token = generateToken(data, refresh_token_expiration as number)
    return { access_token, refresh_token }
}

export function forgotPasswordToken(email: string): string {
    return generateToken({ email }, access_token_expiration as number)
}

function generateToken<T extends object>(data: T, expiresIn: number): string {
    return sign(data, signing_key, {
        issuer,
        algorithm: 'HS256',
        expiresIn: expiresIn as number,
    })
}

export function verifyToken<T>(token: string): T {
    try {
        return verify(token, signing_key) as T
    } catch (e: any) {
        if (['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'].includes(e.name)) {
            return null
        }
        throw CustomError.internalServerError(token, ErrorType.FAILED_TO_VERIFY_TOKEN, e)
    }
}