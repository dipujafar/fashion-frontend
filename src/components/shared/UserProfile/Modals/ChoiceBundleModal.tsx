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
import { IBandleTier } from "@/types";
import { PackageOpen, Tag } from "lucide-react";
import Link from "next/link";

export default function ChoiceBundleModal({ tiers, userName, btnTxt = "Create Bundle" }: { tiers: IBandleTier[]; userName: string; btnTxt?: string }) {

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="cursor-pointer group shadow-none rounded-none">
          {btnTxt}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-none overflow-y-auto max-h-screen">
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
          {tiers?.map((tier) => (
            <div
              key={tier?.id}
              className={cn(
                "flex justify-between items-center border border-black rounded-xl bg-gray-50 py-3 px-5"
              )}
            >
              <span className="text-lg">{tier?.itemCount} Items</span>
              <span className="text-lg">{tier?.discountPercent}%</span>
            </div>
          ))}
        </div>

        {tiers?.length === 0 && (
          <div className="mx-auto flex w-full flex-col items-center py-4 text-center">
            {/* Icon */}
            <div className="relative mb-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
                <PackageOpen className="h-8 w-8 text-gray-400" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black ring-2 ring-gray-50">
                <Tag className="h-3 w-3 text-white" />
              </div>
            </div>

            {/* Text */}
            <h5 className="text-lg font-semibold text-gray-900">
              No bundle discounts yet
            </h5>
            <p className="text-sm text-gray-600">
              Send the seller an offer and start your own bundle.
            </p>
          </div>
        )}

        <Link
          href={`/member/${userName}/bundle`}
          className="w-full"
        >
          {" "}
          <Button
            // variant={"outline"}
            className="rounded-none w-full py-6 cursor-pointer border-black mt-3 uppercase"
          >
            Create a bundle
          </Button>
        </Link>
        <p className="text-lg font-medium text-center text-green-800">Save on shipping fees</p>
      </DialogContent>
    </Dialog>
  );
}