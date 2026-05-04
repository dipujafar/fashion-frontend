"use client"
import { FollowersDialog } from '@/components/shared/Modal/FollowersDialog';
import { IFolow } from '@/types';
import React, { useState } from 'react'

function FolowerListFolowingList({ folowers, folowings }: { folowers: IFolow[], folowings: IFolow[] }) {
    const [type, setType] = useState("");
    const [openFollowers, setOpenFollowers] = useState(false);

    return (
        <>

            <p className="text-foreground font-medium">
                <span onClick={() => setOpenFollowers(true)} className="underline underline-offset-1 font-semibold cursor-pointer">{folowers?.length} followers</span>
                {', '}
                <span onClick={() => {
                    setOpenFollowers(true);
                    setType("following");
                }} className="underline underline-offset-1 font-semibold cursor-pointer">{folowings?.length} following</span>
            </p>

            <FollowersDialog
                open={openFollowers}
                setOpen={setOpenFollowers}
                type={type}
                folowers={folowers}
                folowings={folowings}
            />
        </>
    )
}

export default FolowerListFolowingList