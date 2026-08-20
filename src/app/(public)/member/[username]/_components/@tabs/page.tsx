import ProfileFeatures from '@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures'
import React from 'react'

async function TabsPage({ params, searchParams }: { params: Promise<{ username: string }>, searchParams: Promise<{ [key: string]: string | undefined }> }) {

    const { username } = await params;

    const ssp = await searchParams;

    return (
        <ProfileFeatures userName={username} searchParams={ssp} />
    )
}

export default TabsPage