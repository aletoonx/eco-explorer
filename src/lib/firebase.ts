'use server';

import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp as initializeAdminApp, getApps as getAdminApps, getApp as getAdminApp, App as AdminApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

// --- Helpers para verificar si las credenciales están presentes ---

const hasClientSideFirebaseConfig =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const hasServerSideFirebaseConfig = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

// --- Configuración de Firebase para el cliente (navegador) ---

const firebaseConfig: FirebaseOptions = hasClientSideFirebaseConfig
  ? {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }
  : {};

// --- Inicialización de la App de Firebase en el cliente (si hay config) ---
const app = hasClientSideFirebaseConfig ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null;
const auth = app ? getAuth(app) : null;


// --- Configuración de Firebase para el servidor (Admin SDK) ---

const serviceAccount: ServiceAccount | null = hasServerSideFirebaseConfig
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)
  : null;

const adminApp: AdminApp | null = serviceAccount
  ? getAdminApps().length
    ? getAdminApp()
    : initializeAdminApp({ credential: cert(serviceAccount) })
  : null;

const adminAuth = adminApp ? getAdminAuth(adminApp) : null;
const SESSION_COOKIE_NAME = "eco-explorer-session";

// --- Funciones de autenticación (verificando si auth está disponible) ---

export async function signUpWithEmail(email: string, password: string): Promise<string | null> {
    if (!auth) throw new Error("Firebase client not initialized. Check your environment variables.");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
        const idToken = await userCredential.user.getIdToken();
        return idToken;
    }
    return null;
}

export async function signInWithEmail(email: string, password: string): Promise<string | null> {
    if (!auth) throw new Error("Firebase client not initialized. Check your environment variables.");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
        const idToken = await userCredential.user.getIdToken();
        return idToken;
    }
    return null;
}

// --- Funciones de manejo de sesión del lado del servidor (verificando si adminAuth está disponible) ---

export async function createSessionCookie(idToken: string) {
    if (!adminAuth) throw new Error("Firebase Admin SDK not initialized. Check your environment variables.");
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 días
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    
    cookies().set(SESSION_COOKIE_NAME, sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    });
}

export async function getSession() {
    if (!adminAuth) {
        console.warn("Firebase Admin SDK not initialized. Sessions cannot be verified.");
        return null;
    }
    const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
    if (!sessionCookie) {
        return null;
    }
    try {
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
        return decodedClaims;
    } catch (error) {
        // La sesión no es válida, borramos la cookie.
        cookies().delete(SESSION_COOKIE_NAME);
        return null;
    }
}

export async function checkSession(sessionCookieValue: string) {
    if (!adminAuth) {
        console.warn("Firebase Admin SDK not initialized. Sessions cannot be verified.");
        return null;
    }
    try {
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookieValue, true);
        return decodedClaims;
    } catch (error) {
        return null;
    }
}


export async function clearSessionCookie() {
    cookies().delete(SESSION_COOKIE_NAME);
}
