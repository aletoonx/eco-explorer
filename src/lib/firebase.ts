
'use server';

import { initializeApp as initializeAdminApp, getApps as getAdminApps, getApp as getAdminApp, App as AdminApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

// --- Configuración de Firebase para el servidor (Admin SDK) ---

const serviceAccount: ServiceAccount | null = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : null;

const adminApp: AdminApp | null = serviceAccount && !getAdminApps().length
  ? initializeAdminApp({ credential: cert(serviceAccount) })
  : getAdminApps().length > 0 ? getAdminApp() : null;

const adminAuth = adminApp ? getAdminAuth(adminApp) : null;

const SESSION_COOKIE_NAME = "eco-explorer-session";


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
