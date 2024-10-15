export default function Page({ params }: { params: { listId: string } }) {
  return <>{params.listId}</>;
}
