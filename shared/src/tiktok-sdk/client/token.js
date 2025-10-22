"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessToken = exports.AccessTokenTool = exports.AccessTokenBuilder = exports.UserType = void 0;
const config_1 = require("./config");
const request_1 = __importDefault(require("request"));
const auth_host = "https://auth.tiktok-shops.com";
const refresh_token_path = "/api/v2/token/refresh";
const get_access_token_path = "/api/v2/token/get";
const grant_type = "authorized_code";
var UserType;
(function (UserType) {
    UserType[UserType["Seller"] = 0] = "Seller";
    UserType[UserType["Creator"] = 1] = "Creator";
})(UserType || (exports.UserType = UserType = {}));
class AccessToken {
    constructor({ access_token, refresh_token, config }) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.config = config;
    }
    refreshToken(props) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { refresh_token: _refresh_token, auto_filled = false } = props;
            const path = auth_host + refresh_token_path;
            // 请求逻辑
            const app_key = ((_a = this.config) === null || _a === void 0 ? void 0 : _a.app_key) || config_1.ClientConfiguration.globalConfig.app_key;
            const app_secret = ((_b = this.config) === null || _b === void 0 ? void 0 : _b.app_secret) || config_1.ClientConfiguration.globalConfig.app_secret;
            const refresh_token = _refresh_token || this.refresh_token;
            if (!app_key) {
                throw new Error("app_key is required");
            }
            if (!app_secret) {
                throw new Error("app_secret is required");
            }
            if (!refresh_token) {
                throw new Error("refresh_token is required");
            }
            const qs = {
                grant_type,
                refresh_token,
                app_key,
                app_secret,
            };
            const options = {
                method: "GET",
                url: path,
                qs,
                useQuerystring: true,
            };
            return new Promise((resolve, reject) => {
                (0, request_1.default)(options, (error, response, body) => {
                    var _a, _b, _c, _d;
                    if (error) {
                        reject(error);
                    }
                    if (auto_filled) {
                        if ((_a = body.data) === null || _a === void 0 ? void 0 : _a.access_token)
                            this.access_token = (_b = body.data) === null || _b === void 0 ? void 0 : _b.access_token;
                        if ((_c = body.data) === null || _c === void 0 ? void 0 : _c.refresh_token)
                            this.refresh_token = (_d = body.data) === null || _d === void 0 ? void 0 : _d.refresh_token;
                    }
                    resolve({
                        response,
                        body,
                    });
                });
            });
        });
    }
    getAccessToken(props) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { auth_code, auto_filled = false } = props;
            const path = auth_host + get_access_token_path;
            // 请求逻辑
            const app_key = ((_a = this.config) === null || _a === void 0 ? void 0 : _a.app_key) || config_1.ClientConfiguration.globalConfig.app_key;
            const app_secret = ((_b = this.config) === null || _b === void 0 ? void 0 : _b.app_secret) || config_1.ClientConfiguration.globalConfig.app_secret;
            if (!app_key) {
                throw new Error("app_key is required");
            }
            if (!app_secret) {
                throw new Error("app_secret is required");
            }
            if (!auth_code) {
                throw new Error("auth_code is required");
            }
            const qs = {
                grant_type,
                auth_code,
                app_key,
                app_secret,
            };
            const options = {
                method: "GET",
                url: path,
                qs,
                useQuerystring: true,
            };
            return new Promise((resolve, reject) => {
                (0, request_1.default)(options, (error, response, body) => {
                    var _a, _b, _c, _d;
                    if (error) {
                        reject(error);
                    }
                    if (auto_filled) {
                        if ((_a = body.data) === null || _a === void 0 ? void 0 : _a.access_token)
                            this.access_token = (_b = body.data) === null || _b === void 0 ? void 0 : _b.access_token;
                        if ((_c = body.data) === null || _c === void 0 ? void 0 : _c.refresh_token)
                            this.refresh_token = (_d = body.data) === null || _d === void 0 ? void 0 : _d.refresh_token;
                    }
                    resolve({
                        response,
                        body,
                    });
                });
            });
        });
    }
}
exports.AccessToken = AccessToken;
class AccessTokenBuilder {
    static build(access_token, refresh_token, config) {
        return new AccessToken({
            access_token,
            refresh_token,
            config,
        });
    }
}
exports.AccessTokenBuilder = AccessTokenBuilder;
class AccessTokenTool {
    static refreshToken(refresh_token, app_key, app_secret) {
        return __awaiter(this, void 0, void 0, function* () {
            let _app_key = app_key || config_1.ClientConfiguration.globalConfig.app_key;
            let _app_secret = app_secret || config_1.ClientConfiguration.globalConfig.app_secret;
            if (!_app_key) {
                throw new Error("app_key is required");
            }
            if (!_app_secret) {
                throw new Error("app_secret is required");
            }
            if (!refresh_token) {
                throw new Error("refresh_token is required");
            }
            const path = auth_host + refresh_token_path;
            // 请求逻辑
            const qs = {
                grant_type,
                refresh_token,
                app_key: _app_key,
                app_secret: _app_secret,
            };
            const options = {
                method: "GET",
                url: path,
                qs,
                useQuerystring: true,
            };
            return new Promise((resolve, reject) => {
                (0, request_1.default)(options, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    resolve({
                        response,
                        body,
                    });
                });
            });
        });
    }
    static getAccessToken(auth_code, app_key, app_secret) {
        return __awaiter(this, void 0, void 0, function* () {
            let _app_key = app_key || config_1.ClientConfiguration.globalConfig.app_key;
            let _app_secret = app_secret || config_1.ClientConfiguration.globalConfig.app_secret;
            if (!_app_key) {
                throw new Error("app_key is required");
            }
            if (!_app_secret) {
                throw new Error("app_secret is required");
            }
            if (!auth_code) {
                throw new Error("auth_code is required");
            }
            const path = auth_host + get_access_token_path;
            const qs = {
                grant_type,
                auth_code,
                app_key: _app_key,
                app_secret: _app_secret,
            };
            const options = {
                method: "GET",
                url: path,
                qs,
                useQuerystring: true,
            };
            return new Promise((resolve, reject) => {
                (0, request_1.default)(options, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    resolve({
                        response,
                        body,
                    });
                });
            });
        });
    }
}
exports.AccessTokenTool = AccessTokenTool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBK0M7QUFDL0Msc0RBQXNDO0FBRXRDLE1BQU0sU0FBUyxHQUFHLCtCQUErQixDQUFDO0FBRWxELE1BQU0sa0JBQWtCLEdBQUcsdUJBQXVCLENBQUM7QUFDbkQsTUFBTSxxQkFBcUIsR0FBRyxtQkFBbUIsQ0FBQztBQUVsRCxNQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQztBQVFyQyxJQUFZLFFBR1g7QUFIRCxXQUFZLFFBQVE7SUFDbEIsMkNBQVUsQ0FBQTtJQUNWLDZDQUFXLENBQUE7QUFDYixDQUFDLEVBSFcsUUFBUSx3QkFBUixRQUFRLFFBR25CO0FBMkRELE1BQU0sV0FBVztJQUlmLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBb0I7UUFDbkUsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVLLFlBQVksQ0FBQyxLQUF3RDs7O1lBQ3pFLE1BQU0sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFdBQVcsR0FBRyxLQUFLLEVBQUUsR0FBRyxLQUFLLENBQUM7WUFFckUsTUFBTSxJQUFJLEdBQUcsU0FBUyxHQUFHLGtCQUFrQixDQUFDO1lBQzVDLE9BQU87WUFDUCxNQUFNLE9BQU8sR0FDWCxDQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsT0FBTyxLQUFJLDRCQUFtQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7WUFDbkUsTUFBTSxVQUFVLEdBQ2QsQ0FBQSxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLFVBQVUsS0FBSSw0QkFBbUIsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO1lBQ3pFLE1BQU0sYUFB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