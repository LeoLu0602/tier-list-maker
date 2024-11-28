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
        <section className='lg:w-1/2 w-full p-1'>
            <a href={link}>
                <img className='w-full h-72 object-left-top object-cover' src={poster} />
                <div className='w-full overflow-hidden text-ellipsis whitespace-nowrap bg-black p-4'>
                    {title}
                </div>
            </a>
        </section>
    );
}
