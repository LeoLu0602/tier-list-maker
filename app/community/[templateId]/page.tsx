import Link from 'next/link';
import { getCommunityLists, getTemplate } from '@/app/lib/utils';
import { TemplateType, TierListType } from '@/types';
import Preview from '@/components/Preview';

export const fetchCache = 'force-no-store';

export default async function Page({
    params,
}: {
    params: { templateId: string };
}) {
    const template: TemplateType | null = await getTemplate(params.templateId);
    const communityLists: TierListType[] = await getCommunityLists(
        params.templateId
    );

    communityLists.sort(
        (a, b) => Date.parse(b.created_at!) - Date.parse(a.created_at!)
    );

    return (
        <>
            {template && (
                <Link
                    className='text-3xl font-bold'
                    href={`/create/${template.id}`}
                >
                    {template.title} Tier Lists
                </Link>
            )}
            <section className='mt-16 flex flex-wrap justify-between'>
                {communityLists.map(({ id, preview, title }) => (
                    <Preview
                        key={id}
                        link={`/list/${id}`}
                        poster={preview}
                        title={title}
                    />
                ))}
            </section>
        </>
    );
}
