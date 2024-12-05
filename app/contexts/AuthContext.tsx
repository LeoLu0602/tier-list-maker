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
import { retrieveUser, upsertUser } from '@/app/lib/utils';
import { ActionType, AuthType } from '@/types';

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
                data: {
                    user: User | null;
                };
            } = await retrieveUser();

            if (data.user) {
                // user is signed in.
                const user: AuthType = {
                    userId: data.user.id,
                    email: data.user.email ?? '',
                    name: data.user.user_metadata.full_name,
                    avatarUrl: data.user.user_metadata.avatar_url,
                };

                // case 1: user found in db -> update the corresponding row
                // case 2: user not found in db -> insert new row
                await upsertUser(user);

                dispatch({
                    type: 'sign-in',
                    newAuth: user,
                });
            } else {
                // user is not signed in.
                dispatch({
                    type: 'sign-in',
                    newAuth: {
                        userId: '',
                        email: '',
                        name: '',
                        avatarUrl: '',
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
