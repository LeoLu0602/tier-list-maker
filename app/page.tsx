import { getAllTemplates } from '@/app/lib/utils';
import { TemplateType } from '@/types';
import Template from '@/components/Template';

export default async function Page() {
  const templates: TemplateType[] = await getAllTemplates();

  return (
    <>
      <section className="flex flex-wrap gap-4">
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
