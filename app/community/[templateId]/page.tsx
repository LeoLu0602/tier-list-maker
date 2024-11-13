import { getCommunityLists } from '@/app/lib/utils';
import Template from '@/components/Template';

export const fetchCache = 'force-no-store';

export default async function Page({
  params,
}: {
  params: { templateId: string };
}) {
  const communityLists: {
    id: string;
    created_at: number;
    name: string;
    avatar: string;
  }[] = await getCommunityLists(params.templateId);

  communityLists.sort((a, b) => b.created_at - a.created_at);

  return (
    <>
      <section className="mt-16 flex flex-wrap gap-4">
        {communityLists.map(({ id, name, avatar }) => (
          <a
            className="flex flex-col justify-between items-center w-32 h-32"
            href={`/list/${id}`}
          >
            <img className="rounded-full w-24 h-24" src={avatar} />
            <h2 className="w-full text-base text-center text-ellipsis overflow-hidden whitespace-nowrap">
              {name}
            </h2>
          </a>
        ))}
      </section>
    </>
  );
}
