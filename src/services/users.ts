import CustomError, {ErrorType} from "../helpers/error";
import User from "../models/user";
import {validatePassword} from "../helpers/password";
import {forgotPasswordToken, tokenPair, verifyToken} from "../helpers/token";
import UserToken from "../models/token";
import {validateEmail} from "../helpers/email";
import {compare, hash} from "../helpers/sha";
import Logger from "../helpers/logger";

// Content-less object for forgot password
type Email = string
type Token = string
const forgotPasswordTokens: Record<Email, Token> = {}

export default class UserService {
    static instance: UserService = new UserService()

    async login(email: string, password: string) {
        try {
            const user = await User.findOne(email)
            if (!user) {
                throw CustomError.notFound(ErrorType.USER_DOES_NOT_EXIST)
            }
            const isValid = await compare(password, user.password)
            if (!isValid) {
                throw CustomError.badRequest(ErrorType.EMAIL_OR_PASSWORD_IS_INVALID)
            }
            const token_pair = tokenPair(user.id.toHexString())
            await UserToken.invalidate(user.id)
            await UserToken.create(token_pair, user.id).save()
            return token_pair
        } catch (e: any) {
            if (e instanceof CustomError) {
                throw e
            }
            throw CustomError.internalServerError(undefined, undefined, e)
        }
    }

    async register(email: string, password: string) {
        if (!validateEmail(email)) {
            throw CustomError.badRequest(ErrorType.INVALID_EMAIL)
        }
        if (!validatePassword(password)) {
            throw CustomError.badRequest(ErrorType.INVALID_PASSWORD)
        }
        const user = await User.findOne(email)
        if (user) {
            throw CustomError.badRequest(ErrorType.USER_ALREADY_EXISTS)
        }
        const hashed_password = await hash(password)
        await User.create(email, hashed_password).save()
    }

    async forgotPassword(email: string) {
        if (!validateEmail(email)) {
            // Assume we can never have an invalid email
            throw CustomError.notFound(ErrorType.USER_DOES_NOT_EXIST)
        }
        const user = await User.findOne(email)
        if (!user) {
            throw CustomError.notFound(ErrorType.USER_DOES_NOT_EXIST)
        }
        const token = forgotPasswordToken(user.email)
        forgotPasswordTokens[user.email] = token
        Logger.logger.log('Token', token)
        // Generate the link with the token and send
    }

    async resetPassword(token: string, newPassword: string)  {
        const data = verifyToken<{ email: string } | null>(token)
        if (!data) {
            throw CustomError.badRequest(ErrorType.RESET_PASSWORD_TOKEN_EXPIRED)
        }
        if (!validatePassword(newPassword)) {
            throw CustomError.badRequest(ErrorType.INVALID_PASSWORD)
        }
        const user = await User.findOne(data.email) // This should never be null, if it is then the server should stop cause smth is wrong
        if (!user) {
            throw CustomError.internalServerError(undefined, ErrorType.USER_DOES_NOT_EXIST)
        }
        user.password = await hash(newPassword)
        await user.update()
        await UserToken.invalidate(user.id)
        delete forgotPasswordTokens[user.email]
    }
}