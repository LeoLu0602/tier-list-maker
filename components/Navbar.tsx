'use client';

import { signInWithGoogle, signOut } from '@/app/lib/auth';

export default function Navbar() {
  return (
    <nav>
      <button
        className="bg-green-500"
        onClick={() => {
          signInWithGoogle();
        }}
      >
        Sign in with Google
      </button>
      <br />
      <button
        className="bg-red-500"
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </button>
    </nav>
  );
}
