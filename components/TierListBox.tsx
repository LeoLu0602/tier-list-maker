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
        'pl-20 border-b-2 border-b-[#040404]': tier !== 'not-rated',
      })}
    >
      {tier !== 'not-rated' && (
        <div
          className="flex justify-center items-center w-20 absolute left-0 top-0 h-full text-black"
          style={{ backgroundColor: color }}
        >
          {tier}
        </div>
      )}
      <ReactSortable
        className={clsx('flex flex-wrap min-h-20 box-border', {
          'bg-[#1a1a17]': tier !== 'not-rated',
        })}
        list={items}
        setList={setItems}
        group="shared"
        animation={100}
        disabled={disabled}
      >
        {items.map(({ id, url, description }) => (
          <img className="h-20" key={id} src={url} alt={description} />
        ))}
      </ReactSortable>
    </section>
  );
}
