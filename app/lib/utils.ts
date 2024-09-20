import {
  AuthError,
  createClient,
  PostgrestError,
  SupabaseClient,
  UserResponse,
} from '@supabase/supabase-js';
import { AuthType, ItemType, TemplateType } from '@/types';

const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabase: SupabaseClient<any, 'public', any> = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

export async function signInWithGoogle(redirectTo: string): Promise<void> {
  const { error }: { error: AuthError | null } =
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo,
      },
    });

  if (error) {
    console.error('Error: signInWithGoogle ', error);
    alert('Error');
  }
}

export async function signOut(): Promise<void> {
  const { error }: { error: AuthError | null } = await supabase.auth.signOut();

  if (error) {
    console.error('Error: signOut ', error);
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
    console.error('Error: getTemplates ', error);
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
    console.error('Error: getTemplateTitle ', error);
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
    console.error('Error: getTemplateItems ', error);
    alert('Error');

    return [];
  }

  const items: ItemType[] =
    data?.map(({ id, url, description }) => {
      return { id, url, description };
    }) ?? [];

  return items;
}

export async function checkUserStatus(userId: string): Promise<boolean> {
  const { data, error }: { data: any[] | null; error: PostgrestError | null } =
    await supabase.from('user').select('*').eq('id', userId);

  if (error) {
    console.error('Error: checkUserStatus ', error);
    alert('Error');

    return false;
  }

  return (data?.length ?? 0) > 0;
}

export async function upsertUser(newUser: AuthType): Promise<void> {
  const { error }: { error: PostgrestError | null } = await supabase
    .from('user')
    .upsert({
      id: newUser.userId,
      email: newUser.email,
      name: newUser.name,
      avatar_url: newUser.avatarUrl,
    })
    .select();

  if (error) {
    console.error('Error: upsertUser ', error);
    alert('Error');
  }
}

export async function getUserInfo(userId: string): Promise<AuthType | null> {
  const { data, error }: { data: any[] | null; error: PostgrestError | null } =
    await supabase.from('user').select('*').eq('id', userId);

  if (error) {
    console.error('Error: getUserInfo ', error);
    alert('Error');

    return null;
  }

  if (data && data[0]) {
    return {
      userId: data[0].id,
      email: data[0].email,
      name: data[0].name,
      avatarUrl: data[0].avatar_url,
    };
  }

  return null;
}

export async function saveTierList(tierList: {
  template_id: string;
  user_id: string;
  s: string;
  a: string;
  b: string;
  c: string;
  f: string;
  not_rated: string;
}): Promise<boolean> {
  const { error }: { error: PostgrestError | null } = await supabase
    .from('tier_list')
    .upsert(tierList)
    .select();

  if (error) {
    console.error('Error: saveTierList ', error);
    alert('Error');

    return false;
  }

  return true;
}
