import { TemplateType } from '@/types';
import Link from 'next/link';

export default function Template({
  link,
  poster,
  title,
}: {
  link: string;
  poster: string;
  title: string;
}) {
  return (
    <Link className="w-48 h-48 relative block" href={link}>
      <img className="h-full object-cover" src={poster} />
      <h2 className="bg-black opacity-85 absolute bottom-0 left-0 text-center">
        {title}
      </h2>
    </Link>
  );
}
