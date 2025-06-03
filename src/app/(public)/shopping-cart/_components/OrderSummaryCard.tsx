"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommonButton from "@/components/ui/common-button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const OrderSummaryCard = () => {
  const router = useRouter();
  const pathName = usePathname();

  console.log(pathName);

  const handleProceed = () => {
    router.push("/billing-info");
  };
  return (
    <Card
      className="shadow-md hover:border hover:border-primary-color/50 duration-300 text-black h-fit"
    
    >
      <CardHeader className="mb-0">
        <CardTitle className="font-semibold text-center">
          Total Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent>
        <hr />
        <div className="space-y-3 mt-4">
          <div className="flex justify-between ">
            <p>Items:</p>
            <p className="font-medium">2</p>
          </div>

          <div className="flex justify-between ">
            <p>Subtotal:</p>
            <p className="font-medium">$708.00</p>
          </div>

          <div className="flex justify-between ">
            <p>Total Shipping:</p>
            <p className="font-medium">$0.00</p>
          </div>
          <hr />
          <div className="flex justify-between ">
            <p>Total:</p>
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
        {pathName !== "/shopping/shopping-address" && (
          <Link href={"/shopping/shopping-address"} className="w-full">
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
