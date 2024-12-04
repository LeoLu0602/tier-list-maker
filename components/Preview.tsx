import Link from 'next/link';

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
            <Link href={link}>
                <img
                    className='h-72 w-full object-cover object-left-top'
                    src={poster}
                />
                <section className='w-full overflow-hidden text-ellipsis whitespace-nowrap bg-black p-4'>
                    {title}
                </section>
            </Link>
        </section>
    );
}
