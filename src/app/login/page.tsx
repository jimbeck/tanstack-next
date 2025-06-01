'use client';

import SignIn from "@/components/signin";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const session = useSession();
    const router = useRouter();
    if (session.status === 'authenticated') {
        router.push('/');
    }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Login Page</h1>
        <p className="mb-6">Please log in to access the application.</p>
        <SignIn/>
      </div>
    </div>
  );
}