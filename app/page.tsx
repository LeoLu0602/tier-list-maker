import { getAllCategories } from '@/app/lib/utils';
import { CategoryType } from '@/types';
import Category from '@/components/Category';

export const fetchCache = 'force-no-store';

export default async function Page() {
    const categories: CategoryType[] = await getAllCategories();

    return (
        <>
            <h1 className='mb-4 animate-fadeIn text-4xl font-bold'>
                Create a Tier List for Anything
            </h1>
            <p className='animate-fadeIn text-base text-[#bababa]'>
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
            {categories.map(({ id, title }) => (
                <Category id={id} title={title} />
            ))}
        </>
    );
}
