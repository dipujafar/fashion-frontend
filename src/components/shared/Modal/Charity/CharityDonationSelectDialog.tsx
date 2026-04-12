"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICharity, IProduct } from "@/types";
import { addToCart, CartCharity, CartItem } from "@/redux/features/cart.slice";
import { useAppDispatch } from "@/redux/hooks";

interface CharityDonationFormData {
  selectedCharities: string[];
  additionalDonation: number;
}

// Remove ICharityWithDetails entirely, ICharity is enough now

interface CharityDonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchasePrice: number;
  donationPercentage: number;
  product: IProduct;
  charities: ICharity[]; // ✅ use ICharity directly
}

export function CharityDonationSelectDialog({
  open,
  onOpenChange,
  purchasePrice,
  donationPercentage,
  product,
  charities,
}: CharityDonationDialogProps) {
  const [selectedCharityIds, setSelectedCharityIds] = useState<string[]>(
    charities.map((c) => c.charityId) // pre-select all by default
  );
  const [additionalDonation, setAdditionalDonation] = useState<number>(0);
  const dispatch = useAppDispatch();

  const { handleSubmit } = useForm<CharityDonationFormData>({
    defaultValues: {
      selectedCharities: charities.map((c) => c.charityId),
      additionalDonation: 0,
    },
  });

  const totalDonation = (purchasePrice * donationPercentage) / 100;

  // Split total donation equally among selected charities
  const perCharityAmount =
    selectedCharityIds.length > 0
      ? totalDonation / selectedCharityIds.length  // 👈 split among selected only
      : 0;

  const finalTotal = totalDonation + additionalDonation;

  const handleCharityToggle = (charityId: string) => {
    setSelectedCharityIds((prev) =>
      prev.includes(charityId)
        ? prev.filter((id) => id !== charityId)
        : [...prev, charityId]
    );
  };

  const onSubmit = () => {
    const selectedCharities = charities.filter((c) =>
      selectedCharityIds.includes(c.charityId)
    );

    const cartCharities: CartCharity[] = selectedCharities.map((c) => ({
      id: c.charityId,
      name: c.isAnonymous
        ? "Anonymous"
        : c.charity.userName ?? `${c.charity.fname} ${c.charity.lname}`,
      donationPercent: donationPercentage / charities.length,
      donationAmount: perCharityAmount,
    }));

    const prod = {
      id: product?.id,
      price: product?.finalPrice,
      quantity: 1
    }

    const shipping_fee = 0;

    const totalPrice = (product?.finalPrice * 1) + additionalDonation + shipping_fee

    // Final cart item with charities
    const cartItem: CartItem = {
      total_price : totalPrice,
      shipping_fee : 0,
      product,
      ...prod,
      charities: cartCharities,
      donation_percent: donationPercentage,
      extra_donation: additionalDonation,
      total_donation: finalTotal,
    };

    dispatch(addToCart(cartItem));

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-base font-normal text-muted-foreground">
            Which charities you want to add?
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 space-y-4">
          {/* Purchase Info */}
          <div className="flex gap-2">
            <div className="flex-1 bg-black text-white rounded-lg px-4 py-3 text-center text-sm font-medium">
              Purchase Price: ${purchasePrice}
            </div>
            <div className="flex-1 bg-black text-white rounded-lg px-4 py-3 text-center text-sm font-medium">
              Total Donation ({donationPercentage}%): ${totalDonation.toFixed(2)}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground">
            Seller has pledged {donationPercentage}% of this purchase to
            charity. Choose from the charity/charities they've selected to
            decide where the donation goes.
          </p>

          {/* Charity Options */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-3">
              {charities.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={item.charityId}
                    checked={selectedCharityIds.includes(item.charityId)}
                    onCheckedChange={() => handleCharityToggle(item.charityId)}
                    className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <Label
                      htmlFor={item.charityId}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {/* Show userName, fallback to full name */}
                      {item.charity.userName ?? `${item.charity.fname} ${item.charity.lname}`}
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      ${selectedCharityIds.includes(item.charityId)
                        ? perCharityAmount.toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {charities.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No charities available for this product.
              </p>
            )}

            {/* Additional Donation */}
            <div className="space-y-2">
              <Label className="text-sm font-normal">
                Add an additional donation? (Optional)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="pl-6 pr-10"
                  value={additionalDonation || ""}
                  onChange={(e) =>
                    setAdditionalDonation(parseFloat(e.target.value) || 0)
                  }
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ↑↓
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-2">
              <p className="text-sm font-medium">
                Total Donation to Charities: ${finalTotal.toFixed(2)}
              </p>
            </div>

            {/* Submit */}
            <div className="pt-2 pb-6">
              <Button
                type="submit"
                disabled={selectedCharityIds.length === 0}
                className="w-full bg-black hover:bg-black/90 text-white py-3 rounded-lg font-medium"
              >
                Continue to Checkout
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}