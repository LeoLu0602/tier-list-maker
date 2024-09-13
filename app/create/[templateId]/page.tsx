import { getTemplateItems, getTemplateTitle } from '@/app/lib/utils';
import { ItemType } from '@/types';
import TierList from '@/components/TierList';

export default async function Page({
  params,
}: {
  params: { templateId: string };
}) {
  const templateTitle: string = await getTemplateTitle();
  const templateItems: ItemType[] = await getTemplateItems(params.templateId);

  return (
    <>
      <main>
        <TierList
          templateId={params.templateId}
          title={templateTitle}
          initS={[]}
          initA={[]}
          initB={[]}
          initC={[]}
          initF={[]}
          initNotRated={templateItems}
        />
      </main>
    </>
  );
}
