import { getUserInfo, getUserTierLists } from '@/app/lib/utils';
import SignOutBtn from '@/components/SignOutBtn';
import Preview from '@/components/Preview';

export const fetchCache = 'force-no-store';

export default async function Page({ params }: { params: { userId: string } }) {
    const userInfo = await getUserInfo(params.userId);
    const tierLists: {
        id: string;
        created_at: number;
        title: string;
        preview: string;
    }[] = await getUserTierLists(params.userId);

    tierLists.sort((a, b) => b.created_at - a.created_at);

    return (
        <>
            <section className='flex h-20 items-center gap-8'>
                <img
                    className='h-20 w-20 rounded-full'
                    src={userInfo?.avatarUrl ?? ''}
                />
                <div className='flex h-full flex-col items-start justify-between'>
                    <h2 className='text-4xl font-bold'>
                        {userInfo?.name ?? ''}
                    </h2>
                    <SignOutBtn userId={params.userId} />
                </div>
            </section>
            <section className='mt-16 flex flex-wrap justify-between'>
                {tierLists.map(({ id, title, preview }) => (
                    <Preview
                        key={id}
                        link={`/list/${id}`}
                        poster={preview}
                        title={title}
                    />
                ))}
            </section>
        </>
    );
}
