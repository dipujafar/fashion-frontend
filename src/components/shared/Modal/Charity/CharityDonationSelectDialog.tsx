"use client";;
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

interface Charity {
  id: string;
  name: string;
  amount: number;
}

interface CharityDonationFormData {
  selectedCharities: string[];
  additionalDonation: number;
}

interface CharityDonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchasePrice: number;
  donationPercentage: number;
}

const charities: Charity[] = [
  { id: "save-planet", name: "Save the Planet", amount: 29.3 },
  { id: "plant-trees", name: "Plant More Trees", amount: 29.3 },
  { id: "clean-oceans", name: "Clean Oceans", amount: 0.0 },
];

export function CharityDonationSelectDialog({
  open,
  onOpenChange,
  purchasePrice,
  donationPercentage,
}: CharityDonationDialogProps) {
  const [selectedCharities, setSelectedCharities] = useState<string[]>([
    "save-planet",
    "plant-trees",
  ]);
  const [additionalDonation, setAdditionalDonation] = useState<number>(0);

  const { handleSubmit } = useForm<CharityDonationFormData>({
    defaultValues: {
      selectedCharities: ["save-planet", "plant-trees"],
      additionalDonation: 0,
    },
  });

  const totalDonation = (purchasePrice * donationPercentage) / 100;
  const selectedCharityTotal = charities
    .filter((charity) => selectedCharities.includes(charity.id))
    .reduce((sum, charity) => sum + charity.amount, 0);

  const finalTotal = selectedCharityTotal + additionalDonation;

  const onSubmit = (data: CharityDonationFormData) => {
    console.log("Donation submitted:", {
      selectedCharities: data.selectedCharities,
      additionalDonation: data.additionalDonation,
      totalDonation: finalTotal,
    });
    onOpenChange(false);
  };

  const handleCharityToggle = (charityId: string) => {
    setSelectedCharities((prev) =>
      prev.includes(charityId)
        ? prev.filter((id) => id !== charityId)
        : [...prev, charityId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base font-normal text-muted-foreground">
              Which charities you want to add?
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-6 space-y-4">
          {/* Purchase Info */}
          <div className="flex gap-2">
            <div className="flex-1 bg-black text-white rounded-lg px-4 py-3 text-center text-sm font-medium">
              Purchase Price: ${purchasePrice}
            </div>
            <div className="flex-1 bg-black text-white rounded-lg px-4 py-3 text-center text-sm font-medium">
              Total Donation ({donationPercentage}%): $
              {totalDonation.toFixed(2)}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground">
            Seller has pledged {donationPercentage}% of this purchase to
            charity. Choose from the charity/charities they’ve selected to
            decide where the donation goes.
          </p>

          {/* Charity Options */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-3">
              {charities.map((charity) => (
                <div key={charity.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={charity.id}
                    checked={selectedCharities.includes(charity.id)}
                    onCheckedChange={() => handleCharityToggle(charity.id)}
                    className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <Label
                      htmlFor={charity.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {charity.name}
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      ${charity.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Donation */}
            <div className="space-y-2">
              <Label className="text-sm font-normal">
                Add an additional donation? (Optional)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
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
                    setAdditionalDonation(
                      Number.parseFloat(e.target.value) || 0
                    )
                  }
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
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

            {/* Submit Button */}
            <div className="pt-2 pb-6">
              <Button
                type="submit"
                className="w-full bg-black hover:bg-black/90 text-white py-3 rounded-lg font-medium"
              >
                SEND
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
