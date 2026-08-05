import React from 'react'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { IOrderItem } from '@/types';
import Image from 'next/image';
import { defaultImg } from '@/utils/defaultImg';
import Link from 'next/link';

function ItemsModal({ items, action, finalPrice }: { items: IOrderItem[]; action: React.ReactNode; finalPrice: number }) {
    return (
        <Dialog >
            <DialogTrigger>{action}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="sr-only text-5xl text-black">Order Items</DialogTitle>
                </DialogHeader>

                <div className="p-2">
                    <div className="space-y-4">
                        {items?.map(item => (
                            <div key={item.id} className="flex gap-4 pb-4">
                                <Link href={`/shop/${item.product?.id}`} className="flex-shrink-0">
                                    <Image
                                        src={item.product?.images[0]?.url || defaultImg?.product}
                                        alt={item.product?.title}
                                        placeholder='blur'
                                        blurDataURL={defaultImg?.placeholderImg}
                                        width={800}
                                        height={800}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />
                                </Link>
                                <div className="flex-1">
                                    <Link href={`/shop/${item.product?.id}`} className="flex-shrink-0">
                                        <h3 className="font-semibold text-gray-900">{item.product?.title}</h3>
                                    </Link>
                                    <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                                    <p className="text-sm font-semibold text-gray-900 mt-2">${item.unitPrice?.toFixed(2)} each</p>
                                    <p className="text-sm text-gray-600 mt-1">Total: ${(item?.totalPrice).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-zinc-300">
                        <p className="text-right text-lg font-medium text-gray-900">
                            Order Total: ${finalPrice?.toFixed(2)}

                        </p>
                    </div>
                </div>



            </DialogContent>
        </Dialog>
    )
}

export default ItemsModal