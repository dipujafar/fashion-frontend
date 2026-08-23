import GetUserDetails from '@/lib/services/UserDetails';
import React from 'react'
import { notFound, redirect } from 'next/navigation'
import Container from '@/components/shared/Container';
import SellerProfile from '@/components/shared/UserProfile/SellerProfile';
import Tabs from '../_components/Tabs';
import { UserRole } from '@/types';

async function MemberLayout({
    params,
    children
}: {
    params: Promise<{ username: string }>,
    children: React.ReactNode;
}) {

    const { username } = await params;

    const user = await GetUserDetails({ userName: username });

    if (!user?.data?.user) {
        return notFound()
    }

    const isCharity = user?.data?.user?.auth?.role === UserRole.CHARITABLE_ORGANIZATION;
    // const isCharity = true
    const isCharityShop = user?.data?.user?.auth?.role === UserRole.CHARITY_SHOP;

    if (isCharity) {
        redirect(`/charity/${username}`);
    }

    return (
        <>
            <div className='space-y-5'>

                <Container>

                    <div className="space-y-5 lg:space-y-8">
                        <SellerProfile user={user} isCharity={isCharity || isCharityShop} />
                    </div>

                    <div className='mt-5 lg:mt-8'>
                        <Tabs userName={username} isCharityShop={true} />
                    </div>

                    <div className='mt-5 lg:mt-8'>
                        {children}
                    </div>

                </Container>



            </div>
        </>
    )
}

export default MemberLayout