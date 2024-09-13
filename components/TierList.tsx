'use client';

import { useState } from 'react';
import { AuthType, ItemType } from '@/types';
import { saveTierList } from '@/app/lib/utils';
import { useAuth } from '@/app/contexts/AuthContext';
import TierListBox from './TierListBox';

export default function TierList({
  templateId,
  title,
  initS,
  initA,
  initB,
  initC,
  initF,
  initNotRated,
}: {
  templateId: string;
  title: string;
  initS: ItemType[];
  initA: ItemType[];
  initB: ItemType[];
  initC: ItemType[];
  initF: ItemType[];
  initNotRated: ItemType[];
}) {
  const [s, setS] = useState<ItemType[]>(initS);
  const [a, setA] = useState<ItemType[]>(initA);
  const [b, setB] = useState<ItemType[]>(initB);
  const [c, setC] = useState<ItemType[]>(initC);
  const [f, setF] = useState<ItemType[]>(initF);
  const [notRated, setNotRated] = useState<ItemType[]>(initNotRated);
  const auth: AuthType | null = useAuth();

  function stringifyBox(box: ItemType[]): string {
    return JSON.stringify(
      /* 
        Under the hood of ReactSortable, some unwanted properties are added.
        A filter is set to clean up.
      */
      box.map(({ id, url, description }) => {
        return { id, url, description };
      })
    );
  }

  return (
    <>
      <h1 className="mb-8 font-bold text-4xl">{title}</h1>
      <TierListBox items={s} setItems={setS} tier="S" color="#ff7f7f" />
      <TierListBox items={a} setItems={setA} tier="A" color="#ffbf7f" />
      <TierListBox items={b} setItems={setB} tier="B" color="#ffdf7f" />
      <TierListBox items={c} setItems={setC} tier="C" color="#ffff7f" />
      <TierListBox items={f} setItems={setF} tier="F" color="#7fffff" />
      <div className="h-8" />
      <TierListBox
        items={notRated}
        setItems={setNotRated}
        tier="not-rated"
        color=""
      />
      <div className="h-8" />
      <div className="flex justify-center">
        <button
          className="bg-[#3a5795] w-60 py-1 rounded-md hover:bg-[#3a5795b3]"
          onClick={() => {
            if (auth) {
              saveTierList({
                template_id: templateId,
                user_id: auth.userId,
                s: stringifyBox(s),
                a: stringifyBox(a),
                b: stringifyBox(b),
                c: stringifyBox(c),
                f: stringifyBox(f),
                not_rated: stringifyBox(notRated),
              });
            }
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
