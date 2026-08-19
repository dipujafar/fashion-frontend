import React from 'react'
import VacationModeSwitcher from './_components/VacationModeSwitcher'
import { GetMyProfile } from '@/lib/services/UserDetails';
import { IUser } from '@/types';
import { notFound } from 'next/navigation';

async function VacationModePage() {
    const profile = await GetMyProfile() as { data: IUser };
    const user = profile?.data;

    if (!user) {
        return notFound()
    }

    return (
        <div className="space-y-5">

            <div className='mt-5'>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Vacation mode</h2>
                </div>
                <p className="mt-2 text-[15px] text-gray-700 max-w-3xl">
                    This setting allows you to step away from your listings, but keep selling while you're gone. We will alert potential buyers that you're unable to ship until you turn off vacation mode. All completed sales must be shipped to enter Vacation Mode.
                </p>
            </div>

            <VacationModeSwitcher defaultChecked={user?.vacationMode} />

        </div>
    )
}

export default VacationModePage