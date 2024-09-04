import {
  AuthError,
  createClient,
  PostgrestError,
  SupabaseClient,
  UserResponse,
} from '@supabase/supabase-js';
import { ItemType, TemplateType } from '@/types';

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
  const {
    data,
    error,
  }: { data: TemplateType[] | null; error: PostgrestError | null } =
    await supabase.from('template').select('*');

  if (error) {
    console.error('Error: getTemplates');
    alert('Error');

    return [];
  }

  return data ?? [];
}

export async function getTemplateTitle(): Promise<string> {
  const {
    data,
    error,
  }: { data: TemplateType[] | null; error: PostgrestError | null } =
    await supabase.from('template').select('*');

  if (error) {
    console.error('Error: getTemplateTitle');
    alert('Error');

    return '';
  }

  return data?.[0].title ?? '';
}

export async function getTemplateItems(
  templateId: string
): Promise<ItemType[]> {
  const { data, error }: { data: any[] | null; error: PostgrestError | null } =
    await supabase.from('item').select('*').eq('template_id', templateId);

  if (error) {
    console.error('Error: getTemplateItems');
    alert('Error');

    return [];
  }

  const items: ItemType[] =
    data?.map(({ id, url, description }) => {
      return { id, url, description };
    }) ?? [];

  return items;
}
