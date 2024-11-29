import { TierListType } from '@/types';
import { getItemsFromIds, getTierList } from '@/app/lib/utils';
import TierList from '@/components/TierList';
import UserInfo from '@/components/UserInfo';

export const fetchCache = 'force-no-store';

export default async function Page({ params }: { params: { listId: string } }) {
    const tierList: TierListType | null = await getTierList(params.listId);

    if (!tierList) {
        return <></>;
    }

    const initS = await getItemsFromIds(tierList.s);
    const initA = await getItemsFromIds(tierList.a);
    const initB = await getItemsFromIds(tierList.b);
    const initC = await getItemsFromIds(tierList.c);
    const initF = await getItemsFromIds(tierList.f);
    const initNotRated = await getItemsFromIds(tierList.not_rated);

    return (
        <>
            <UserInfo userId={tierList.user_id} />
            <section>
                <TierList
                    userId={tierList.user_id}
                    tierListId={tierList.id}
                    templateId={tierList.template_id}
                    title={tierList.title}
					screenshotPath={tierList.screenshot_path}
                    initS={initS}
                    initA={initA}
                    initB={initB}
                    initC={initC}
                    initF={initF}
                    initNotRated={initNotRated}
                />
            </section>
        </>
    );
}
