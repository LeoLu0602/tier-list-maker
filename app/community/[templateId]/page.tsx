export const fetchCache = 'force-no-store';

export default async function Page({
  params,
}: {
  params: { templateId: string };
}) {
  return (
    <>
      <section className="mt-16 flex flex-wrap gap-4"></section>
    </>
  );
}
