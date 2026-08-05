import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export default function CustomAvatar({ image, name, className }: { image: string | null, name: string, className?: string }) {
    return image ? <Image
        src={image}
        alt="user_image"
        width={1200}
        height={1200}
        className={cn("md:size-8 size-6 rounded-full", className)}
    ></Image> : <div className={cn("size-6 md:size-8 rounded-full bg-gray-200 text-xl flex-center capitalize", className)}>{name?.slice(0, 2)}</div>
}
