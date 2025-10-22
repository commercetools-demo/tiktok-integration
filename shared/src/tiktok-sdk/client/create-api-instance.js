"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiInstance = void 0;
const create_trans_request_options_1 = require("./create-trans-request-options");
const create_call_api_map_1 = require("./create-call-api-map");
const basePath = 'https://open-api.tiktokglobalshop.com';
const createApiInstance = (client) => {
    var _a;
    const path = ((_a = client.config) === null || _a === void 0 ? void 0 : _a.basePath) || basePath;
    const interceptor = (0, create_trans_request_options_1.createTransRequestOptionsInterceptor)(client);
    const apiInstanceGroup = (0, create_call_api_map_1.createCallApiMap)(path, interceptor);
    return {
        api: apiInstanceGroup,
    };
};
exports.createApiInstance = createApiInstance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWFwaS1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZS1hcGktaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUZBQXNGO0FBQ3RGLCtEQUF5RDtBQUd6RCxNQUFNLFFBQVEsR0FBRyx1Q0FBdUMsQ0FBQztBQUVsRCxNQUFNLGlCQUFpQixHQUFHLENBQUMsTUFBK0IsRUFBRSxFQUFFOztJQUNuRSxNQUFNLElBQUksR0FBRyxDQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsUUFBUSxLQUFJLFFBQVEsQ0FBQztJQUVqRCxNQUFNLFdBQVcsR0FBRyxJQUFBLG1FQUFvQyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWpFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSxzQ0FBZ0IsRUFBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFN0QsT0FBTztRQUNMLEdBQUcsRUFBRSxnQkFBZ0I7S0FDdEIsQ0FBQztBQUNKLENBQUMsQ0FBQztBQVZXLFFBQUEsaUJBQWlCLHFCQVU1QiJ9