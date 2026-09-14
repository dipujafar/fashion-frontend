"use client"
import { cn } from '@/lib/utils';
import { MessageCircleMore } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react'

function InboxPage() {
    const pathName = usePathname();
    return (
        <div className={cn(pathName === "/inbox" && "hidden lg:flex flex-col h-full items-center justify-center")}>
            <MessageCircleMore />
            Empty inbox page
        </div>
    )
}

export default InboxPage