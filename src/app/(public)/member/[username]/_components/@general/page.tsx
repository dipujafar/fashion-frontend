import Container from '@/components/shared/Container';
import SellerProfile from '@/components/shared/UserProfile/SellerProfile';
import GetUserDetails from '@/lib/services/UserDetails';
import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react'



async function GeneralMemberpage({ params, searchParams }: { params: Promise<{ username: string }>, searchParams: Promise<{ [key: string]: string | undefined }> }) {

    const { username } = await params;
    const userpromise = GetUserDetails({ userName: username });

    return (
        <Container>

            <div className="space-y-5 lg:space-y-8">
                <Suspense fallback={<div className='min-h-40 flex items-center justify-center'>
                    <LoaderCircle size={50} className="text-4xl text-main-color animate-spin" />
                </div>}>
                    <SellerProfile userPromise={userpromise} />
                </Suspense>
            </div>

        </Container>
    )
}

export default GeneralMemberpage