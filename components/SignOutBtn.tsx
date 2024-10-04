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
          className="text-base bg-rose-500 rounded-md h-8 w-20"
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
