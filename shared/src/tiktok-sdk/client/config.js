"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientConfiguration = void 0;
class GlobalClientConfiguration {
}
class ClientConfiguration {
    constructor(app_key, app_secret, basePath) {
        this.app_key = app_key;
        this.app_secret = app_secret;
        this.basePath = basePath;
    }
    static createConfig() {
        const client = new ClientConfiguration();
        const configObject = {
            setAppKey(app_key) {
                client.app_key = app_key;
                return configObject;
            },
            setAppSecret(app_secret) {
                client.app_secret = app_secret;
                return configObject;
            },
            setBasePath(basePath) {
                client.basePath = basePath;
                return configObject;
            },
            build() {
                return client;
            },
        };
        return configObject;
    }
}
exports.ClientConfiguration = ClientConfiguration;
ClientConfiguration.globalConfig = GlobalClientConfiguration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0seUJBQXlCO0NBSTlCO0FBQ0QsTUFBTSxtQkFBbUI7SUFPdkIsWUFDRSxPQUFnQixFQUNoQixVQUFtQixFQUNuQixRQUFpQjtRQUVqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBQ0QsTUFBTSxDQUFDLFlBQVk7UUFDakIsTUFBTSxNQUFNLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1FBRXpDLE1BQU0sWUFBWSxHQUFHO1lBQ25CLFNBQVMsQ0FBQyxPQUFlO2dCQUN2QixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDekIsT0FBTyxZQUFZLENBQUM7WUFDdEIsQ0FBQztZQUNELFlBQVksQ0FBQyxVQUFrQjtnQkFDN0IsTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7Z0JBQy9CLE9BQU8sWUFBWSxDQUFDO1lBQ3RCLENBQUM7WUFDRCxXQUFXLENBQUMsUUFBZ0I7Z0JBQzFCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUMzQixPQUFPLFlBQVksQ0FBQztZQUN0QixDQUFDO1lBQ0QsS0FBSztnQkFDSCxPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDO1NBQ0YsQ0FBQztRQUNGLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7O0FBR00sa0RBQW1CO0FBbkNuQixnQ0FBWSxHQUFHLHlCQUF5QixDQUFDIn0=