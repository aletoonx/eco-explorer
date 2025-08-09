import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp as initializeAdminApp, getApps as getAdminApps, getApp as getAdminApp, App as AdminApp, cert } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

// Configuración de Firebase para el cliente (navegador)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicialización de la App de Firebase en el cliente
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configuración de Firebase para el servidor (Admin SDK)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

const adminApp: AdminApp = getAdminApps().length
  ? getAdminApp()
  : initializeAdminApp({
      credential: cert(serviceAccount),
    });

const adminAuth = getAdminAuth(adminApp);
const SESSION_COOKIE_NAME = "eco-explorer-session";

// --- Funciones de autenticación del lado del cliente ---

export async function signUpWithEmail(email: string, password: string): Promise<string | null> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
        const idToken = await userCredential.user.getIdToken();
        return idToken;
    }
    return null;
}

export async function signInWithEmail(email: string, password: string): Promise<string | null> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
        const idToken = await userCredential.user.getIdToken();
        return idToken;
    }
    return null;
}

// --- Funciones de manejo de sesión del lado del servidor ---

export async function createSessionCookie(idToken: string) {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 días
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    
    cookies().set(SESSION_COOKIE_NAME, sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'lax',
    });
}

export async function getSession() {
    const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
    if (!sessionCookie) {
        return null;
    }
    try {
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
        return decodedClaims;
    } catch (error) {
        console.error("Error al verificar la cookie de sesión:", error);
        return null;
    }
}

export async function clearSessionCookie() {
    cookies().delete(SESSION_COOKIE_NAME);
}

export { app, auth, adminAuth };
