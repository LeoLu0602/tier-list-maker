import { getAllCategories, getAllTemplates } from '@/app/lib/utils';
import { TemplateType } from '@/types';
import Template from '@/components/Template';
import Category from '@/components/Category';

export const fetchCache = 'force-no-store';

export default async function Page() {
    const categories: string[] = await getAllCategories();
    const templates: TemplateType[] = await getAllTemplates();

    return (
        <>
            <h1 className='mb-4 animate-fadeIn text-4xl font-bold'>
                Create a Tier List for Anything
            </h1>
            <p className='mb-8 animate-fadeIn text-base text-[#bababa]'>
                A tier list is a ranking system that allows you to rank anything
                in tiers from the best to worst. Using a tier list allows you to
                group similar ranked items together and it’s quick and easy to
                create a tier list. Tier List Maker is inspired by&nbsp;
                <a
                    className='text-sky-500'
                    href='https://tiermaker.com/'
                    target='_blank'
                >
                    TierMaker
                </a>
                .
            </p>
            <h3 className='mb-4 text-xl font-bold text-white'>
                Featured Templates
            </h3>
            {categories.map((categoryId) => (
                <Category id={categoryId} />
            ))}
        </>
    );
}
