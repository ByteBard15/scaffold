import { Router } from 'express'
import UserController from "../controllers/user";
import {ROUTE_FORGOT_PASSWORD, ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_RESET_PASSWORD} from "../helpers/constants";

const router = Router()
const user_controller = new UserController()

router.post(ROUTE_LOGIN, user_controller.login)
router.post(ROUTE_REGISTER, user_controller.register)
router.post(ROUTE_FORGOT_PASSWORD, user_controller.forgotPassword)
router.post(ROUTE_RESET_PASSWORD, user_controller.resetPassword)

export default router