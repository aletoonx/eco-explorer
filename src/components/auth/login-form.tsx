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
import { Terminal } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    
    setLoading(true);
    try {
      await setPersistence(auth, browserSessionPersistence);
      
      const email = `${username}@eco-explorer.com`;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // The onAuthStateChanged listener in a parent component will handle the redirect.
      // For the middleware, we'll set a simple cookie.
      const token = await userCredential.user.getIdToken();
      document.cookie = `auth_token=${token}; path=/; max-age=3600`;

      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting you to the dashboard...",
      });
      router.push("/dashboard");

    } catch (e: any) {
       if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
        setError("Invalid username or password.");
      } else {
        setError("An unexpected error occurred during login. Please try again.");
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
          <CardTitle className="font-headline">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="explorer123" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="underline text-primary">
              Register here
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
