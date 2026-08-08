"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, RotateCcw, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { updateTreeGiftToCheckout } from "@/lib/Actions/Cart.action";
import { toast } from "sonner";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default function DonationCard({ cartGroupId, defaultCostAmount }: { cartGroupId: string, defaultCostAmount: number }) {
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustomSelected, setIsCustomSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const presetAmounts = [1, 5, 20, 50];
  const pricePerTree = 4;
  const pathName = usePathname();

  const isGifted = defaultCostAmount > 0;

  const treeCount = isCustomSelected
    ? (customAmount === "" ? 0 : parseInt(customAmount))
    : selectedAmount;
  const totalPrice = treeCount * pricePerTree;

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustomSelected(false);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);

    if (value === "") {
      setIsCustomSelected(false);
      setSelectedAmount(5);
    } else {
      setIsCustomSelected(true);
    }
  };

  const handleReset = () => {
    setCustomAmount("");
    setIsCustomSelected(false);
    setSelectedAmount(5);
  };

  const handleGiftTrees = async () => {
    if (treeCount < 0) return;

    setIsLoading(true);

    try {
      const res = await updateTreeGiftToCheckout({ treeGiftCount: treeCount, cartGroupId });
      if (res?.error) {
        toast.error(res?.error || "Something went wrong, try again");
      }
    }
    catch (error: any) {
      if (isRedirectError(error)) {
        throw error; // Let Next.js handle the redirect
      }
      toast.error(error?.data?.message || "Something went wrong, try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearTrees = async () => {
    setIsLoading(true);

    try {
      const res = await updateTreeGiftToCheckout({ treeGiftCount: 0, cartGroupId });
      if (res?.error) {
        toast.error(res?.error || "Something went wrong, try again");
      }
    }
    catch (error: any) {
      if (isRedirectError(error)) {
        throw error; // Let Next.js handle the redirect
      }
      toast.error(error?.data?.message || "Something went wrong, try again");
    } finally {
      setIsLoading(false);
    }
    handleReset();
  };

  const isPreset = presetAmounts.includes(defaultCostAmount);

  // sync state when gifted trees are loaded (e.g. on page refresh or re-render)
  useEffect(() => {
    if (isGifted) {
      if (isPreset) {
        setSelectedAmount(defaultCostAmount);
        setIsCustomSelected(false);
        setCustomAmount("");
      } else {
        setCustomAmount(String(defaultCostAmount / 4));
        setIsCustomSelected(true);
      }
    }
  }, [defaultCostAmount]);

  return (
    <div className={cn(pathName === `/shopping-cart/billing-address` && "hidden")}>
      <Card className="w-full rounded-none">
        <CardContent className="space-y-3">

          {/* Header */}
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Number of trees to be planted:
            </h2>
            {isGifted && (
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-green-600">
                  ✓ {Math.round(defaultCostAmount / 4)} trees gifted (${(defaultCostAmount).toFixed(2)})
                </p>
              </div>
            )}
          </div>

          {/* Preset Amount Buttons */}
          <div className="flex flex-row gap-2 flex-wrap">
            {presetAmounts.map((amount) => (
              <Button
                key={amount}
                variant={"outline"}
                className={`h-12 px-5 text-base font-medium cursor-pointer ${selectedAmount === amount && !isCustomSelected
                  ? "border-2 border-primary-black bg-primary-black/10 text-primary-black"
                  : ""
                  }`}
                onClick={() => handlePresetClick(amount)}
              >
                {amount}
              </Button>
            ))}
          </div>

          {/* Custom Tree Count */}
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-900">
              Custom Tree
            </h3>
            <div className="relative">
              <Input
                type="number"
                placeholder="Enter number of trees"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="h-10 pr-12 rounded-md focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-black text-base md:text-base py-5 border-gray-400"
                min={0}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Price Display */}
          <div className="pt-2 flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-900">
              ${totalPrice.toFixed(2)} USD
            </p>
            <p className="text-sm text-gray-500">
              {treeCount} tree{treeCount !== 1 ? "s" : ""} × ${pricePerTree}
            </p>
          </div>

          {/* Gift / Clear Button */}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleGiftTrees}
              disabled={treeCount < 0}
              className="flex-1 py-5 bg-black text-white hover:bg-black/90 text-sm font-medium disabled:opacity-50 cursor-pointer rounded-none"
            >
              <Gift className="mr-2 h-5 w-5" />
              {isLoading ? <span className="loader" /> : isGifted ? `UPDATE TREES GIFT` : "GIFT TREES"}
            </Button>

            {isGifted && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleClearTrees}
                className="py-5 px-4 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer rounded-md"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}