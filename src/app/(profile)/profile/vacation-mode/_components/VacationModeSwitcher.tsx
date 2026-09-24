"use client"
import { Switch } from '@/components/ui/switch'
import { UpdateVacationMode } from '@/lib/Actions/Profile.action';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import React from 'react'
import { toast } from 'sonner';

function VacationModeSwitcher({ defaultChecked }: { defaultChecked: boolean }) {

    const handleChange = async (checked: boolean) => {
        try {

            const res = await UpdateVacationMode({ payload: { vacationMode: checked } });
            if (!res.success) {
                throw new Error(res.message);
            }

        } catch (error: any) {
            if (isRedirectError(error)) {
                throw error; // Let Next.js handle the redirect
            }
            toast.error(error?.message || "Failed to update vacation mode. Please try again.");
        }
    }

    return (
        <div className='flex flex-row items-center gap-x-5'>
            <div>
                <p className='text-lg font-semibold text-gray-800'>Turn On/Off</p>
                <p className='text-gray-600'>Turn this on to enable vacation mode</p>
            </div>
            <Switch defaultChecked={defaultChecked}
                onCheckedChange={handleChange}
                id="airplane-mode"
                className='h-7 w-14 [&>span]:h-6 [&>span]:w-6 [&>span]:data-[state=checked]:translate-x-[30px]' />
        </div>
    )
}

export default VacationModeSwitcher