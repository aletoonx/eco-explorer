'use server';

import { z } from 'zod';
import { createSessionCookie, clearSessionCookie } from '@/lib/firebase';
import { redirect } from 'next/navigation';

export async function createSession(idToken: string) {
    if (!idToken) {
        return { success: false, message: 'No se pudo obtener el token de ID.' };
    }
    try {
        await createSessionCookie(idToken);
        return { success: true };
    } catch (error) {
        console.error('Error al crear la cookie de sesión:', error);
        return { success: false, message: 'Error interno del servidor.' };
    }
}

export async function handleSignOut() {
    await clearSessionCookie();
    redirect('/login');
}
