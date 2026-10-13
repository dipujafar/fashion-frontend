"use client"
import { cn } from '@/lib/utils';
import { MessageCircleMore } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react'
import emptyChat from "@/assets/images/chat/empty-chat-icon.png"
import Image from 'next/image';

function InboxPage() {
    const pathName = usePathname();
    return (
        <div className={cn(pathName === "/inbox" && "hidden lg:flex flex-col h-full items-center justify-center")}>
            <div className='h-full flex flex-col items-center justify-center max-w-md mx-auto text-center'>
                <Image src={emptyChat} alt="Empty chat" className='h-12 lg:h-16 w-auto' />
                <p className='text-gray-900 text-2xl font-semibold my-3'>Welcome to FASHI-ON Messages</p>
                <p className='text-amber-500 text-xl font-medium text-center mb-2'>Start a conversation with other FASHI-ON members.</p>
                <p className='text-gray-600 text-base text-center'>Use Messages to ask about items, discuss purchases or sales, arrange donations & stay connected.</p>

            </div>
        </div>
    )
}

export default InboxPage