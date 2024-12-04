import Link from 'next/link';
import { getUserInfo } from '@/app/lib/utils';

export default async function UserInfo({ userId }: { userId: string }) {
    const userInfo = await getUserInfo(userId);

    return (
        <section className='mb-8 flex items-center gap-4'>
            <img className='h-14 w-14 rounded-full' src={userInfo!.avatarUrl} />
            <Link
                className='text-2xl font-bold'
                href={`/user/${userInfo!.userId}`}
            >
                {userInfo!.name}
            </Link>
        </section>
    );
}
