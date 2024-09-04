'use client';

import { useState } from 'react';
import { ItemType } from '@/types';
import TierListBox from './TierListBox';

export default function TierList({
  title,
  initS,
  initA,
  initB,
  initC,
  initF,
  initNotRated,
}: {
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
    </>
  );
}
