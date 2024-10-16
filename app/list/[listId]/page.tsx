import { TierListType } from '@/types';
import { getItemsFromIds, getTierList } from '@/app/lib/utils';
import TierList from '@/components/TierList';

export default async function Page({ params }: { params: { listId: string } }) {
  const tierList: TierListType | null = await getTierList(params.listId);

  if (!tierList) {
    return <></>;
  }

  const { template_id: templateId, title, poster } = tierList;
  const initS = await getItemsFromIds(tierList.s);
  const initA = await getItemsFromIds(tierList.a);
  const initB = await getItemsFromIds(tierList.b);
  const initC = await getItemsFromIds(tierList.c);
  const initF = await getItemsFromIds(tierList.f);
  const initNotRated = await getItemsFromIds(tierList.not_rated);

  return (
    <>
      <section>
        {tierList && (
          <TierList
            templateId={templateId}
            title={title}
            poster={poster}
            initS={initS}
            initA={initA}
            initB={initB}
            initC={initC}
            initF={initF}
            initNotRated={initNotRated}
            disabled={true}
          />
        )}
      </section>
    </>
  );
}
