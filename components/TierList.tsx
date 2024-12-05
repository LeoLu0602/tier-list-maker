'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { toJpeg } from 'html-to-image';
import clsx from 'clsx';
import { AuthType, ItemType, TierListType } from '@/types';
import {
    deleteTierList,
    saveTierList,
    signInWithGoogle,
    uploadScreenshot,
    retrieveScreenshotUrl,
    deleteScreenshot,
} from '@/app/lib/utils';
import { useAuth } from '@/app/contexts/AuthContext';
import TierListBox from '@/components/TierListBox';

export default function TierList({
    userId = null, // userId is not provided from /create
    tierListId = null, // tierListId is not provided from /create
    templateId,
    title,
    screenshotPath = null, // screenshotPath is not provided from /create
    initS,
    initA,
    initB,
    initC,
    initF,
    initNotRated,
}: {
    userId?: string | null;
    tierListId?: string | null;
    templateId: string;
    title: string;
    screenshotPath?: string | null;
    initS: ItemType[];
    initA: ItemType[];
    initB: ItemType[];
    initC: ItemType[];
    initF: ItemType[];
    initNotRated: ItemType[];
}) {
    const ref = useRef(null);
    const [s, setS] = useState<ItemType[]>(initS);
    const [a, setA] = useState<ItemType[]>(initA);
    const [b, setB] = useState<ItemType[]>(initB);
    const [c, setC] = useState<ItemType[]>(initC);
    const [f, setF] = useState<ItemType[]>(initF);
    const [notRated, setNotRated] = useState<ItemType[]>(initNotRated);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const auth: AuthType | null = useAuth();
    const pathname: string = usePathname();
    const isCreatePage: boolean = pathname.startsWith('/create');
    const isListPage: boolean = pathname.startsWith('/list');
    const isListOwner: boolean =
        isListPage && auth !== null && auth.userId === userId;
    const disabled: boolean = !(isCreatePage || isListOwner); // Is save button disabled.

    async function handleSave(): Promise<void> {
        if (auth) {
            handleUserSave();
        } else {
            handleGuestSave();
        }
    }

    async function handleUserSave(): Promise<void> {
        // This function is called handle"User"Save. auth is not null.

        setIsProcessing(true); // Disable save button temporarily.

        const blob: Blob | null = await takeScreenshot();

        if (isListPage) {
            // Delete old screenshot if user is in /list.
            await deleteScreenshot(screenshotPath!);
        }

        // Supabase doesn't provide url on upload.
        // Therefore, two calls are required to get both path and url.
        const newScreenshotPath: string | null = blob
            ? await uploadScreenshot(blob)
            : null;
        const newPreview: string | null = newScreenshotPath
            ? await retrieveScreenshotUrl(newScreenshotPath)
            : null;

        if (!newPreview) {
            setIsProcessing(false); // Enable save button.
            return;
        }

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
            preview: newPreview,
            screenshot_path: newScreenshotPath!,
        };

        // saveTierList uses upsert.
        // Primary keys must be included to use upsert to update.
        if (tierListId) {
            toBeSaved.id = tierListId;
        }

        const saved: boolean = await saveTierList(toBeSaved);

        if (saved) {
            handleSuccessfulSave();
        }

        setIsProcessing(false); // Enable save button.
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

        await signInWithGoogle(
            `${window.location.origin}/create/${templateId}`
        );
    }

    async function handleDelete(): Promise<void> {
        if (!confirm('Are you sure you want to delete this list?')) {
            // Cancel.
            return;
        }

        // OK.
        setIsProcessing(true);

        // delete button is shown => in /list => tierListId is not null
        const deleted: boolean = await deleteTierList(tierListId!);

        if (deleted) {
            await deleteScreenshot(screenshotPath!);

            location.replace(`/user/${auth!.userId}`);
        } else {
            alert('Deletion failed!');
        }

        setIsProcessing(false);
    }

    function handleSuccessfulSave(): void {
        if (isCreatePage) {
            window.location.replace(`/user/${auth!.userId}`);
        } else {
            window.location.reload();
        }
    }

    async function takeScreenshot(): Promise<Blob | null> {
        if (!ref.current) {
            return null;
        }

        try {
            const dataUrl: string = await toJpeg(ref.current);
            const res: Response = await fetch(dataUrl);
            const blob: Blob = await res.blob();

            return blob;
        } catch (error) {
            console.error('Error: takeScreenshot ', error);
            alert('Error!');

            return null;
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
            <section className='mb-8'>
                <Link
                    className='text-4xl font-bold'
                    href={`/community/${templateId}`}
                >
                    {title} Tier Lists
                </Link>
            </section>
            <section className='mb-8' ref={ref}>
                <TierListBox
                    items={s}
                    setItems={setS}
                    tier='S'
                    color='#ff7f7f'
                    disabled={disabled}
                />
                <TierListBox
                    items={a}
                    setItems={setA}
                    tier='A'
                    color='#ffbf7f'
                    disabled={disabled}
                />
                <TierListBox
                    items={b}
                    setItems={setB}
                    tier='B'
                    color='#ffdf7f'
                    disabled={disabled}
                />
                <TierListBox
                    items={c}
                    setItems={setC}
                    tier='C'
                    color='#ffff7f'
                    disabled={disabled}
                />
                <TierListBox
                    items={f}
                    setItems={setF}
                    tier='F'
                    color='#7fffff'
                    disabled={disabled}
                />
            </section>
            {notRated.length > 0 && (
                <section className='mb-8'>
                    <TierListBox
                        items={notRated}
                        setItems={setNotRated}
                        tier='not-rated'
                        color=''
                        disabled={disabled}
                    />
                </section>
            )}

            {isProcessing && (
                <section className='flex justify-center'>Processing...</section>
            )}
            {!isProcessing && isListOwner && (
                <button
                    className='mb-8 text-[#b7b7b7]'
                    disabled={isProcessing}
                    onClick={() => {
                        handleDelete();
                    }}
                >
                    Delete this tier list
                </button>
            )}
            {!isProcessing && !disabled && (
                <section className='flex justify-center'>
                    <button
                        className='w-60 rounded-md bg-[#3a5795] py-1 hover:bg-[#3a5795b3]'
                        disabled={isProcessing}
                        onClick={() => {
                            handleSave();
                        }}
                    >
                        Save
                    </button>
                </section>
            )}
        </>
    );
}
