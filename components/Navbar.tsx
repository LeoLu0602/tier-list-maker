'use client';

import Link from 'next/link';
import { signInWithGoogle } from '@/app/lib/utils';
import { useAuth } from '@/app/contexts/AuthContext';
import { AuthType } from '@/types';

export default function Navbar() {
  const auth: AuthType | null = useAuth();

  return (
    <nav className="w-full h-16 bg-black text-white">
      <ul className="flex items-center w-full h-full justify-between px-4">
        <li className="font-bold text-xl">
          <Link href="/">Tier List Maker</Link>
        </li>

        <li>
          {auth ? (
            <Link href={`/user/${auth.userId}`}>My Account</Link>
          ) : (
            <button
              className="text-base"
              onClick={async () => {
                await signInWithGoogle();
              }}
            >
              Sign in
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
