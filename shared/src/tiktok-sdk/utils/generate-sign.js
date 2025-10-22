"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSign = void 0;
const crypto_1 = __importDefault(require("crypto"));
const excludeKeys = ["access_token", "sign"];
const generateSign = (requestOption, app_secret) => {
    var _a;
    let signString = "";
    // step1: Extract all query parameters excluding sign and access_token. Reorder the parameter keys in alphabetical order:
    const params = requestOption.qs || {};
    const sortedParams = Object.keys(params)
        .filter((key) => !excludeKeys.includes(key))
        .sort()
        .map((key) => ({ key, value: params[key] }));
    //step2: Concatenate all the parameters in the format {key}{value}:
    const paramString = sortedParams
        .map(({ key, value }) => `${key}${value}`)
        .join("");
    signString += paramString;
    //step3: Append the string from Step 2 to the API request path:
    // @ts-ignore
    const pathname = new URL(requestOption.uri || '').pathname;
    signString = `${pathname}${paramString}`;
    //step4: If the request header content_type is not multipart/form-data, append the API request body to the string from Step 3:
    if (((_a = requestOption.headers) === null || _a === void 0 ? void 0 : _a["content_type"]) !== "multipart/form-data" &&
        requestOption.body &&
        Object.keys(requestOption.body).length) {
        const body = JSON.stringify(requestOption.body);
        signString += body;
    }
    //step5: Wrap the string generated in Step 4 with the app_secret:
    signString = `${app_secret}${signString}${app_secret}`;
    //step6: Encode your wrapped string using HMAC-SHA256:
    const hmac = crypto_1.default.createHmac("sha256", app_secret);
    hmac.update(signString);
    const sign = hmac.digest("hex");
    return sign;
};
exports.generateSign = generateSign;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtc2lnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlbmVyYXRlLXNpZ24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQTRCO0FBRTVCLE1BQU0sV0FBVyxHQUFHLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBVSxDQUFDO0FBQy9DLE1BQU0sWUFBWSxHQUFHLENBQzFCLGFBQXNDLEVBQ3RDLFVBQWtCLEVBQ2xCLEVBQUU7O0lBQ0YsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLHlIQUF5SDtJQUN6SCxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN0QyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNyQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFVLENBQUMsQ0FBQztTQUNsRCxJQUFJLEVBQUU7U0FDTixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQyxtRUFBbUU7SUFDbkUsTUFBTSxXQUFXLEdBQUcsWUFBWTtTQUM3QixHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxFQUFFLENBQUM7U0FDekMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRVosVUFBVSxJQUFJLFdBQVcsQ0FBQztJQUUxQiwrREFBK0Q7SUFDakUsYUFBYTtJQUNYLE1BQU0sUUFBUSxHQUFHLElBQUksR0FBRyxDQUFDLGFBQWMsQ0FBQyxHQUFJLElBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBRTNELFVBQVUsR0FBRyxHQUFHLFFBQVEsR0FBRyxXQUFXLEVBQUUsQ0FBQztJQUV6Qyw4SEFBOEg7SUFDOUgsSUFDRSxDQUFBLE1BQUEsYUFBYSxDQUFDLE9BQU8sMENBQUcsY0FBYyxDQUFDLE1BQUsscUJBQXFCO1FBQ2pFLGFBQWEsQ0FBQyxJQUFJO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFDdEMsQ0FBQztRQUNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELFVBQVUsSUFBSSxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELGlFQUFpRTtJQUNqRSxVQUFVLEdBQUcsR0FBRyxVQUFVLEdBQUcsVUFBVSxHQUFHLFVBQVUsRUFBRSxDQUFDO0lBRXZELHNEQUFzRDtJQUN0RCxNQUFNLElBQUksR0FBRyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhDLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBM0NXLFFBQUEsWUFBWSxnQkEyQ3ZCIn0=