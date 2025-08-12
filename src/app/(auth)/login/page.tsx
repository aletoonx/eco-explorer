'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { signInWithEmail, createSessionCookie } from '@/lib/firebase'; // Usamos las funciones del cliente

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const idToken = await signInWithEmail(email, password);
      if (!idToken) {
        throw new Error('No se pudo obtener el token de ID.');
      }
      
      // En un entorno estático, no podemos llamar a `createSessionCookie` directamente desde una acción
      // que también redirige. Hacemos la redirección manualmente en el cliente.
      // La cookie se establecerá a través de una API route o un mecanismo similar si es necesario
      // para proteger rutas en un futuro, pero para la navegación del cliente esto funciona.
      // Por ahora, el layout del cliente protegerá las rutas.
      
      // La forma más simple para un sitio estático es redirigir y dejar que el `useEffect` del layout
      // maneje el estado de la sesión. Para hacer eso, necesitamos una forma de pasar el token
      // o simplemente confiar en que el SDK de Firebase del cliente ahora está autenticado.
       
       const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        });

        if (response.ok) {
            router.push('/dashboard');
        } else {
            const data = await response.json();
            setError(data.message || 'Ocurrió un error al iniciar sesión.');
        }

    } catch (err: any) {
        console.error('Error de inicio de sesión:', err);
        let errorMessage = 'Ocurrió un error inesperado al iniciar sesión.';
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
            errorMessage = 'Las credenciales son incorrectas. Por favor, verifica tu correo y contraseña.';
        }
        setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">¡Bienvenido de Nuevo!</CardTitle>
        <CardDescription>Ingresa tu correo y contraseña para acceder a tu cuenta</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
             <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error de Autenticación</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="explorador@ejemplo.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="font-semibold text-primary underline-offset-4 hover:underline">
              Regístrate
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
