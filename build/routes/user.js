"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = __importDefault(require("../controllers/user"));
var constants_1 = require("../helpers/constants");
var router = (0, express_1.Router)();
var user_controller = new user_1.default();
router.post(constants_1.ROUTE_LOGIN, user_controller.login);
router.post(constants_1.ROUTE_REGISTER, user_controller.register);
router.post(constants_1.ROUTE_FORGOT_PASSWORD, user_controller.forgotPassword);
router.post(constants_1.ROUTE_RESET_PASSWORD, user_controller.resetPassword);
exports.default = router;
//# sourceMappingURL=user.js.map