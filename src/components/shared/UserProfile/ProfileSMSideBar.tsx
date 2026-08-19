"use client"
import { usePathname } from 'next/navigation';
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { profileRouts } from '@/lib/profileRoutes';

function ProfileSMSideBar() {

    const pathname = usePathname();

    const currentRoutParent = profileRouts.find((rout) => pathname?.includes(rout?.rout));
    const currentRoutChild = currentRoutParent?.routs?.find((rout) => pathname?.includes(rout?.rout));

    return (
        <div>
            <div className='lg:hidden'>

                <div className='bg-white'>

                    <Accordion type='multiple' defaultValue={["no need auto open"]} className=''>
                        <AccordionItem value={currentRoutChild?.rout || ""}>

                            <AccordionTrigger className='font-semibold text-base text-gray-900 px-4 border-b border-b-gray-200 rounded-none hover:no-underline'>{currentRoutChild?.title}</AccordionTrigger>

                            <AccordionContent className='rounded-none'>
                                <Accordion type='single' defaultValue={currentRoutParent?.rout || ""}>
                                    {
                                        profileRouts.map((rout) => (
                                            <AccordionItem value={rout?.rout}>
                                                <AccordionTrigger className={cn("text-sm px-4 hover:no-underline", currentRoutParent?.rout === rout?.rout && "font-semibold")}>{rout?.title}</AccordionTrigger>
                                                <AccordionContent className='px-4 space-y-2'>
                                                    {
                                                        rout?.routs?.map((r) => (
                                                            <Link href={r?.rout}>
                                                                <div className={cn("py-3 px-4 hover:bg-zinc-100 focus:bg-zinc-100", currentRoutChild?.rout == r?.rout ? "font-semibold bg-zinc-100" : "")}>
                                                                    <p>{r?.title}</p>
                                                                </div>
                                                            </Link>
                                                        ))
                                                    }
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))
                                    }
                                </Accordion>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>


                </div>
            </div>
        </div>
    )
}

export default ProfileSMSideBar