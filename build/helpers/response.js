"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseType = void 0;
exports.buildResponse = buildResponse;
var ResponseType;
(function (ResponseType) {
    ResponseType["LOGIN_SUCCESSFUL"] = "LOGIN_SUCCESSFUL";
    ResponseType["REGISTER_SUCCESSFUL"] = "REGISTER_SUCCESSFUL";
    ResponseType["FORGOT_PASSWORD_EMAIL_SENT"] = "FORGOT_PASSWORD_EMAIL_SENT";
    ResponseType["RESET_PASSWORD_SUCCESSFUL"] = "RESET_PASSWORD_SUCCESSFUL";
    ResponseType["ROUTE_NOT_FOUND"] = "ROUTE_NOT_FOUND";
})(ResponseType || (exports.ResponseType = ResponseType = {}));
function buildResponse(response) {
    return response;
}
//# sourceMappingURL=response.js.map