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
    { id: 1, url: '/Bill.jpg', description: 'Bill' },
    { id: 2, url: '/Blandin.jpg', description: 'Blandin' },
    { id: 3, url: '/Blubs.jpg', description: 'Blubs' },
    { id: 4, url: '/Candy.jpg', description: 'Candy' },
    { id: 5, url: '/Dipper.jpg', description: 'Dipper' },
    { id: 6, url: '/Ford.jpg', description: 'Ford' },
    { id: 7, url: '/Gideon.jpg', description: 'Gideon' },
    { id: 8, url: '/Grenda.jpg', description: 'Grenda' },
    { id: 9, url: '/Lazy Susan.jpg', description: 'Lazy Susan' },
    { id: 10, url: '/Mabel.jpg', description: 'Mabel' },
    { id: 11, url: '/McGucket.jpg', description: 'McGucket' },
    { id: 12, url: '/Multi-Bear.jpg', description: 'Multi-Bear' },
    { id: 13, url: '/Pacifica.jpg', description: 'Pacifica' },
    { id: 14, url: '/Robbie.jpg', description: 'Robbie' },
    { id: 15, url: '/Soos.jpg', description: 'Soos' },
    { id: 16, url: '/Stan.jpg', description: 'Stan' },
    { id: 17, url: '/Time Baby.jpg', description: 'Time Baby' },
    { id: 18, url: '/Tyler.jpg', description: 'Tyler' },
    { id: 19, url: '/Waddles.jpg', description: 'Waddles' },
    { id: 20, url: '/Wendy.jpg', description: 'Wendy' },
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
