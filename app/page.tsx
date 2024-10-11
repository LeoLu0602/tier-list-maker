import { getAllTemplates } from '@/app/lib/utils';
import { TemplateType } from '@/types';
import Template from '@/components/Template';

export default async function Page() {
  const templates: TemplateType[] = await getAllTemplates();

  return (
    <>
      <section>
        {templates.map((template) => (
          <Template template={template} />
        ))}
      </section>
    </>
  );
}
