import { getTemplate, getTemplateItems } from '@/app/lib/utils';
import { ItemType, TemplateType } from '@/types';
import TierList from '@/components/TierList';

export const fetchCache = 'force-no-store';

export default async function Page({
    params,
}: {
    params: { templateId: string };
}) {
    const template: TemplateType | null = await getTemplate(params.templateId);
    const templateItems: ItemType[] = await getTemplateItems(params.templateId);

    if (!template) {
        return <></>;
    }

    return (
        <TierList
            templateId={params.templateId}
            title={template.title}
            initS={[]}
            initA={[]}
            initB={[]}
            initC={[]}
            initF={[]}
            initNotRated={templateItems}
        />
    );
}
