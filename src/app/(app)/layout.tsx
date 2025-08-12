
'use client';
import { AppHeader } from "@/components/layout/app-header";
import { Footer } from "@/components/layout/footer";
import { onAuthStateChanged } from 'firebase/auth';
// Importamos desde el nuevo archivo específico del cliente
import { auth } from '@/lib/firebase-client'; 
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // onAuthStateChanged ya sabe a qué instancia de auth pertenece
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    // Limpiamos la suscripción al desmontar el componente
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
