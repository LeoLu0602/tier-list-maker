import { getTierList } from '@/app/lib/utils';
import TierList from '@/components/TierList';

export default async function Page({ params }: { params: { listId: string } }) {
  const tierList = await getTierList(params.listId);

  return (
    <>
      <section></section>
    </>
  );
}
