import { FirestoreClient, FirestoreActions } from "tiktok-integration-shared";

export const getAccessToken = async () => {
    const firestore = FirestoreClient.createFirestoreClient({
        projectId: process.env.GCP_PROJECT_ID as string,
        databaseId: process.env.GCP_FIRESTORE_DATABASE_ID as string,
        credentials: {
            client_email: process.env.GCP_SERVICE_ACCOUNT_CLIENT_EMAIL as string,
            private_key: process.env.GCP_SERVICE_ACCOUNT_PRIVATE_KEY as string,
        },
    });
    const access_token = await FirestoreActions.getAccessToken(firestore, process.env.TIKTOK_APP_KEY as string);

    return {
        access_token,
        firestore
    }
  
}