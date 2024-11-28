import { Dispatch, SetStateAction } from 'react';
import { ReactSortable } from 'react-sortablejs';
import clsx from 'clsx';
import { ItemType } from '@/types';

export default function TierListBox({
    items,
    setItems,
    tier,
    color,
    disabled,
}: {
    items: ItemType[];
    setItems: Dispatch<SetStateAction<ItemType[]>>;
    tier: string;
    color: string;
    disabled: boolean;
}) {
    return (
        <section
            className={clsx('relative', {
                'border-b-2 border-b-[#040404] pl-20': tier !== 'not-rated',
            })}
        >
            {tier !== 'not-rated' && (
                <div
                    className='absolute left-0 top-0 flex h-full w-20 items-center justify-center text-black'
                    style={{ backgroundColor: color }}
                >
                    {tier}
                </div>
            )}
            <ReactSortable
                className={clsx('box-border flex min-h-24 flex-wrap', {
                    'bg-[#1a1a17]': tier !== 'not-rated',
                })}
                list={items}
                setList={setItems}
                group='shared'
                animation={100}
                disabled={disabled}
            >
                {items.map(({ id, url, description }) => (
                    <img
                        className='h-24'
                        key={id}
                        src={url}
                        alt={description}
                    />
                ))}
            </ReactSortable>
        </section>
    );
}
