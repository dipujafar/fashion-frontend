"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { AddToCart } from "@/lib/Actions/Cart.action";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { tags } from "@/utils/serverTags";
import { useDispatch } from "react-redux";
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

interface CharityDonationFormData {
  selectedCharities: string[];
  additionalDonation: number;
  extraDonationAnonymous: boolean;
}

// Remove ICharityWithDetails entirely, ICharity is enough now

interface CharityDonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchasePrice: number;
  donationPercentage: number;
  product: IProduct;
  charities: ICharity[]; // ✅ use ICharity directly
  buyMode: "cart" | "buy";
}

export function CharityDonationSelectDialog({
  open,
  onOpenChange,
  purchasePrice,
  donationPercentage,
  product,
  charities,
  buyMode,
}: CharityDonationDialogProps) {
  const [selectedCharityIds, setSelectedCharityIds] = useState<string[]>(
    charities.map((c) => c.charityId) // pre-select all by default
  );
  const [additionalDonation, setAdditionalDonation] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const { handleSubmit, control, watch } = useForm<CharityDonationFormData>({
    defaultValues: {
      selectedCharities: charities.map((c) => c.charityId),
      additionalDonation: 0,
      extraDonationAnonymous: false,
    },
  });

  const extraDonationAnonymous = watch("extraDonationAnonymous");

  const totalDonation = (purchasePrice * donationPercentage) / 100;

  // Split total donation equally among selected charities
  const perCharityAmount =
    selectedCharityIds.length > 0
      ? totalDonation / selectedCharityIds.length // 👈 split among selected only
      : 0;

  const finalTotal = totalDonation + additionalDonation;

  const handleCharityToggle = (charityId: string) => {
    setSelectedCharityIds((prev) =>
      prev.includes(charityId)
        ? prev.filter((id) => id !== charityId)
        : [...prev, charityId]
    );
  };

  const onSubmit = async (data: CharityDonationFormData) => {
    setLoading(true);
    setError(null);

    const selectedCharities = charities.filter((c) =>
      selectedCharityIds.includes(c.charityId)
    );

    const payload = {
      productId: product?.id,
      quantity: 1,
      extraDonation: additionalDonation,
      extraDonationAnonymous:
        additionalDonation > 0 ? data.extraDonationAnonymous : false,
      charities: selectedCharities.map((c) => ({ charityId: c.charityId })),
    };

    try {
      const res = await AddToCart({ payload, extraRevalidatePaths: [`/shop/${product?.id}`] });
      if (res?.error) {
        setError(res?.error);
        return; // keep dialog open so the user can see the error
      }
      dispatch(baseApi.util.invalidateTags([tagTypes.cart])); // Invalidate cart tag to refresh cart state
      onOpenChange(false);
    } catch (error: any) {
      if (isRedirectError(error)) {
        throw error; // Let Next.js handle the redirect
      }
      setError(error?.message || "An error occurred while adding to cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 rounded-none overflow-y-scroll max-h-screen">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-base font-medium text-gray-800">
            Which charities you want to add?
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 space-y-4">
          {/* Purchase Info */}
          <div className="flex gap-2">
            <div className="flex-1 bg-black text-white rounded-4xl px-4 py-3 text-center text-sm font-medium">
              Purchase Price: ${purchasePrice}
            </div>
            <div className="flex-1 bg-black text-white rounded-4xl px-4 py-3 text-center text-sm font-medium">
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
                      $
                      {selectedCharityIds.includes(item.charityId)
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                  $
                </span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="pl-6 pr-10 rounded-md focus-visible:ring-0 focus:ring-0 focus:border-2 focus-visible:border-black text-lg md:text-base py-5 border-gray-400"
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

            {/* Anonymous extra donation option — only relevant once they've entered an amount */}
            {additionalDonation > 0 && (
              <div className="flex items-center space-x-3">
                <Controller
                  name="extraDonationAnonymous"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="extraDonationAnonymous"
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                    />
                  )}
                />
                <Label
                  htmlFor="extraDonationAnonymous"
                  className="text-sm font-normal cursor-pointer"
                >
                  Make my additional donation anonymous
                </Label>
              </div>
            )}

            {/* Total */}
            <div className="pt-2">
              <p className="text-sm font-medium">
                Total Donation to Charities: ${finalTotal.toFixed(2)}
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit */}
            <div className="pt-2 pb-6">
              <Button
                type="submit"
                disabled={(donationPercentage > 0 && selectedCharityIds.length === 0) || loading}
                variant={"default"}
                className="w-full py-6 font-medium rounded-none cursor-pointer"
              >
                {loading ? <span className="loader" /> : buyMode === "cart" ? "Save to Cart" : "Continue to Checkout"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}