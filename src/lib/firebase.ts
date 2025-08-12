
'use server';

import { initializeApp as initializeAdminApp, getApps as getAdminApps, getApp as getAdminApp, App as AdminApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

// --- Configuración de Firebase para el servidor (Admin SDK) ---

function getAdminAppSafe(): AdminApp | null {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) return null;
    try {
        const serviceAccount: ServiceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        if (getAdminApps().length > 0) {
            return getAdminApp();
        }
        return initializeAdminApp({ credential: cert(serviceAccount) });
    } catch (error) {
        console.error("Error parsing Firebase service account key:", error);
        return null;
    }
}

const SESSION_COOKIE_NAME = "eco-explorer-session";


// --- Funciones de manejo de sesión del lado del servidor (verificando si adminAuth está disponible) ---

export async function createSessionCookie(idToken: string) {
    const adminApp = getAdminAppSafe();
    if (!adminApp) throw new Error("Firebase Admin SDK not initialized. Check your environment variables.");
    const adminAuth = getAdminAuth(adminApp);

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
    const adminApp = getAdminAppSafe();
    if (!adminApp) {
        console.warn("Firebase Admin SDK not initialized. Sessions cannot be verified.");
        return null;
    }
    const adminAuth = getAdminAuth(adminApp);
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
    const adminApp = getAdminAppSafe();
    if (!adminApp) {
        console.warn("Firebase Admin SDK not initialized. Sessions cannot be verified.");
        return null;
    }
    const adminAuth = getAdminAuth(adminApp);
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
