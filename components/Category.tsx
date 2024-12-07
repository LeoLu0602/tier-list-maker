import { CategoryType, TemplateType } from '@/types';
import { getTemplateByCategory } from '@/app/lib/utils';
import Template from '@/components/Template';

export const fetchCache = 'force-no-store';

export default async function Category({ id, title }: CategoryType) {
    const templates: TemplateType[] = await getTemplateByCategory(id);

    return (
        <section className='my-8'>
            <h2 className='mb-4 text-xl font-bold text-white'>
                Featured {title} Templates
            </h2>
            <section className='flex gap-2 overflow-auto'>
                {templates.map(({ id, poster, title }) => (
                    <Template
                        key={id}
                        link={`/create/${id}`}
                        poster={poster}
                        title={title}
                    />
                ))}
            </section>
        </section>
    );
}
