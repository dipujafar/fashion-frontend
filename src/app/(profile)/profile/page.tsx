import { GetMyProfile } from '@/lib/services/UserDetails';
import { IUser, UserRole } from '@/types';
import { notFound } from 'next/navigation';
import React from 'react'
import CharityOrgDashboard from './_components/CharityOrgDashboard';
import { Button } from '@/components/ui/button';
import { Link as LLink } from 'lucide-react';
import Link from 'next/link';
import CharityShopDashboard from './_components/CharityShopDashboard';
import Sellerdashboard from './_components/Sellerdashboard';

async function Dashboardpage() {

    const profile = await GetMyProfile() as { data: IUser };
    const user = profile?.data;

    if (!user) {
        return notFound()
    }

    const isCharityOrg = user.auth?.role === UserRole.CHARITABLE_ORGANIZATION;
    const isCharityShop = user.auth?.role === UserRole.CHARITY_SHOP;

    return (
        <div className=''>

            <div className='mb-2 flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-start lg:justify-between'>
                <div className=''>
                    <h2 className='text-xl font-semibold'>Welcome back, @{user?.userName}</h2>
                    <p className='text-base text-muted-foreground'>Here's an overview of your account.</p>
                </div>
                <div className='flex lg:flex-row gap-3 items-center'>
                    <Link href={`/member/${user?.userName}`}>
                        <Button variant={"outline"} className='border border-black shadow-none cursor-pointer'>View Public Profile <LLink /></Button>
                    </Link>
                    <Link href={`/profile/edit`}>
                        <Button variant={"default"} className='border border-black shadow-none cursor-pointer'>Edit Profile</Button>
                    </Link>
                </div>
            </div>

            {
                isCharityShop ? <CharityShopDashboard /> : isCharityOrg ? <CharityOrgDashboard /> : <Sellerdashboard />
            }
        </div>
    )
}

export default Dashboardpage
