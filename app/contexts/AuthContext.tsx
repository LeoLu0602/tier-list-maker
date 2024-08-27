'use client';

import {
  Context,
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { User } from '@supabase/supabase-js';
import { retrieveUser } from '@/app/lib/auth';
import { ActionType, AuthType } from '@/type';

const AuthContext: Context<AuthType | null> = createContext<AuthType | null>(
  null
);
const AuthDispatchContext: Context<Dispatch<ActionType> | null> =
  createContext<Dispatch<ActionType> | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [auth, dispatch] = useReducer(authReducer, null);

  useEffect(() => {
    async function setUp(): Promise<void> {
      const {
        data,
      }: {
        data:
          | {
              user: User;
            }
          | {
              user: null;
            };
      } = await retrieveUser();

      // user is logged in
      if (data.user) {
        dispatch({
          type: 'sign-in',
          newAuth: {
            userId: data.user.id,
            email: data.user.email as string,
            avatarUrl: data.user.user_metadata.avatar_url,
          },
        });
      }
    }

    setUp();
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthType | null {
  return useContext(AuthContext);
}

export function useAuthDispatch(): Dispatch<ActionType> {
  return useContext(AuthDispatchContext as Context<Dispatch<ActionType>>);
}

function authReducer(
  auth: AuthType | null,
  action: ActionType
): AuthType | null {
  switch (action.type) {
    case 'sign-in': {
      return action.newAuth as AuthType;
    }
    case 'sign-out': {
      return null;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
