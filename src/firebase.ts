import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Authentication helper
export function ensureAnonymousAuth(onUserReady?: (user: FirebaseUser) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      try {
        const credential = await signInAnonymously(auth);
        if (onUserReady && credential.user) {
          onUserReady(credential.user);
        }
      } catch (authError) {
        console.warn("Firebase Anonymous Auth is constrained or not enabled in console. Falling back to secure unauthenticated public operations.", authError);
      }
    } else {
      if (onUserReady) {
        onUserReady(user);
      }
    }
  });
}

// Error Handling Infrastructure
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
