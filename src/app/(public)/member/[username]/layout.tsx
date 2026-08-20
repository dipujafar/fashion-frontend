import GetUserDetails from '@/lib/services/UserDetails';
import React from 'react'
import { notFound } from 'next/navigation'
import Container from '@/components/shared/Container';
import SellerProfile from '@/components/shared/UserProfile/SellerProfile';
import Tabs from './_components/Tabs';


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

    const isCharityOrg = user?.data?.user?.auth?.role === 'CHARITABLE_ORGANIZATION';

    return (
        <>
            <div className='space-y-5'>

                <Container>

                    <div className="space-y-5 lg:space-y-8">
                        <SellerProfile user={user} />
                    </div>

                </Container>

                <Container>

                    <Tabs userName={username} />

                    <div className='mt-5 lg:mt-8'>
                        {children}
                    </div>

                </Container>



            </div>
        </>
    )
}

export default MemberLayout