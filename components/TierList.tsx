'use client';

import { useState } from 'react';
import { ItemType } from '@/types';
import TierListBox from './TierListBox';

export default function TierList({ tierListId }: { tierListId: string }) {
  const [tierListTitle, setTierListTitle] = useState<string>(
    'Gravity Falls Characters Tier List'
  );

  const [s, setS] = useState<ItemType[]>([]);
  const [a, setA] = useState<ItemType[]>([]);
  const [b, setB] = useState<ItemType[]>([]);
  const [c, setC] = useState<ItemType[]>([]);
  const [f, setF] = useState<ItemType[]>([]);
  const [notRated, setNotRated] = useState<ItemType[]>([
    { id: 1, link: '/Bill.jpg', description: 'Bill' },
    { id: 2, link: '/Blandin.jpg', description: 'Blandin' },
    { id: 3, link: '/Blubs.jpg', description: 'Blubs' },
    { id: 4, link: '/Candy.jpg', description: 'Candy' },
    { id: 5, link: '/Dipper.jpg', description: 'Dipper' },
    { id: 6, link: '/Ford.jpg', description: 'Ford' },
    { id: 7, link: '/Gideon.jpg', description: 'Gideon' },
    { id: 8, link: '/Grenda.jpg', description: 'Grenda' },
    { id: 9, link: '/Lazy Susan.jpg', description: 'Lazy Susan' },
    { id: 10, link: '/Mabel.jpg', description: 'Mabel' },
    { id: 11, link: '/McGucket.jpg', description: 'McGucket' },
    { id: 12, link: '/Multi-Bear.jpg', description: 'Multi-Bear' },
    { id: 13, link: '/Pacifica.jpg', description: 'Pacifica' },
    { id: 14, link: '/Robbie.jpg', description: 'Robbie' },
    { id: 15, link: '/Soos.jpg', description: 'Soos' },
    { id: 16, link: '/Stan.jpg', description: 'Stan' },
    { id: 17, link: '/Time Baby.jpg', description: 'Time Baby' },
    { id: 18, link: '/Tyler.jpg', description: 'Tyler' },
    { id: 19, link: '/Waddles.jpg', description: 'Waddles' },
    { id: 20, link: '/Wendy.jpg', description: 'Wendy' },
  ]);

  return (
    <>
      <h1 className="mb-8 font-bold text-4xl">{tierListTitle}</h1>
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
