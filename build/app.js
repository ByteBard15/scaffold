"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var user_1 = __importDefault(require("./routes/user"));
var error_1 = __importDefault(require("./middleware/error"));
var constants_1 = require("./helpers/constants");
var status_1 = __importDefault(require("./helpers/status"));
var response_1 = require("./helpers/response");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(constants_1.ROUTE_USER, user_1.default);
app.all('*', function (req, res) {
    res.status(status_1.default.NOT_FOUND).send((0, response_1.buildResponse)({
        code: status_1.default.NOT_FOUND,
        success: false,
        type: response_1.ResponseType.ROUTE_NOT_FOUND,
    }));
});
app.use(error_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map