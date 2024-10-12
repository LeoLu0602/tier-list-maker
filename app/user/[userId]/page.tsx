import { getUserInfo, getUserTemplates } from '@/app/lib/utils';
import SignOutBtn from '@/components/SignOutBtn';
import Template from '@/components/Template';

export default async function Page({ params }: { params: { userId: string } }) {
  const userInfo = await getUserInfo(params.userId);
  const templates: { template_id: string; title: string; poster: string }[] =
    await getUserTemplates(params.userId);

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
        {templates.map(({ template_id: id, title, poster }) => (
          <Template
            key={id}
            template={{
              id,
              title,
              poster,
            }}
          />
        ))}
      </section>
    </>
  );
}
