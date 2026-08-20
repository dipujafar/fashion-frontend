import GetUserDetails from '@/lib/services/UserDetails';
import React from 'react'
import { notFound } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from '@/components/shared/Container';
import CustomerFeedbacks from '@/components/shared/UserProfile/CustomerFeedbacks';
import ProfileFeatures from '@/components/shared/UserProfile/ProfileFeatures/ProfileFeatures';
import { Suspense } from 'react';
import { LoaderCircle } from 'lucide-react';
import SellerProfile from '@/components/shared/UserProfile/SellerProfile';


async function MemberLayout({
    params,
    // general,
    // charityOrg,
    // tabs,
}: {
    params: Promise<{ username: string }>,
    children: React.ReactNode;
    // general: React.ReactNode;
    // charityOrg: React.ReactNode;
    // tabs: React.ReactNode;
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
                        <Suspense fallback={<div className='min-h-40 flex items-center justify-center'>
                            <LoaderCircle size={50} className="text-4xl text-main-color animate-spin" />
                        </div>}>
                            <SellerProfile userPromise={user} />
                        </Suspense>
                    </div>

                </Container>

                <Container>

                    <div className='flex flex-row items-center border-b w-full border-b-gray-200'>
                        <button className='hover:bg-gray-50 duration-200 rounded-none text-xs md:text-sm lg:text-base px-3 lg:px-3.5 py-3 font-medium cursor-pointer border-b-2 border-black'>Product Listing</button>
                        <button className='hover:bg-gray-50 duration-200 rounded-none text-xs md:text-sm lg:text-base px-3 lg:px-3.5 py-3 font-medium cursor-pointer border-b-2 border-black'>Product Listing</button>
                        <button className='hover:bg-gray-50 duration-200 rounded-none text-xs md:text-sm lg:text-base px-3 lg:px-3.5 py-3 font-medium cursor-pointer border-b-2 border-black'>Product Listing</button>
                    </div>



                </Container>



            </div>
        </>
    )
}

export default MemberLayout