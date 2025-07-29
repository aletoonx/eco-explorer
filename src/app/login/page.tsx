import { LoginForm } from "@/components/auth/login-form";
import { Leaf } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
            <Link href="/" className="inline-block mb-4">
                <Leaf className="w-12 h-12 text-primary" />
            </Link>
          <h1 className="text-3xl font-bold font-headline">Bienvenido de Nuevo a Eco Explorador</h1>
          <p className="text-muted-foreground">Ingresa tus credenciales para continuar tu viaje.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
