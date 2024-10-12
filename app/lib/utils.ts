import {
  createClient,
  SupabaseClient,
  UserResponse,
} from '@supabase/supabase-js';
import { AuthType, ItemType, TemplateType, TierListType } from '@/types';

const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabase: SupabaseClient<any, 'public', any> = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

export async function signInWithGoogle(redirectTo: string): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
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
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error: signOut ', error);
    alert('Error');
  }
}

export async function retrieveUser(): Promise<UserResponse> {
  return await supabase.auth.getUser();
}

export async function getAllTemplates(): Promise<TemplateType[]> {
  const { data, error } = await supabase.from('template').select('*');

  if (error) {
    console.error('Error: getAllTemplates ', error);
    alert('Error');

    return [];
  }

  return (
    data.map(({ id, title, poster }) => {
      return { id, title, poster };
    }) ?? []
  );
}

export async function getTemplateItems(
  templateId: string
): Promise<ItemType[]> {
  const { data, error } = await supabase
    .from('item')
    .select('*')
    .eq('template_id', templateId);

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

export async function getTemplate(
  templateId: string
): Promise<TemplateType | null> {
  const { data, error } = await supabase
    .from('template')
    .select('*')
    .eq('id', templateId);

  if (error) {
    console.error('Error: getTemplate ', error);
    alert('Error');

    return null;
  }

  return data?.[0] ?? null;
}

export async function upsertUser({
  userId,
  email,
  name,
  avatarUrl,
}: AuthType): Promise<void> {
  // "Primary keys must be included in values to use upsert" (https://supabase.com/docs/reference/javascript/upsert)
  const { error } = await supabase
    .from('user')
    .upsert({
      id: userId,
      email: email,
      name: name,
      avatar_url: avatarUrl,
    })
    .select();

  if (error) {
    console.error('Error: upsertUser ', error);
    alert('Error');
  }
}

export async function getUserInfo(userId: string): Promise<AuthType | null> {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', userId);

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

export async function saveTierList(tierList: TierListType): Promise<boolean> {
  // "Primary keys must be included in values to use upsert" (https://supabase.com/docs/reference/javascript/upsert)
  const { error } = await supabase.from('tier_list').upsert(tierList).select();

  if (error) {
    console.error('Error: saveTierList ', error);
    alert('Error');

    return false;
  }

  return true;
}

export async function getUserTemplates(
  userId: string
): Promise<{ template_id: string; title: string; poster: string }[]> {
  const { data, error } = await supabase
    .from('tier_list')
    .select('*')
    .eq('user_id', userId)
    .select('template_id, title, poster');

  if (error) {
    console.error('Error: getUserTierLists ', error);
    alert('Error');

    return [];
  }

  return data;
}
