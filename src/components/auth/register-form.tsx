
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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push("be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("contain an uppercase letter");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("contain a special character");
    }
    return errors;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setError(`Password must ${passwordErrors.join(", ")}.`);
      return;
    }
    
    setLoading(true);
    try {
      // Firebase doesn't have direct username/password auth, so we'll use email/password
      // and treat the username as the "local part" of an email address for a dummy domain.
      const email = `${username}@eco-explorer.com`;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // We can store the username in the user's profile.
      await updateProfile(userCredential.user, {
        displayName: username
      });

      toast({
        title: "Registration Successful",
        description: "Your account has been created. Please log in.",
      });
      router.push("/login");
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        setError("This username is already taken. Please choose another one.");
      } else if (e.code === 'auth/weak-password') {
        setError("The password is too weak. It should be at least 6 characters long.");
      } else {
        setError("An unexpected error occurred. Please try again.");
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
          <CardTitle className="font-headline">Register</CardTitle>
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline text-primary">
              Login here
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
