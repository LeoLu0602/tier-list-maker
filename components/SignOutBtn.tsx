'use client';

import { Dispatch } from 'react';
import { useRouter } from 'next/navigation';
import { ActionType, AuthType } from '@/types';
import { useAuth, useAuthDispatch } from '@/app/contexts/AuthContext';
import { signOut } from '@/app/lib/utils';

export default function SignOutBtn({ userId }: { userId: string }) {
    const auth: AuthType | null = useAuth();
    const dispatch: Dispatch<ActionType> = useAuthDispatch();
    const router = useRouter();

    return (
        <>
            {auth && auth.userId === userId && (
                <button
                    className='h-8 w-20 rounded-md bg-rose-500 text-base'
                    onClick={async () => {
                        await signOut();
                        dispatch({ type: 'sign-out' });
                        router.push('/');
                    }}
                >
                    Sign out
                </button>
            )}
        </>
    );
}
