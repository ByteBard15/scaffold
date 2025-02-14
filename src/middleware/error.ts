import {NextFunction, Request, Response} from "express";
import CustomError, {ErrorType} from "../helpers/error";
import HttpStatusCode from "../helpers/status";
import {isDevelopment} from "../helpers/env";
import Logger from "../helpers/logger";
import {buildResponse} from "../helpers/response";

export default async function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
)  {

    if (err instanceof CustomError) {
        const { code, data, type } = err

        if (code === HttpStatusCode.INTERNAL_SERVER_ERROR || isDevelopment()) {
            Logger.logger.error(err.message, err)
        }
        return res.status(<number>code).send(
            buildResponse({
                code,
                type,
                success: false,
                data,
            })
        )
    }
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(
        buildResponse({
            code: HttpStatusCode.INTERNAL_SERVER_ERROR,
            success: false,
            type: ErrorType.UNKNOWN_ERROR_OCCURRED,
        })
    )

}