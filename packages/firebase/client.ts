import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  type Auth,
} from "firebase/auth";

const isNonEmptyString = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

const looksLikeServiceAccountOrPrivateKey = (v: string): boolean => {
  const s = v.trim();
  return (
    s.includes("-----BEGIN PRIVATE KEY-----") ||
    s.includes("PRIVATE KEY") ||
    s.includes("@") ||
    s.includes("iam.gserviceaccount.com")
  );
};

const looksLikePlaceholder = (v: string): boolean => {
  const s = v.trim().toLowerCase();
  return s === "harpply" || s === "changeme" || s === "todo" || s === "your_api_key";
};

type FirebaseClientConfig = {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
};

const readFirebaseClientConfig = (): FirebaseClientConfig => ({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

export type FirebaseClientConfigDiagnostics = {
  ok: boolean;
  problems: string[];
  config: FirebaseClientConfig;
};

export const getFirebaseClientConfigDiagnostics = (): FirebaseClientConfigDiagnostics => {
  const config = readFirebaseClientConfig();
  const problems: string[] = [];

  if (!isNonEmptyString(config.apiKey) || looksLikePlaceholder(config.apiKey)) {
    problems.push("NEXT_PUBLIC_FIREBASE_API_KEY is missing/placeholder (should look like AIza...)");
  }
  if (!isNonEmptyString(config.authDomain) || !config.authDomain.includes(".")) {
    problems.push(
      "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN is missing/invalid (should look like your-project-id.firebaseapp.com)"
    );
  } else if (looksLikeServiceAccountOrPrivateKey(config.authDomain)) {
    problems.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN looks like a service account/private key (wrong value)");
  }
  if (!isNonEmptyString(config.projectId)) {
    problems.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing (should look like your-project-id)");
  } else if (looksLikeServiceAccountOrPrivateKey(config.projectId)) {
    problems.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID looks like a private key/service account value (wrong value)");
  }

  return { ok: problems.length === 0, problems, config };
};

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let warned = false;

const ensureInitializedInBrowser = (): void => {
  if (authInstance) return;
  if (typeof window === "undefined") return;

  const diag = getFirebaseClientConfigDiagnostics();
  if (!diag.ok) {
    if (!warned && process.env.NODE_ENV !== "production") {
      warned = true;
      // eslint-disable-next-line no-console
      console.error(
        `[firebase] Web client not configured.\n- ${diag.problems.join("\n- ")}\n` +
          "Fix: set apps/web/.env.local using Firebase Console → Web app config (apps/web/.env.example)."
      );
    }
    return;
  }

  const cfg = diag.config as Required<FirebaseClientConfig>;
  app = !getApps().length ? initializeApp(cfg) : (getApps()[0] as FirebaseApp);
  // In PWAs / strict browser environments, the default Auth resolver can fail to
  // initialize cleanly, which breaks popup/redirect flows. Explicitly initialize
  // with the browser popup/redirect resolver and local persistence.
  try {
    authInstance = initializeAuth(app, {
      persistence: browserLocalPersistence,
      popupRedirectResolver: browserPopupRedirectResolver,
    });
  } catch {
    authInstance = getAuth(app);
  }
};

export const getFirebaseAuth = (): Auth | null => {
  ensureInitializedInBrowser();
  return authInstance;
};

export const getFirebaseApp = (): FirebaseApp | null => {
  ensureInitializedInBrowser();
  return app;
};

export const isFirebaseConfigured = (): boolean => getFirebaseAuth() !== null;

// Back-compat exports (but prefer getFirebaseAuth/getFirebaseApp to avoid SSR confusion).
export const auth: Auth | null = getFirebaseAuth();
export const firebaseApp: FirebaseApp | null = getFirebaseApp();
export default firebaseApp;
