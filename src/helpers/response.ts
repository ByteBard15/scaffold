import {ErrorType} from "./error";
import HttpStatusCode from "./status";

export enum ResponseType {
    LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL',
    REGISTER_SUCCESSFUL = 'REGISTER_SUCCESSFUL',
    FORGOT_PASSWORD_EMAIL_SENT = 'FORGOT_PASSWORD_EMAIL_SENT',
    RESET_PASSWORD_SUCCESSFUL = 'RESET_PASSWORD_SUCCESSFUL',
    ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND',
}

export interface IResponse<T> {
    data?: T
    type?: ResponseType | ErrorType
    success: boolean
    code: HttpStatusCode
    // during development
    err?: any
}

export function buildResponse<T>(response: IResponse<T>) {
    // Resolve the type to a suitable message
    return response
}