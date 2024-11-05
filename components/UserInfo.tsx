import { getUserInfo } from '@/app/lib/utils';

export default async function UserInfo({ userId }: { userId: string }) {
  const userInfo = await getUserInfo(userId);

  return (
    <section className="flex gap-4 items-center mb-8">
      <img
        className="w-14 h-14 rounded-full"
        src={userInfo?.avatarUrl ?? '/person.svg'}
      />
      <h2 className="font-bold text-2xl">{userInfo?.name ?? ''}</h2>
    </section>
  );
}
