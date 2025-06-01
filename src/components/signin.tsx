'use client';

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignIn() {
return            <form
      action={async () => {
        await signIn('google', {callbackUrl: '/'});
      }}
    >
         <Button type="submit">Sign in</Button>
    </form>
}