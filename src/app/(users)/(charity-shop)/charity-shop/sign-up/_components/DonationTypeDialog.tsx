"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";

interface DonationOption {
  key: string;
  title: string;
  label: string;
}

const donationData: DonationOption[] = [
  {
    key: "money",
    title: "Accept Money",
    label: "Donation",
  },
  {
    key: "both",
    title: "Accept",
    label: "both",
  },
  {
    key: "clothes",
    title: "Accept Clothes",
    label: "Donation",
  },
];

export default function DonationTypeDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<string>("both");

  const handleSelect = (key: string) => {
    setSelectedOption(key);
  };

  const handleSubmit = () => {
    console.log("Selected option:", selectedOption);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-8">
        <DialogHeader className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Choose any donate</p>
          <DialogTitle className="text-2xl font-bold">
            Available for donation
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 my-8">
          {donationData.map((option) => (
            <div
              key={option.key}
              onClick={() => handleSelect(option.key)}
              className={`
                  relative cursor-pointer rounded-2xl p-6 text-center transition-all duration-200 hover:scale-105
                  ${
                    selectedOption === option.key
                      ? "bg-green-800 text-white shadow-lg"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                  }
                `}
            >
              <div className="space-y-1">
                <div className="font-semibold text-lg leading-tight">
                  {option.title}
                </div>
                <div className="font-semibold text-lg leading-tight">
                  {option.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg font-semibold rounded-xl"
        >
          SELECT
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
