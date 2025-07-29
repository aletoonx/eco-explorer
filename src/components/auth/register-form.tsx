"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push("tener al menos 8 caracteres");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("contener una letra mayúscula");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("contener un carácter especial");
    }
    return errors;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!username || !email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (!email.includes('@')) {
        setError("Por favor, ingresa una dirección de correo electrónico válida.");
        return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setError(`La contraseña debe ${passwordErrors.join(", ")}.`);
      return;
    }
    
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: username
      });

      toast({
        title: "Registro Exitoso",
        description: "Tu cuenta ha sido creada. Por favor, inicia sesión.",
      });
      router.push("/login");
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        setError("Este correo electrónico ya está en uso. Por favor, elige otro.");
      } else if (e.code === 'auth/weak-password') {
        setError("La contraseña es demasiado débil.");
      } else if (e.code === 'auth/invalid-email') {
        setError("La dirección de correo electrónico no es válida.");
      } else if (e.code === 'auth/configuration-not-found') {
        setError("La autenticación de Firebase no está configurada. Por favor, habilita el inicio de sesión con Correo/Contraseña en la consola de Firebase.");
      }
       else {
        setError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="font-headline">Registrarse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Nombre de Usuario</Label>
            <Input id="username" placeholder="explorador123" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" placeholder="explorador@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creando Cuenta...' : 'Crear Cuenta'}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="underline text-primary">
              Inicia sesión aquí
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
