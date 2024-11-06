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
    <a className="w-48 h-48 relative block hover:rotate-3" href={link}>
      <img className="h-full w-full object-cover" src={poster} />
      <h2 className="bg-black opacity-85 absolute bottom-0 left-0 w-full py-1 text-center">
        {title}
      </h2>
    </a>
  );
}
