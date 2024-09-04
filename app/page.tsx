import Link from 'next/link';
import { getTemplates } from '@/app/lib/utils';
import { TemplateType } from '@/types';

export default async function Page() {
  const templates: TemplateType[] = await getTemplates();

  return (
    <>
      <section>
        {templates.map((template) => (
          <Link
            className="w-48 h-48 relative block"
            key={template.id}
            href={`/create/${template.id}`}
          >
            <img className="h-full object-cover" src={template.poster} />
            <h2 className="bg-black opacity-85 absolute bottom-0 left-0 text-center">
              {template.title}
            </h2>
          </Link>
        ))}
      </section>
    </>
  );
}
