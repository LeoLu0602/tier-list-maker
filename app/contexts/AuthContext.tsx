'use client';

import {
  Context,
  createContext,
  Dispatch,
  useContext,
  useReducer,
} from 'react';

interface AuthType {
  userId: string;
}

interface ActionType {
  type: string;
  newAuth: AuthType;
}

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

export function useAuthDispatch(): Dispatch<ActionType> | null {
  return useContext(AuthDispatchContext);
}

function authReducer(
  auth: AuthType | null,
  action: ActionType
): AuthType | null {
  switch (action.type) {
    case 'sign-in': {
      return action.newAuth;
    }
    case 'sign-out': {
      return null;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
