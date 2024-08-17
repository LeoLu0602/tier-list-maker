import TierList from '@/components/TierList';

export default function Page({ params }: { params: { tierListId: string } }) {
  return (
    <>
      <main>
        <TierList tierListId={params.tierListId} />
      </main>
    </>
  );
}
