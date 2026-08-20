"use client"
import { Button } from '@/components/ui/button'
import { FolowMemeber, UnFolowMemeber } from '@/lib/Actions/Folow.action';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import React from 'react'
import { toast } from 'sonner';

function FolowUnFolow({ isFolow, memberId }: { isFolow: boolean, memberId: string }) {

    const handleFolow = async () => {
        try {
            const res = await FolowMemeber({ payload: { memberId } });
            if (res?.error) {
                toast.error(res?.error);
            }
        }
        catch (error: any) {
            if (isRedirectError(error)) {
                throw error; // Let Next.js handle the redirect
            }
            toast.error(error?.message);
        }
    }

    const handleUnFolow = async () => {
        try {
            const res = await UnFolowMemeber({ payload: { memberId } });
            if (res?.error) {
                toast.error(res?.error);
            }
        }
        catch (error: any) {
            if (isRedirectError(error)) {
                throw error; // Let Next.js handle the redirect
            }
            toast.error(error?.message);
        }
    }

    return (
        <>
            {
                isFolow ? <Button variant={'outline'} onClick={handleUnFolow} className="font-semibold px-6 cursor-pointer rounded-none w-full md:w-1/2 lg:w-auto">
                    Following
                </Button> : <Button onClick={handleFolow} className=" text-white font-semibold px-6 cursor-pointer rounded-none w-full md:w-1/2 lg:w-auto">
                    Follow
                </Button>
            }
        </>
    )
}

export default FolowUnFolow