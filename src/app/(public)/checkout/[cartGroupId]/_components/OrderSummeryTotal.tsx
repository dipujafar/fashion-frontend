"use client";
import { OrderSummeryType } from '@/types'
import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
    CardContent,
} from "@/components/ui/card";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

function OrderSummeryTotal({ summery, cartGroupId }: { summery: OrderSummeryType, cartGroupId: string }) {

    const shippingCart = useSelector((state: RootState) => state?.cart?.carts);

    const shippingCost = shippingCart?.find((cart) => cart?.cartGroupId === cartGroupId)?.shipment?.shipment_charge_total || 0;

    const totalCost = summery?.total + shippingCost;

    return (
        <CardContent>
            <hr />
            <div className="space-y-3 mt-4">
                <div className="flex justify-between ">
                    <p className="text-gray-700">Items Total:</p>
                    <p className="font-medium">${summery?.itemTotal}</p>
                </div>

                {summery?.bundleDiscountAmount > 0 && (
                    <div className="flex justify-between ">
                        <p className="text-gray-700">Bundle Discount
                            <span className="bg-green-600/20 text-green-600 rounded px-1 py-0.5 ml-1 text-sm">
                                {summery?.bundleDiscountPercent}%
                            </span> :</p>
                        <p className="font-medium text-green-600">-${summery?.bundleDiscountAmount?.toFixed(2)}</p>
                    </div>
                )}

                {/* <div className="flex justify-between ">
          <p className="text-[#8A8A8A]">Total Shipping:</p>
          <p className="font-medium">${cart?.total_shippingFee?.toFixed(2)}</p>
        </div> */}

                <div className="flex justify-between ">
                    <p className="text-gray-700">Extra Donation:</p>
                    <p className="font-medium">${summery?.totalExtraDonation?.toFixed(2)}</p>
                </div>

                {/* <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Extra Donation:</p>
            <p className="font-medium">$25.00</p>
          </div> */}

                <div className="flex justify-between ">
                    <p className="text-gray-700 flex flex-row gap-x-1 items-center">Service Fee
                        <Tooltip>
                            <TooltipTrigger>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-question-mark-icon lucide-circle-question-mark text-black cursor-pointer"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                            </TooltipTrigger>

                            <TooltipContent className="rounded-none" side="top">
                                <p className="text-sm">Covers secure payment processing, buyer <br /> protection, customer support, and helps <br /> keep our marketplace safe and reliable.</p>
                            </TooltipContent>
                        </Tooltip> :
                    </p>
                    <p className="font-medium">${summery?.serviceFeeCost?.toFixed(2)}</p>
                </div>
                <div className="flex justify-between ">
                    <p className="text-gray-700">Verify & Authentication of Goods:</p>
                    <p className="font-medium">${summery?.authenticationCost?.toFixed(2)}</p>
                </div>
                <div className="flex justify-between ">
                    <p className="text-gray-700">Gift Trees:</p>
                    <p className="font-medium">${summery?.treeGiftCost?.toFixed(2)}</p>
                </div>

                {shippingCost > 0 && <div className="flex justify-between ">
                    <p className="text-gray-700 flex flex-row gap-x-1 items-center">Shipping
                        <Tooltip>
                            <TooltipTrigger>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-question-mark-icon lucide-circle-question-mark text-black cursor-pointer"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                            </TooltipTrigger>

                            <TooltipContent className="rounded-none" side="top">
                                <p className="text-sm">(Taxes and VAT included)</p>
                            </TooltipContent>
                        </Tooltip> :
                    </p>
                    <p className="font-medium">${shippingCost?.toFixed(2)}</p>
                </div>}

                {/* <hr />
          <div className="flex justify-between items-center">
            <div className="text-gray-700">
              <p>Promo code:</p>
              <span>(If you have a discount code)</span>
            </div>
            <Input className="w-1/2 bg-gray-100" placeholder="Enter code" />
          </div> */}
                <hr />
                <div className="flex justify-between ">
                    <p className="text-gray-800 font-semibold text-lg">Total:</p>

                    <p className="font-semibold text-lg">${totalCost?.toFixed(2)}</p>
                </div>
            </div>
        </CardContent>
    )
}

export default OrderSummeryTotal