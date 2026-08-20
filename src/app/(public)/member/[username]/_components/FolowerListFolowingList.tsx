"use client"
import { FollowersDialog } from '@/components/shared/Modal/FollowersDialog';
import { IFolow } from '@/types';
import React, { useState } from 'react'

function FolowerListFolowingList({ folowers, folowings, type, actionBtn, userName }: { folowers: IFolow[], folowings: IFolow[], type: string, actionBtn: React.ReactNode, userName: string }) {

    const [openFollowers, setOpenFollowers] = useState(false);

    return (
        <>

            <div className='cursor-pointer' onClick={() => setOpenFollowers(true)}>
                {actionBtn}
            </div>

            <FollowersDialog
                open={openFollowers}
                setOpen={setOpenFollowers}
                type={type}
                folowers={folowers}
                folowings={folowings}
                userName={userName}
            />
        </>
    )
}

export default FolowerListFolowingList;

