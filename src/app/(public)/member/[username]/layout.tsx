import GetUserDetails from '@/lib/services/UserDetails';
import React from 'react'
import { notFound } from 'next/navigation'

async function MemberLayout({
    params,
    general,
    charityOrg,
}: {
    params: Promise<{ username: string }>
    children: React.ReactNode;
    general: React.ReactNode;
    charityOrg: React.ReactNode;
}) {

    const { username } = await params;

    const user = await GetUserDetails({ userName: username });

    if (!user?.data?.user) {
        return notFound()
    }

    const isCharityOrg = user?.data?.user?.auth?.role === 'CHARITABLE_ORGANIZATION';

    return (
        <>
            {isCharityOrg ? charityOrg : general}
        </>
    )
}

export default MemberLayout