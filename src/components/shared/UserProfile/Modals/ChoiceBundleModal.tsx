"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
const bundleData = [
  {
    id: 1,
    item: 2,
    discount: 5,
  },
  {
    id: 2,
    item: 5,
    discount: 10,
  },
  {
    id: 3,
    item: 10,
    discount: 15,
  },
];

export default function ChoiceBundleModal() {
  const [selectItem, setSelectItem] = useState(0);
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-transparent text-black  cursor-pointer group hover:bg-[#e9f8f0] shadow-none">
          Create Bundle <AnimatedArrow />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" text-2xl text-center text-[#1F2937]">
            Bundle Discount
          </DialogTitle>
          <DialogDescription className="text-base text-[#4B5563] max-w-[380px] mx-auto">
            Save more when you buy more! Select the number of items you'd like
            to bundle to receive a discount.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          {bundleData?.map((bundle) => (
            <div
              onClick={() => setSelectItem(bundle?.item)}
              key={bundle?.id}
              className={cn(
                "flex justify-between items-center border border-black rounded-xl bg-gray-50 py-3 px-5"
              )}
            >
              <span className="text-lg">{bundle.item} Items</span>
              <span className="text-lg">{bundle.discount}%</span>
            </div>
          ))}
        </div>
        <Link
          href={`/build-bundle`}
          className="w-full"
        >
          {" "}
          <Button
            variant={"outline"}
            className="border-black mt-3 uppercase py-5 cursor-pointer w-full"
          >
            Choose a bundle
          </Button>
        </Link>
        <p className="text-lg font-medium text-center">Save on shipping fees</p>
      </DialogContent>
    </Dialog>
  );
}