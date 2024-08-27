import {
  AuthError,
  createClient,
  PostgrestError,
  SupabaseClient,
  UserResponse,
} from '@supabase/supabase-js';
import { TemplateType } from '@/types';

const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabase: SupabaseClient<any, 'public', any> = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

export async function signInWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Error: signInWithGoogle');
    alert('Error');
  }
}

export async function signOut(): Promise<void> {
  const { error }: { error: AuthError | null } = await supabase.auth.signOut();

  if (error) {
    console.error('Error: signOut');
    alert('Error');
  }
}

export async function retrieveUser(): Promise<UserResponse> {
  return await supabase.auth.getUser();
}

export async function getTemplates(): Promise<TemplateType[]> {
  const { data, error }: { data: TemplateType[] | null; error: PostgrestError | null } =
    await supabase.from('template').select('*');

  if (error) {
    console.error('Error: getTemplates');
    alert('Error');
  }

  return data ?? [];
}
