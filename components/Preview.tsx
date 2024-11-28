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
        <section className='w-1/2 p-1'>
            <a href={link}>
                <img className='h-60 w-full object-left-top' src={poster} />
                <div className='w-full overflow-hidden text-ellipsis whitespace-nowrap bg-black p-4'>
                    {title}
                </div>
            </a>
        </section>
    );
}
