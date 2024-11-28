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
        <a className='relative block h-40 w-40 shrink-0' href={link}>
            <img className='h-full w-full object-cover' src={poster} />
            <div className='absolute bottom-0 left-0 w-full bg-black py-1 text-center opacity-85'>
                {title}
            </div>
        </a>
    );
}
