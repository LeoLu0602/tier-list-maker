import TierList from '@/components/TierList';

export default function Page({ params }: { params: { tierListId: string } }) {
  return (
    <>
      <main>
        <h1 className="mb-8 font-bold text-white text-4xl">
          Gravity Falls Characters Tier List
        </h1>
        <TierList />
      </main>
    </>
  );
}
