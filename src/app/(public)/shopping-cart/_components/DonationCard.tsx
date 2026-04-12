"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, RotateCcw, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToGiftTree, selectFullCart } from "@/redux/features/cart.slice";

export default function DonationCard() {
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustomSelected, setIsCustomSelected] = useState(false);

  const presetAmounts = [1, 5, 20, 50];
  const pricePerTree = 4;
  const pathName = usePathname();

  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectFullCart);
  const isGifted = cart.tree_gift.tree_count > 0;

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

  const handleGiftTrees = () => {
    if (treeCount < 0) return;

    dispatch(
      addToGiftTree({
        tree_count: treeCount,
        gift_amount: treeCount * pricePerTree,
      })
    );
  };

  const handleClearTrees = () => {
    dispatch(addToGiftTree({
      tree_count: 0,
      gift_amount: 0 * pricePerTree,
    }));
    handleReset();
  };

  const isPreset = presetAmounts.includes(cart.tree_gift.tree_count);

  // sync state when gifted trees are loaded (e.g. on page refresh or re-render)
  useEffect(() => {
    if (isGifted) {
      if (isPreset) {
        setSelectedAmount(cart.tree_gift.tree_count);
        setIsCustomSelected(false);
        setCustomAmount("");
      } else {
        setCustomAmount(String(cart.tree_gift.tree_count));
        setIsCustomSelected(true);
      }
    }
  }, [cart.tree_gift.tree_count]);

  return (
    <div className={cn(pathName === `/shopping-cart/billing-address` && "hidden")}>
      <Card className="w-full py-2 px-2">
        <CardContent className="p-6 space-y-6">

          {/* Header */}
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Number of trees to be planted:
            </h2>
            {isGifted && (
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-green-600">
                  ✓ {cart.tree_gift.tree_count} trees gifted (${cart.tree_gift.gift_amount.toFixed(2)})
                </p>

              </div>
            )}
          </div>

          {/* Preset Amount Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {presetAmounts.map((amount) => (
              <Button
                key={amount}
                variant={
                  selectedAmount === amount && !isCustomSelected
                    ? "default"
                    : "outline"
                }
                className={`h-12 text-base font-medium ${selectedAmount === amount && !isCustomSelected
                  ? "bg-black text-white hover:bg-black/90"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                onClick={() => handlePresetClick(amount)}
              >
                {amount}
              </Button>
            ))}
          </div>

          {/* Custom Tree Count */}
          <div className="space-y-3">
            <h3 className="text-base font-medium text-gray-900">
              Custom Tree
            </h3>
            <div className="relative">
              <Input
                type="number"
                placeholder="Enter number of trees"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="h-12 text-base bg-gray-100 border-gray-200 pr-12"
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
              className="flex-1 h-12 bg-black text-white hover:bg-black/90 text-base font-medium disabled:opacity-50 cursor-pointer"
            >
              <Gift className="mr-2 h-5 w-5" />
              {isGifted
                ? `UPDATE TREES GIFT`
                : "GIFT TREES"}
            </Button>

            {isGifted && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleClearTrees}
                className="h-12 px-4 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700"
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