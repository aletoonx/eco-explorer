'use server';

import { z } from 'zod';
import { createSessionCookie, clearSessionCookie } from '@/lib/firebase';
import { redirect } from 'next/navigation';

// Esta acción se ejecuta en el servidor y es simple, por lo que es compatible
// con los "redirects" que necesitamos, aunque la lógica principal de auth
// se mueva al cliente.

export async function createSession(idToken: string) {
    if (!idToken) {
        throw new Error('No se pudo obtener el token de ID.');
    }
    await createSessionCookie(idToken);
    redirect('/dashboard');
}

export async function handleSignOut() {
    await clearSessionCookie();
    redirect('/login');
}
