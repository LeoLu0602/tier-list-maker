import {
  getTemplate,
  getTemplateItems,
} from '@/app/lib/utils';
import { ItemType } from '@/types';
import TierList from '@/components/TierList';

export default async function Page({
  params,
}: {
  params: { templateId: string };
}) {
  const { title, poster }: { title: string; poster: string } =
    (await getTemplate(params.templateId)) ?? {
      title: '',
      poster: '',
    };
  const templateItems: ItemType[] = await getTemplateItems(params.templateId);

  return (
    <>
      <section>
        <TierList
          templateId={params.templateId}
          title={title}
          poster={poster}
          initS={[]}
          initA={[]}
          initB={[]}
          initC={[]}
          initF={[]}
          initNotRated={templateItems}
          disabled={false}
        />
      </section>
    </>
  );
}
