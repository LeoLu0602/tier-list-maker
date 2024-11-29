import {
    createClient,
    SupabaseClient,
    UserResponse,
} from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
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
    }
}

export async function signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error: signOut ', error);
    }
}

export async function retrieveUser(): Promise<UserResponse> {
    return await supabase.auth.getUser();
}

export async function getAllTemplates(): Promise<TemplateType[]> {
    const { data, error } = await supabase.from('template').select('*');

    if (error) {
        console.error('Error: getAllTemplates ', error);

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

        return null;
    }

    return data.length > 0 ? data[0] : null;
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
    }
}

export async function getUserInfo(userId: string): Promise<AuthType | null> {
    const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', userId);

    if (error) {
        console.error('Error: getUserInfo ', error);

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
    const { error } = await supabase
        .from('tier_list')
        .upsert(tierList)
        .select();

    if (error) {
        console.error('Error: saveTierList ', error);

        return false;
    }

    return true;
}

export async function getUserTierLists(
    userId: string
): Promise<
    { id: string; created_at: number; title: string; preview: string }[]
> {
    const { data, error } = await supabase
        .from('tier_list')
        .select('user_id, id, created_at, title, preview')
        .eq('user_id', userId);

    if (error) {
        console.error('Error: getUserTierLists ', error);

        return [];
    }

    return data.map(({ id, created_at, title, preview }) => {
        return {
            id,
            created_at: new Date(created_at).getTime(),
            title,
            preview,
        };
    });
}

export async function getTierList(
    tierListId: string
): Promise<TierListType | null> {
    const { data, error } = await supabase
        .from('tier_list')
        .select('*')
        .eq('id', tierListId);

    if (error) {
        console.error('Error: getTierList ', error);

        return null;
    }

    return data.length > 0 ? data[0] : null;
}

export async function getItemsFromIds(itemIds: string[]): Promise<ItemType[]> {
    const { data, error } = await supabase
        .from('item')
        .select('*')
        .in('id', itemIds);

    if (error) {
        console.error('Error: getItemsFromIds ', error);

        return [];
    }

    const order = new Map<string, number>(itemIds.map((id, i) => [id, i])); // map id to order

    // the order is gonna messed up if not sorted using order
    return data
        .map(({ id, url, description }) => {
            return { id, url, description };
        })
        .sort((a, b) => order.get(a.id)! - order.get(b.id)!);
}

export async function deleteTierList(tierListId: string): Promise<boolean> {
    const { error } = await supabase
        .from('tier_list')
        .delete()
        .eq('id', tierListId);

    if (error) {
        console.error('Error: deleteTierList ', error);

        return false;
    }

    return true;
}

export async function getCommunityLists(
    templateId: string
): Promise<TierListType[]> {
    const { data, error } = await supabase
        .from('tier_list')
        .select('*')
        .eq('template_id', templateId);

    if (error) {
        console.error('Error: getCommunityLists ', error);

        return [];
    }

    return data;
}

export async function uploadScreenshot(blob: Blob): Promise<string | null> {
    const { data, error } = await supabase.storage
        .from('screenshots')
        .upload(`${uuidv4()}.jpg`, blob);

    if (error) {
        console.error('Error: uploadFile ', error);

        return null;
    }

    return data.path;
}

export async function deleteScreenshot(path: string): Promise<void> {
    const { error } = await supabase.storage.from('screenshots').remove([path]);

    if (error) {
        console.error('Error: deleteScreenshot ', error);
    }
}

export async function retrieveScreenshotUrl(path: string): Promise<string> {
    const { data } = supabase.storage.from('screenshots').getPublicUrl(path);

    return data.publicUrl;
}
