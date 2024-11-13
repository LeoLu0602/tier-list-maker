export default function Page({ params }: { params: { templateId: string } }) {
  return <>{params.templateId}</>;
}
