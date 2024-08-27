'use client';

import { Dispatch } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useAuth, useAuthDispatch } from '@/app/contexts/AuthContext';
import { signOut } from '@/app/lib/auth';
import { ActionType, AuthType } from '@/type';

export default function Page() {
  const auth: AuthType | null = useAuth();
  const dispatch: Dispatch<ActionType> = useAuthDispatch();
  const router: AppRouterInstance = useRouter();

  return (
    <>
      <img className="w-16 h-16 rounded-full" src={auth?.avatarUrl ?? ''} />
      <h1>{auth?.name ?? ''}</h1>
      <button
        className="text-base"
        onClick={async () => {
          await signOut();
          dispatch({ type: 'sign-out' });
          router.push('/');
        }}
      >
        Sign out
      </button>
    </>
  );
}
