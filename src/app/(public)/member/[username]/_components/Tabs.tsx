"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'


function Tabs({ userName }: { userName: string }) {


    const tabList = [
        {
            name: "Product Listing",
            href: `/member/${userName}`
        },
        {
            name: "Charity Support",
            href: `/member/${userName}/charity-support`
        },
        {
            name: "Reviews",
            href: `/member/${userName}/reviews`
        }
    ]

    const pathname = usePathname();

    return (
        <div className='flex flex-row items-center border-b w-full border-b-gray-200'>
            {tabList.map((tab) => (
                <Link href={tab.href} key={tab.href}>
                    <button
                        className={`hover:bg-gray-50 duration-200 rounded-none text-xs md:text-sm lg:text-base px-3 lg:px-3.5 py-3 font-medium cursor-pointer border-b-2 ${pathname === tab.href ? 'border-black' : 'border-transparent'}`}>
                        {tab.name}
                    </button>
                </Link>
            ))}
        </div>
    )
}

export default Tabs