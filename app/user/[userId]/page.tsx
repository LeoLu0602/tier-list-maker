'use client';

import { Dispatch } from 'react';
import { useAuthDispatch } from '@/app/contexts/AuthContext';
import { signOut } from '@/app/lib/auth';
import { ActionType } from '@/type';

export default function Page() {
  const dispatch: Dispatch<ActionType> = useAuthDispatch();

  return (
    <>
      <button
        className="text-base"
        onClick={async () => {
          await signOut();
          dispatch({ type: 'sign-out' });
          window.location.reload();
        }}
      >
        Sign out
      </button>
    </>
  );
}
