"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommonButton from "@/components/ui/common-button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const OrderSummaryCard = () => {
  const router = useRouter();
  const pathName = usePathname();


  return (
    <Card className=" hover:border hover:border-primary-color/50 duration-300 text-black h-fit">
      <CardHeader className="mb-0">
        <CardTitle className="font-semibold text-center">
          Total Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent>
        <hr />
        <div className="space-y-3 mt-4">
          <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Items:</p>
            <p className="font-medium">4</p>
          </div>

          <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Subtotal:</p>
            <p className="font-medium">$708.00</p>
          </div>

          <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Total Shipping:</p>
            <p className="font-medium">$0.00</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Donation:</p>
            <p className="font-medium">$130.00</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Extra Donation:</p>
            <p className="font-medium">$25.00</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Buyer Protection:</p>
            <p className="font-medium">$0.00</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Authentication of Goods:</p>
            <p className="font-medium">$0.00</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Gift Trees:</p>
            <p className="font-medium">$0.00</p>
          </div>
          <hr />
          <div className="flex justify-between items-center">
            <div className="text-[#8A8A8A]">
              <p>Promo code:</p>
              <span>(If you have a discount code)</span>
            </div>
            <Input className="w-1/2 bg-gray-100" placeholder="Enter code" />
          </div>
          <hr />
          <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Total:</p>

            <p className="font-medium">$633.00</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {/* <Button
          onClick={handleProceed}
          className="bg-primary-color w-full rounded-full hover:bg-primary-black/80"
        >
          Proceed to checkout
        </Button> */}
        {pathName !== "/shopping-cart/billing-address" && (
          <Link href={"/shopping-cart/billing-address"} className="w-full">
            <CommonButton className="w-full border-white">
              Proceed to checkout
            </CommonButton>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrderSummaryCard;
