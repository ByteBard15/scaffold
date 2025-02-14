import HttpStatusCode from "./status";

export enum ErrorType {
    MISSING_REQUIRED_ENV = 'MISSING_REQUIRED_ENV',
    DATABASE_NOT_INITIALIZED = 'DATABASE_NOT_INITIALIZED',
    UNABLE_TO_INSERT_RECORD = 'UNABLE_TO_INSERT_RECORD',
    USER_DOES_NOT_EXIST = 'USER_DOES_NOT_EXIST',
    USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
    FAILED_TO_VERIFY_TOKEN = 'FAILED_TO_VERIFY_TOKEN',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    EMAIL_OR_PASSWORD_IS_INVALID = 'EMAIL_OR_PASSWORD_IS_INVALID',
    RESET_PASSWORD_TOKEN_EXPIRED = 'RESET_PASSWORD_TOKEN_EXPIRED',
    UNKNOWN_ERROR_OCCURRED = 'UNKNOWN_ERROR_OCCURRED',
}

export interface ICustomError {
    type?: ErrorType;
    code?: HttpStatusCode
    data?: any
    source?: Error
}

export default class CustomError extends Error {
    private readonly _type?: any
    private readonly _code: HttpStatusCode
    private readonly _data: any
    private readonly _source?: Error

    constructor(params: ICustomError) {
        const { type, code, data, source } = params
        super(type)
        Object.setPrototypeOf(this, CustomError.prototype)
        Error.captureStackTrace(this, this.constructor)
        this._code = code
        this._data = data
        this._type = type
        this._source = source
    }

    get code(): HttpStatusCode {
        return this._code
    }

    get data(): any {
        return this._data
    }

    get type() {
        return this._type
    }

    static internalServerError(data: any, type?: ErrorType, source?: Error) {
        return new CustomError({
            type,
            code: HttpStatusCode.INTERNAL_SERVER_ERROR,
            source,
            data,
        })
    }

    static badRequest(type: ErrorType, data?: any): CustomError {
        return new CustomError({
            type,
            data,
            code: HttpStatusCode.BAD_REQUEST,
        });
    }

    static notFound(type: ErrorType, data?: any): CustomError {
        return new CustomError({
            type,
            data,
            code: HttpStatusCode.NOT_FOUND,
        });
    }

    static forbidden(type: ErrorType, data?: any): CustomError {
        return new CustomError({
            type,
            data,
            code: HttpStatusCode.FORBIDDEN,
        });
    }
}
