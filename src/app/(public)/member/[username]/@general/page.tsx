import Container from '@/components/shared/Container';
import SellerProfile from '@/components/shared/UserProfile/SellerProfile';
import { Skeleton } from '@/components/ui/skeleton';
import GetUserDetails, { GetStatsByUserName } from '@/lib/services/UserDetails';
import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react'
import MemberStats from '../_components/MemberStats';
import ProfileFeatures from '@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures';


async function GeneralMemberpage({ params, searchParams }: { params: Promise<{ username: string }>, searchParams: Promise<{ [key: string]: string | undefined }> }) {

    const { username } = await params;
    const userpromise = GetUserDetails({ userName: username });
    const statpromise = GetStatsByUserName({ userName: username });

    return (
        <div className="space-y-5">

            <Container className="">

                <div className="space-y-5 lg:space-y-8">
                    <Suspense fallback={<div className='min-h-40 flex items-center justify-center'>
                        <LoaderCircle size={50} className="text-4xl text-main-color animate-spin" />
                    </div>}>
                        <SellerProfile userPromise={userpromise} />
                    </Suspense>

                    <Suspense fallback={<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                    </div>}>
                        <MemberStats statPromise={statpromise} memberId={username} />
                    </Suspense>
                </div>

            </Container>

            <Container className="lg:space-y-8 space-y-4 mt-16">

                <ProfileFeatures userRole="professional-seller" userName={username} searchParams={searchParams} />

            </Container>

        </div>
    )
}

export default GeneralMemberpage