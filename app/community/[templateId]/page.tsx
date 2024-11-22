import { getCommunityLists, getTemplate } from '@/app/lib/utils';
import Template from '@/components/Template';
import { TemplateType } from '@/types';

export const fetchCache = 'force-no-store';

export default async function Page({
  params,
}: {
  params: { templateId: string };
}) {
  const template: TemplateType | null = await getTemplate(params.templateId);
  const communityLists: {
    id: string;
    created_at: number;
    name: string;
    avatar: string;
  }[] = await getCommunityLists(params.templateId);

  communityLists.sort((a, b) => b.created_at - a.created_at);

  return (
    <>
      {template && (
        <a className="font-bold text-4xl" href={`/create/${template.id}`}>
          {`${template.title}s (${communityLists.length})`}
        </a>
      )}
      <section className="mt-16 flex flex-wrap gap-8">
        {communityLists.map(({ id, name, avatar }) => (
          <a
            className="flex flex-col justify-between items-center w-32 h-32"
            key={id}
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
