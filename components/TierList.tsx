'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { AuthType, ItemType } from '@/types';
import { saveTierList, signInWithGoogle } from '@/app/lib/utils';
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
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const auth: AuthType | null = useAuth();
  const router: AppRouterInstance = useRouter();

  async function handleSave(): Promise<void> {
    if (auth) {
      setIsSaving(true); // disable save button temporarily

      const saved: boolean = await saveTierList({
        template_id: templateId,
        user_id: auth.userId,
        s: JSON.stringify(s),
        a: JSON.stringify(a),
        b: JSON.stringify(b),
        c: JSON.stringify(c),
        f: JSON.stringify(f),
        not_rated: JSON.stringify(notRated),
      });

      setIsSaving(false); // enable save button

      if (saved) {
        router.push(`/user/${auth.userId}`);
      }

      return;
    }

    // user not signed in

    localStorage.setItem(
      'unsaved tier list',
      JSON.stringify({
        templateId,
        s,
        a,
        b,
        c,
        f,
        notRated,
      })
    );

    await signInWithGoogle(`${window.location.origin}/create/${templateId}`);
  }

  useEffect(() => {
    const unsavedTierListString: string | null =
      localStorage.getItem('unsaved tier list');

    if (unsavedTierListString) {
      const unsavedTierList: {
        templateId: string;
        s: ItemType[];
        a: ItemType[];
        b: ItemType[];
        c: ItemType[];
        f: ItemType[];
        notRated: ItemType[];
      } = unsavedTierListString
        ? JSON.parse(unsavedTierListString)
        : {
            templateId: templateId,
            s: [],
            a: [],
            b: [],
            c: [],
            f: [],
            notRated: [],
          };
      
      // retrieve unsaved tier list
      if (templateId === unsavedTierList.templateId) {
        setS(unsavedTierList.s);
        setA(unsavedTierList.a);
        setB(unsavedTierList.b);
        setC(unsavedTierList.c);
        setF(unsavedTierList.f);
        setNotRated(unsavedTierList.notRated);
        localStorage.removeItem('unsaved tier list');
      }
    }
  }, []);

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
          disabled={isSaving}
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
