"use client"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { addShipmentToCart } from "@/redux/features/cart.slice";
import { RootState } from "@/redux/store";
import { ICourierServiceRates } from "@/types";
import Image from 'next/image';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";

function CourierServiceCards({ rates, cartGroupId }: { rates: ICourierServiceRates[]; cartGroupId: string }) {

  const carts = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const selectedcartShipment = carts?.carts?.find((cart) => cart?.cartGroupId === cartGroupId)?.shipment;

  return (
    <RadioGroup defaultValue={selectedcartShipment?.serviceId || ""} className="grid grid-cols-2 gap-3">
      {rates?.map((rate) => (
        <Label key={rate?.courier_service?.id} onClick={() => {
          dispatch(addShipmentToCart({
            cartGroupId, shipment: {
              serviceId: rate?.courier_service?.id,
              shipment_charge_total: rate?.total_charge,
            }
          }))
        }} htmlFor={rate?.courier_service?.id} className="border border-gray-300 rounded p-5 flex flex-col items-start cursor-pointer hover:bg-zinc-50 has-[[data-state=checked]]:border-primary">
          <div className="flex justify-between items-center gap-3 w-full">
            <Image src={rate?.courier_service?.logo} alt={rate?.courier_service?.name} width={100} height={100} className='h-8 w-auto object-cover' />
            <RadioGroupItem value={rate?.courier_service?.id} id={rate?.courier_service?.id} />
          </div>
          <p className="text-lg font-bold text-primary-black">${rate?.total_charge?.toFixed(2)}</p>
          <p className="text-primary-black">{rate?.courier_service?.name}</p>
          <p className="text-sm text-gray-600">
            Delivery within {rate?.min_delivery_time} - {rate?.max_delivery_time} days
          </p>
        </Label>
      ))}
    </RadioGroup>
  )
}

export default CourierServiceCards