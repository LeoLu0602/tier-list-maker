'use client';

import Link from 'next/link';
import { signInWithGoogle } from '@/app/lib/utils';
import { useAuth } from '@/app/contexts/AuthContext';
import { AuthType } from '@/types';

export default function Navbar() {
    const auth: AuthType | null = useAuth();

    return (
        <nav className='h-16 w-full bg-black text-white'>
            <ul className='flex h-full w-full items-center justify-between px-4'>
                <li className='text-xl font-bold'>
                    <Link href='/'>Tier List Maker</Link>
                </li>

                <li>
                    {auth ? (
                        auth.userId !== '' ? (
                            <Link href={`/user/${auth.userId}`}>
                                My Account
                            </Link>
                        ) : (
                            <button
                                className='text-base'
                                onClick={async () => {
                                    await signInWithGoogle(
                                        window.location.origin
                                    );
                                }}
                            >
                                Sign in
                            </button>
                        )
                    ) : (
                        <></>
                    )}
                </li>
            </ul>
        </nav>
    );
}
