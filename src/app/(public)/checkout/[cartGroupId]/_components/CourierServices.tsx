import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Truck } from 'lucide-react';

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


function CourierServices() {
    return (
        <Card className=" hover:border hover:border-primary-color/50 duration-300 text-black h-fit rounded-none gap-3">
            <CardHeader className="mb-0">
                <CardTitle className="font-semibold text-lg flex flex-row items-center gap-2">
                    <Truck />
                    Shipping & Courier Services
                </CardTitle>

            </CardHeader>
            <CardContent className="pt-0">

                <div className="">
                    <RadioGroup defaultValue="r1" className="grid grid-cols-3 gap-3">
                        <Label htmlFor="r1" className="border border-gray-300 rounded p-5 flex flex-col items-start cursor-pointer hover:bg-zinc-50 has-[[data-state=checked]]:border-primary">
                            <div className="flex justify-between items-center gap-3 w-full">
                                <Truck />
                                <RadioGroupItem value="r1" id="r1" />
                            </div>
                            <p className="text-lg font-bold text-primary-black">$25.00</p>
                            <p className="text-primary-black">Pathao Courier</p>
                        </Label>

                        <Label htmlFor="r2" className="border border-gray-200 rounded p-5 flex flex-col items-start cursor-pointer hover:bg-zinc-50 has-[[data-state=checked]]:border-primary">
                            <div className="flex justify-between items-center gap-3 w-full">
                                <Truck />
                                <RadioGroupItem value="r2" id="r2" />
                            </div>
                            <p className="text-lg font-bold text-primary-black">$25.00</p>
                            <p className="text-primary-black">Pathao Courier</p>
                        </Label>

                        <Label htmlFor="r3" className="border border-gray-200 rounded p-5 flex flex-col items-start cursor-pointer hover:bg-zinc-50 has-[[data-state=checked]]:border-primary">
                            <div className="flex justify-between items-center gap-3 w-full">
                                <Truck />
                                <RadioGroupItem value="r3" id="r3" />
                            </div>
                            <p className="text-lg font-bold text-primary-black">$25.00</p>
                            <p className="text-primary-black">Pathao Courier</p>
                        </Label>

                        <Label htmlFor="r4" className="border border-gray-200 rounded p-5 flex flex-col items-start cursor-pointer hover:bg-zinc-50 has-[[data-state=checked]]:border-primary">
                            <div className="flex justify-between items-center gap-3 w-full">
                                <Truck />
                                <RadioGroupItem value="r4" id="r4" />
                            </div>
                            <p className="text-lg font-bold text-primary-black">$25.00</p>
                            <p className="text-primary-black">Pathao Courier</p>
                        </Label>
                    </RadioGroup>
                </div>

            </CardContent>

        </Card>
    )
}

export default CourierServices