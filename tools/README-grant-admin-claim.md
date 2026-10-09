# Grant the Admin APK claim safely

The Admin APK checks the Firebase ID token for `admin: true` or `role: "admin"`. This is an app UI gate only. Every privileged API route must still verify the ID token and admin role on the server.

## One-time local setup

1. In Firebase Console, create the intended administrator as a user under **Authentication** and copy that user's **UID**.
2. In Google Cloud/Firebase, create or use a trusted service account that has permission to manage Firebase Authentication custom claims. Download its JSON key to a private folder on your own computer. Never place it in this repository, a GitHub Actions secret unless explicitly needed by a controlled backend, or either APK.
3. Open CMD in this `tools` folder and run:

```cmd
npm init -y
npm install firebase-admin
set GOOGLE_APPLICATION_CREDENTIALS=C:\\private\\firebase-admin-service-account.json
node grant-admin-claim.cjs FIREBASE_AUTH_UID
```

Replace the Windows path and `FIREBASE_AUTH_UID` with your own values. Do not send either value or the service-account file to anyone.

4. Sign out and sign in to the Admin APK again. If no Firebase Android configuration is included for package `com.khelobd.admin`, login will still fail; add that app's correct `google-services.json` during the build.

Do not assign this claim to normal player accounts. Setting a claim does not make the existing shared-state PHP API secure; the live PHP backend must independently verify ID tokens and admin permissions.
