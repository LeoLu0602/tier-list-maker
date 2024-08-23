'use client';

import { signInWithGoogle, signOut } from '@/app/lib/auth';

export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-black text-white">
      <ul className="flex items-center w-full h-full justify-between px-4">
        <li className="font-bold text-xl">Tier List Maker</li>
        <li>
          <button
            className="text-base"
            onClick={() => {
              signInWithGoogle();
            }}
          >
            Sign in
          </button>
        </li>
      </ul>
    </nav>
  );
}
