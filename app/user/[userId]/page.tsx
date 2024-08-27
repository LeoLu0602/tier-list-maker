'use client';

import { Dispatch } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthDispatch } from '@/app/contexts/AuthContext';
import { signOut } from '@/app/lib/auth';
import { ActionType } from '@/type';

export default function Page() {
  const dispatch: Dispatch<ActionType> = useAuthDispatch();
  const router = useRouter();

  return (
    <>
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
