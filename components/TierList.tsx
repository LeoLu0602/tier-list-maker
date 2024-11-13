'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AuthType, ItemType, TierListType } from '@/types';
import {
  deleteTierList,
  getUserInfo,
  saveTierList,
  signInWithGoogle,
} from '@/app/lib/utils';
import { useAuth } from '@/app/contexts/AuthContext';
import TierListBox from '@/components/TierListBox';
import Msg from '@/components/Msg';

export default function TierList({
  userId = '', // userId is set to '' in /create
  tierListId = '', // tierListId is set to '' in /create
  templateId,
  title,
  poster,
  initS,
  initA,
  initB,
  initC,
  initF,
  initNotRated,
}: {
  userId?: string;
  tierListId?: string;
  templateId: string;
  title: string;
  poster: string;
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
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const auth: AuthType | null = useAuth();
  const pathname: string = usePathname();
  const isCreatePage: boolean = pathname.startsWith('/create');
  const isListPage: boolean = pathname.startsWith('/list');
  const isListOwner: boolean =
    isListPage && auth !== null && auth.userId === userId;
  const allowSave: boolean = isCreatePage || isListOwner;
  const allowDelete: boolean = isListOwner;
  const disabled: boolean = !allowSave;

  async function handleSave(): Promise<void> {
    if (auth) {
      handleUserSave();
    } else {
      handleGuestSave();
    }
  }

  async function handleUserSave(): Promise<void> {
    setIsProcessing(true); // disable save button temporarily

    const toBeSaved: TierListType = {
      template_id: templateId,
      user_id: auth!.userId,
      user_avatar: auth!.avatarUrl,
      user_name: auth!.name,
      s: s.map(({ id }) => id),
      a: a.map(({ id }) => id),
      b: b.map(({ id }) => id),
      c: c.map(({ id }) => id),
      f: f.map(({ id }) => id),
      not_rated: notRated.map(({ id }) => id),
      title,
      poster,
    };

    // Update existing tier list
    if (tierListId !== '') {
      toBeSaved.id = tierListId;
    }

    const saved: boolean = await saveTierList(toBeSaved);

    setIsProcessing(false); // enable save button

    if (saved) {
      if (isCreatePage) {
        location.replace(`/user/${auth!.userId}`);
      } else {
        setShowMsg(true);
        setTimeout(() => {
          setShowMsg(false);
        }, 1000);
      }
    }
  }

  async function handleGuestSave(): Promise<void> {
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

  async function handleDelete(): Promise<void> {
    if (!confirm('Are you sure you want to delete this list?')) {
      return; // Cancel
    }

    // OK
    setIsProcessing(true);

    // allowDelete is true => isListOwner is true => isListPage is true => tierListId !== ''
    const deleted: boolean = await deleteTierList(tierListId);

    setIsProcessing(false);

    if (deleted) {
      location.replace(`/user/${auth!.userId}`);
    } else {
      alert('Deletion failed!');
    }
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
      {showMsg && <Msg msg="Saved!" />}
      <h1 className="mb-8 font-bold text-4xl hover:text-sky-500">
        <a href={`/community/${templateId}`}>{title}</a>
      </h1>
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
            disabled={isProcessing}
            onClick={() => {
              handleSave();
            }}
          >
            Save
          </button>
        </div>
      )}
      {allowDelete && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-red-500 w-60 py-1 rounded-md hover:bg-red-600"
            disabled={isProcessing}
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
}
