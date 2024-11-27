import { getAllTemplates } from '@/app/lib/utils';
import { TemplateType } from '@/types';
import Template from '@/components/Template';

export const fetchCache = 'force-no-store';

export default async function Page() {
  const templates: TemplateType[] = await getAllTemplates();

  return (
    <>
      <h1 className="font-bold text-4xl mb-4 animate-fadeIn">
        Create a Tier List for Anything
      </h1>
      <h2 className="mb-8 text-[#bababa] animate-fadeIn text-base leading-8">
        A tier list is a ranking system that allows you to rank anything in
        tiers from the best to worst. Using a tier list allows you to group
        similar ranked items together and it’s quick and easy to create a tier
        list.
      </h2>
      <h3 className="text-white font-bold mb-4 text-xl">Featured Templates</h3>
      <section className="flex gap-2 overflow-auto">
        {templates.map(({ id, poster, title }) => (
          <Template
            key={id}
            link={`/create/${id}`}
            poster={poster}
            title={title}
          />
        ))}
      </section>
    </>
  );
}
