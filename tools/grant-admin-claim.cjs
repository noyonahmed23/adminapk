// Run only on a trusted developer machine with a Firebase service account.
// Never commit or share the service-account JSON file.
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

async function main() {
  const uid = process.argv[2]?.trim();
  if (!uid) {
    throw new Error("Usage: node grant-admin-claim.cjs FIREBASE_AUTH_UID");
  }

  initializeApp({ credential: applicationDefault() });
  const auth = getAuth();
  const user = await auth.getUser(uid);
  const currentClaims = user.customClaims || {};

  await auth.setCustomUserClaims(uid, {
    ...currentClaims,
    admin: true,
    role: "admin",
  });

  console.log(`Admin custom claim added for UID: ${uid}`);
  console.log("The user must sign in again or refresh their ID token.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
