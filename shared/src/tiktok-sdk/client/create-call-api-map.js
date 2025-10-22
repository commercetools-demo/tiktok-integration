"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCallApiMap = void 0;
const api_1 = require("../api");
const createCallApiMap = (basePath, interceptor) => {
    // @ts-ignore
    const callApiMap = {};
    for (const apiClientName in api_1.API_OBJECT) {
        if (Object.prototype.hasOwnProperty.call(api_1.API_OBJECT, apiClientName)) {
            const ApiClient = api_1.API_OBJECT[apiClientName];
            const apiClient = new ApiClient(basePath);
            if (interceptor)
                apiClient.addInterceptor(interceptor);
            //@ts-ignore
            callApiMap[apiClientName] = apiClient;
        }
    }
    return callApiMap;
};
exports.createCallApiMap = createCallApiMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNhbGwtYXBpLW1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZS1jYWxsLWFwaS1tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0NBQXNFO0FBR3RFLE1BQU0sZ0JBQWdCLEdBQUcsQ0FDdkIsUUFBaUIsRUFDakIsV0FBc0IsRUFDRSxFQUFFO0lBQzFCLGFBQWE7SUFDYixNQUFNLFVBQVUsR0FBMkIsRUFBRSxDQUFDO0lBRTlDLEtBQUssTUFBTSxhQUFhLElBQUksZ0JBQVUsRUFBRSxDQUFDO1FBQ3ZDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFVLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQztZQUNwRSxNQUFNLFNBQVMsR0FBRyxnQkFBVSxDQUMxQixhQUF3QyxDQUNSLENBQUM7WUFDbkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUMsSUFBSSxXQUFXO2dCQUFFLFNBQVMsQ0FBQyxjQUFjLENBQUMsV0FBa0IsQ0FBQyxDQUFDO1lBQzlELFlBQVk7WUFDWixVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ3hDLENBQUM7SUFDSCxDQUFDO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRU8sNENBQWdCIn0=