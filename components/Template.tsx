import { TemplateType } from '@/types';
import Link from 'next/link';

export default function Template({ template }: { template: TemplateType }) {
  return (
    <Link className="w-48 h-48 relative block" href={`/create/${template.id}`}>
      <img className="h-full object-cover" src={template.poster} />
      <h2 className="bg-black opacity-85 absolute bottom-0 left-0 text-center">
        {template.title}
      </h2>
    </Link>
  );
}
