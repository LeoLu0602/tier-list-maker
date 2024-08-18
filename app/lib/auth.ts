import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Error: signInWithGoogle');
    alert('Error');
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error: signOut');
    alert('Error');
  }
}

export async function retrieveUser() {
  const { data } = await supabase.auth.getUser();
}
