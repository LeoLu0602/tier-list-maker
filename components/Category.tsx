import { TemplateType } from '@/types';
import Template from '@/components/Template';

export default function Category() {
    const templates: TemplateType[] = [];

    return (
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
    );
}
