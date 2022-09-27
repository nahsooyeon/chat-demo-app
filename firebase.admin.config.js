import admin from "firebase-admin";

import serviceAccount from "../firebase_admin.json";

export const GOOGLE_APPLICATION_CREDENTIALS = "./firebase_admin.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
