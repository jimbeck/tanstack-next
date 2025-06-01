'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';

export default function SignOut() {
  return (
    <form
      action={async () => {
        await signOut();
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
