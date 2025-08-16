"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface CharityDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CharityHistoryDialog({ open, setOpen }: CharityDialogProps) {
  // Sample donation data - in a real app this would come from props or API
  const donations = Array(13).fill({
    charity: "Save the Planet",
    amount: 75,
  });

  const totalAmount = donations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-0 bg-white rounded-lg overflow-hidden">
        {/* Custom close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-2 top-2 z-10 text-white hover:text-gray-300 transition-colors bg-red-500 rounded-full size-7 flex-center cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="bg-black text-white px-10 py-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Charity Name</span>
            <span className="font-medium">Donation Raised</span>
          </div>
        </div>

        {/* Donation List */}
        <div className="max-h-80 overflow-y-auto">
          {donations.map((donation, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-6 py-3 border-b border-gray-100 last:border-b-0"
            >
              <span className="text-gray-700">{donation.charity}</span>
              <span className="text-gray-700 font-medium">
                ${donation.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-black text-white px-6 py-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Amount</span>
            <span className="font-bold">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
