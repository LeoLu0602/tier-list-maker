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
  poster,
  initS,
  initA,
  initB,
  initC,
  initF,
  initNotRated,
  disabled,
}: {
  templateId: string;
  title: string;
  poster: string;
  initS: ItemType[];
  initA: ItemType[];
  initB: ItemType[];
  initC: ItemType[];
  initF: ItemType[];
  initNotRated: ItemType[];
  disabled: boolean;
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
      handleUserSave();
    } else {
      handleGuestSave();
    }
  }

  async function handleUserSave() {
    setIsSaving(true); // disable save button temporarily

    const saved: boolean = await saveTierList({
      template_id: templateId,
      user_id: auth!.userId,
      s: s.map(({ id }) => id),
      a: a.map(({ id }) => id),
      b: b.map(({ id }) => id),
      c: c.map(({ id }) => id),
      f: f.map(({ id }) => id),
      not_rated: notRated.map(({ id }) => id),
      title,
      poster,
    });

    setIsSaving(false); // enable save button

    if (saved) {
      router.push(`/user/${auth!.userId}`);
    }
  }

  async function handleGuestSave() {
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
      } = JSON.parse(unsavedTierListString);

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
      <TierListBox
        items={s}
        setItems={setS}
        tier="S"
        color="#ff7f7f"
        disabled={disabled}
      />
      <TierListBox
        items={a}
        setItems={setA}
        tier="A"
        color="#ffbf7f"
        disabled={disabled}
      />
      <TierListBox
        items={b}
        setItems={setB}
        tier="B"
        color="#ffdf7f"
        disabled={disabled}
      />
      <TierListBox
        items={c}
        setItems={setC}
        tier="C"
        color="#ffff7f"
        disabled={disabled}
      />
      <TierListBox
        items={f}
        setItems={setF}
        tier="F"
        color="#7fffff"
        disabled={disabled}
      />
      <div className="h-8" />
      <TierListBox
        items={notRated}
        setItems={setNotRated}
        tier="not-rated"
        color=""
        disabled={disabled}
      />
      <div className="h-8" />
      {!disabled && (
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
      )}
    </>
  );
}
