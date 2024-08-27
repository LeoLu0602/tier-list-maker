'use client';

import Link from 'next/link';
import { signInWithGoogle, signOut } from '@/app/lib/auth';

export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-black text-white">
      <ul className="flex items-center w-full h-full justify-between px-4">
        <li className="font-bold text-xl">
          <Link href="/">Tier List Maker</Link>
        </li>
        <li>
          <Link href="/test">test</Link>

          <button
            className="text-base"
            onClick={() => {
              signInWithGoogle();
            }}
          >
            Sign in
          </button>

          <button
            className="text-base"
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
        </li>
      </ul>
    </nav>
  );
}
