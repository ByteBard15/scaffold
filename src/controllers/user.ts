import UserService from "../services/users";
import {Request, Response} from 'express'
import HttpStatusCode from "../helpers/status";
import {buildResponse, ResponseType} from "../helpers/response";
import {JwtTokenPair} from "../helpers/token";

export default class UserController {

    async login(request: Request, response: Response) {
        const { email, password } = request.body
        const tokenPair = await UserService.instance.login(email, password)
        response.status(HttpStatusCode.OK).send(
            buildResponse<JwtTokenPair>({
                data: tokenPair,
                code: HttpStatusCode.OK,
                type: ResponseType.LOGIN_SUCCESSFUL,
                success: true,
            })
        )
    }

    async register(request: Request, response: Response) {
        const { email, password } = request.body
        await UserService.instance.register(email, password)
        response.status(HttpStatusCode.CREATED).send(
            buildResponse<JwtTokenPair>({
                code: HttpStatusCode.CREATED,
                type: ResponseType.REGISTER_SUCCESSFUL,
                success: true,
            })
        )
    }

    async forgotPassword(request: Request, response: Response) {
        const { email } = request.body
        await UserService.instance.forgotPassword(email)
        response.status(HttpStatusCode.ACCEPTED).send(
            buildResponse({
                code: HttpStatusCode.ACCEPTED,
                type: ResponseType.FORGOT_PASSWORD_EMAIL_SENT,
                success: true,
            })
        )
    }

    async resetPassword(request: Request, response: Response) {
        const { token, newPassword } = request.body
        await UserService.instance.resetPassword(token, newPassword)
        response.status(HttpStatusCode.OK).send(
            buildResponse({
                code: HttpStatusCode.OK,
                type: ResponseType.RESET_PASSWORD_SUCCESSFUL,
                success: true,
            })
        )
    }
}