import express, {NextFunction, Request, Response} from 'express'
import 'express-async-errors'
import user_route from './routes/user'
import errorMiddleware from "./middleware/error";
import {ROUTE_USER} from "./helpers/constants";
import HttpStatusCode from "./helpers/status";
import {buildResponse, ResponseType} from "./helpers/response";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(ROUTE_USER, user_route)
app.all('*', (req, res) => {
    res.status(HttpStatusCode.NOT_FOUND).send(
        buildResponse({
            code: HttpStatusCode.NOT_FOUND,
            success: false,
            type: ResponseType.ROUTE_NOT_FOUND,
        })
    )
})
app.use(errorMiddleware as any)

export default app