"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, RotateCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DonationCard() {
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const presetAmounts = [1, 5, 20, 50];
  const pricePerTree = 4; 
  const pathName = usePathname();

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustomSelected(false);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(Number.parseInt(value) || 0);
      setIsCustomSelected(true);
    }
  };

  const totalPrice = selectedAmount * pricePerTree;

  return (
    <div className={cn(pathName === `/shopping-cart/billing-address` && "hidden")}>
      <Card className="w-full py-2 px-2">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Number of trees to be planted:
            </h2>
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
                className={`h-12 text-base font-medium ${
                  selectedAmount === amount && !isCustomSelected
                    ? "bg-black text-white hover:bg-black/90"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handlePresetClick(amount)}
              >
                {amount}
              </Button>
            ))}
          </div>

          {/* Custom Amount Section */}
          <div className="space-y-3">
            <h3 className="text-base font-medium text-gray-900">Others</h3>
            <div className="relative">
              <Input
                type="number"
                placeholder="20"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="h-12 text-base bg-gray-100 border-gray-200 pr-12"
                min="1"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setCustomAmount("");
                  setIsCustomSelected(false);
                  setSelectedAmount(5);
                }}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Price Display */}
          <div className="pt-2">
            <p className="text-xl font-semibold text-gray-900">
              ${totalPrice.toFixed(2)} USD
            </p>
          </div>

          {/* Gift Button */}
          <Button size={"sm"} className="w-full h-12 bg-black text-white hover:bg-black/90 text-base font-medium">
            <Gift className="mr-2 h-5 w-5" />
            GIFT TREES
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
