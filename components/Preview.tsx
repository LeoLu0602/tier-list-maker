export default function Preview({
    link,
    poster,
    title,
}: {
    link: string;
    poster: string;
    title: string;
}) {
    return (
        <section className='w-full p-1 lg:w-1/2'>
            <a href={link}>
                <img
                    className='h-72 w-full object-cover object-left-top'
                    src={poster}
                />
                <section className='w-full overflow-hidden text-ellipsis whitespace-nowrap bg-black p-4'>
                    {title}
                </section>
            </a>
        </section>
    );
}
