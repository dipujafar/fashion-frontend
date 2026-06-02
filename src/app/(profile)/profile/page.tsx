import MyProfile from '@/components/shared/UserProfile/MyProfile/MyProfile'
import { GetMyProfile } from '@/lib/services/UserDetails';
import { IUser } from '@/types';
import { notFound } from 'next/navigation';
import React from 'react'

async function MProfilePage() {
    const profile = await GetMyProfile() as { data: IUser };
    const user = profile?.data;

    if (!user) {
        return notFound()
    }

    return (
        <div>
            <MyProfile user={user} />
        </div>
    )
}

export default MProfilePage