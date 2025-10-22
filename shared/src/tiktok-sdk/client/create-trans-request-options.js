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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransRequestOptionsInterceptor = void 0;
const generate_sign_1 = require("../utils/generate-sign");
const config_1 = require("./config");
const createTransRequestOptionsInterceptor = (client) => (option) => __awaiter(void 0, void 0, void 0, function* () {
    const clientConfig = client.config;
    const app_key = (clientConfig === null || clientConfig === void 0 ? void 0 : clientConfig.app_key) || config_1.ClientConfiguration.globalConfig.app_key;
    const app_secret = (clientConfig === null || clientConfig === void 0 ? void 0 : clientConfig.app_secret) || config_1.ClientConfiguration.globalConfig.app_secret;
    const timestamp = Math.floor(Date.now() / 1000);
    if (!app_key) {
        throw new Error("app_key is required");
    }
    if (!app_secret) {
        throw new Error("app_secret is required");
    }
    option.qs = Object.assign({ timestamp,
        app_key }, option.qs);
    if (option.qs) {
        const newQs = {};
        for (const key in option.qs) {
            if (Object.prototype.hasOwnProperty.call(option.qs, key)) {
                const element = option.qs[key];
                if (Array.isArray(element)) {
                    newQs[key] = element.join(",");
                }
                else {
                    newQs[key] = element;
                }
            }
        }
        option.qs = newQs;
    }
    option.headers = Object.assign({ "Content-Type": "application/json", 'User-Agent': 'sdk_node/1.0.0' }, option.headers);
    option.qs["sign"] = (0, generate_sign_1.generateSign)(option, app_secret);
    return;
});
exports.createTransRequestOptionsInterceptor = createTransRequestOptionsInterceptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXRyYW5zLXJlcXVlc3Qtb3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZS10cmFucy1yZXF1ZXN0LW9wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsMERBQXNEO0FBRXRELHFDQUErQztBQUV4QyxNQUFNLG9DQUFvQyxHQUMvQyxDQUFDLE1BQStCLEVBQWUsRUFBRSxDQUNqRCxDQUFPLE1BQStCLEVBQUUsRUFBRTtJQUN4QyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBRW5DLE1BQU0sT0FBTyxHQUNYLENBQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLE9BQU8sS0FBSSw0QkFBbUIsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO0lBQ3BFLE1BQU0sVUFBVSxHQUNkLENBQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLFVBQVUsS0FBSSw0QkFBbUIsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO0lBQzFFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBRWhELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsbUJBQ1AsU0FBUztRQUNULE9BQU8sSUFDSixNQUFNLENBQUMsRUFBRSxDQUNiLENBQUM7SUFFRixJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNkLE1BQU0sS0FBSyxHQUF3QixFQUFFLENBQUM7UUFDdEMsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDNUIsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUN6RCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztvQkFDM0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7cUJBQU0sQ0FBQztvQkFDTixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDO2dCQUN2QixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU8sbUJBQ1osY0FBYyxFQUFFLGtCQUFrQixFQUNsQyxZQUFZLEVBQUUsZ0JBQWdCLElBRTNCLE1BQU0sQ0FBQyxPQUFPLENBQ2xCLENBQUM7SUFFRixNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUEsNEJBQVksRUFBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFckQsT0FBTztBQUNULENBQUMsQ0FBQSxDQUFDO0FBakRTLFFBQUEsb0NBQW9DLHdDQWlEN0MifQ==