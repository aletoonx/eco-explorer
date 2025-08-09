'use server';

import { z } from 'zod';
import { signInWithEmail, signUpWithEmail, getSession, createSessionCookie, clearSessionCookie } from '@/lib/firebase';
import { redirect } from 'next/navigation';

const emailSchema = z.string().email({ message: 'Por favor, ingresa un correo electrónico válido.' });
const passwordSchema = z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' });

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export async function handleLogin(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Por favor, corrige los errores en el formulario.',
    };
  }

  try {
    const { email, password } = validatedFields.data;
    const idToken = await signInWithEmail(email, password);
    if (!idToken) {
        throw new Error('No se pudo obtener el token de ID.');
    }
    await createSessionCookie(idToken);
  } catch (error: any) {
    console.error('Error de inicio de sesión:', error);
    let errorMessage = 'Ocurrió un error inesperado al iniciar sesión.';
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Las credenciales son incorrectas. Por favor, verifica tu correo y contraseña.';
    }
    return {
        message: errorMessage,
    };
  }

  redirect('/dashboard');
}


export async function handleRegister(prevState: any, formData: FormData) {
    const validatedFields = registerSchema.safeParse(Object.fromEntries(formData.entries()));
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Por favor, corrige los errores en el formulario.',
      };
    }
  
    try {
      const { email, password } = validatedFields.data;
      const idToken = await signUpWithEmail(email, password);
       if (!idToken) {
        throw new Error('No se pudo obtener el token de ID después del registro.');
      }
      await createSessionCookie(idToken);
    } catch (error: any) {
      console.error('Error de registro:', error);
      let errorMessage = 'Ocurrió un error inesperado durante el registro.';
      if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Este correo electrónico ya está en uso. Por favor, intenta con otro.';
      }
      return {
          message: errorMessage,
      };
    }
  
    redirect('/dashboard');
}

export async function handleSignOut() {
    await clearSessionCookie();
    redirect('/login');
}
