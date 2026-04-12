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
import { useAddNewOrderMutation } from "@/redux/api/order.api";
import { clearCart, selectFullCart } from "@/redux/features/cart.slice";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const OrderSummaryCard = () => {
  const [uploadOrder, { isLoading }] = useAddNewOrderMutation();
  const cart = useAppSelector(selectFullCart);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOrder = async () => {
    try {
      const products = cart?.items?.map(product => {
        return {
          "productId": product?.id,
          "quantity": product?.quantity,
          "extra_donation": product?.extra_donation,
          "charities": product?.charities?.map(i => i?.id)
        }
      })
      const body = {
        products,
        treeCredit: cart?.tree_gift?.gift_amount
      }
      const res = await uploadOrder(body).unwrap();
      dispatch(clearCart());
      router.replace(res?.data);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong, try again")
    }
  }

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
            <p className="font-medium">{cart?.totalQuantity}</p>
          </div>

          <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Subtotal:</p>
            <p className="font-medium">${cart?.sub_totalPrice?.toFixed(0)}</p>
          </div>

          <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Total Shipping:</p>
            <p className="font-medium">${cart?.total_shippingFee?.toFixed(0)}</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Extra Donation:</p>
            <p className="font-medium">${cart?.total_extraDonation?.toFixed(0)}</p>
          </div>
          {/* <div className="flex justify-between ">
            <p className="text-[#8A8A8A]">Extra Donation:</p>
            <p className="font-medium">$25.00</p>
          </div> */}
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
            <p className="font-medium">${cart?.tree_gift?.gift_amount.toFixed(2)}</p>
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

            <p className="font-medium">${cart?.totalPrice.toFixed(0)}</p>
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

        <CommonButton loading={isLoading} disabled={cart?.items?.length <= 0} handlerFunction={handleOrder} className="w-full border-white disabled:cursor-not-allowed bg-[#2C885D] hover:bg-[#2C885D]/80">
          Pay Now
        </CommonButton>

      </CardFooter>
    </Card>
  );
};

export default OrderSummaryCard;
