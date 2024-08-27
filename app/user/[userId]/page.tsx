'use client';

import { Dispatch } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useAuth, useAuthDispatch } from '@/app/contexts/AuthContext';
import { signOut } from '@/app/lib/utils';
import { ActionType, AuthType } from '@/types';

export default function Page() {
  const auth: AuthType | null = useAuth();
  const dispatch: Dispatch<ActionType> = useAuthDispatch();
  const router: AppRouterInstance = useRouter();
  const pathname: string = usePathname();

  return (
    <>
      <section className="flex gap-4 h-20 items-center">
        <img className="w-20 h-20 rounded-full" src={auth?.avatarUrl ?? ''} />
        <div className="flex flex-col items-start justify-between h-full">
          <h2 className="font-bold text-4xl">{auth?.name ?? ''}</h2>
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
        </div>
      </section>
    </>
  );
}
