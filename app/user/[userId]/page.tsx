import { getUserInfo } from '@/app/lib/utils';
import SignOutBtn from '@/components/SignOutBtn';
import Template from '@/components/Template';

export default async function Page({ params }: { params: { userId: string } }) {
  const userInfo = await getUserInfo(params.userId);
  // const tierLists

  return (
    <>
      <section className="flex gap-4 h-20 items-center">
        <img
          className="w-20 h-20 rounded-full"
          src={userInfo?.avatarUrl ?? ''}
        />
        <div className="flex flex-col items-start justify-between h-full">
          <h2 className="font-bold text-4xl">{userInfo?.name ?? ''}</h2>
          <SignOutBtn userId={params.userId} />
        </div>
      </section>
      <section className="mt-16">

      </section>
    </>
  );
}
