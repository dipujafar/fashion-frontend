"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { IndividualCharityDonationFormDialog } from "./IndividualCharityDonationFormDialog";
import CommonButton from "@/components/ui/common-button";

interface Donation {
  id: string;
  donor: string;
  amount: string;
  timeAgo: string;
}

const mockDonations: Donation[] = [
  { id: "1", donor: "Anonymous", amount: "£20", timeAgo: "6 mos" },
  { id: "2", donor: "Fred Adu", amount: "£20", timeAgo: "6 mos" },
  { id: "3", donor: "Anonymous", amount: "£20", timeAgo: "6 mos" },
  { id: "4", donor: "Fred Adu", amount: "£20", timeAgo: "6 mos" },
  { id: "5", donor: "Anonymous", amount: "£20", timeAgo: "6 mos" },
  { id: "6", donor: "Fred Adu", amount: "£20", timeAgo: "6 mos" },
  { id: "7", donor: "Anonymous", amount: "£20", timeAgo: "6 mos" },
  { id: "8", donor: "Fred Adu", amount: "£20", timeAgo: "6 mos" },
  { id: "9", donor: "Anonymous", amount: "£20", timeAgo: "6 mos" },
  { id: "10", donor: "Fred Adu", amount: "£20", timeAgo: "6 mos" },
];
const topMockDonations: Donation[] = [
  { id: "1", donor: "Anonymous", amount: "£20", timeAgo: "6 mos" },
  { id: "2", donor: "Fred Adu", amount: "£20", timeAgo: "6 mos" },
  { id: "3", donor: "Anonymous", amount: "£20", timeAgo: "6 mos" },
];

interface DonationHistoryDialogProps {
  totalDonations?: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function GotDonationHistoryDialog({
  totalDonations = 200,
  open,
  setOpen,
}: DonationHistoryDialogProps) {
  const [openDonationModal, setOpenDonationModal] = useState(false);
  const handleDonateNow = () => {
    setOpen(false);
    setOpenDonationModal(true);

    // This could trigger opening the donation form dialog
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md p-0 gap-0 max-h-[80vh]">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-lg font-medium">
              Donation ({totalDonations})
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-full">
            <Tabs defaultValue="newest" className="flex flex-col flex-1">
              <TabsList className="grid w-full grid-cols-2 mx-4 mt-4 max-w-sm">
                <TabsTrigger
                  value="newest"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Newest
                </TabsTrigger>
                <TabsTrigger
                  value="top"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Top
                </TabsTrigger>
              </TabsList>

              <TabsContent value="newest" className="flex-1 mt-4">
                <GotDonationHistoryTable data={mockDonations} />
              </TabsContent>

              <TabsContent value="top" className="flex-1 mt-4">
                <GotDonationHistoryTable data={topMockDonations} />
              </TabsContent>
            </Tabs>

            <div className="p-4 pt-6 border-t">
              <CommonButton
                handlerFunction={handleDonateNow}
                className="w-full bg-transparent border-b-2 border-r-2 border-black  text-black hover:bg-gray-100"
              >
                {" "}
                DONATE NOW
              </CommonButton>
              {/* <Button
                onClick={handleDonateNow}
                className="w-full bg-black text-white hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                DONATE NOW
                <ArrowRight className="h-4 w-4" />
              </Button> */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <IndividualCharityDonationFormDialog showTrigger={false} open={openDonationModal} setOpen={setOpenDonationModal} />
    </>
  );
}

//  display data in a table
export const GotDonationHistoryTable = ({ data }: { data: Donation[] }) => {
  return (
    <div className="px-4 space-y-3 max-h-96 overflow-y-auto">
      {data.map((donation) => (
        <div key={donation.id} className="flex flex-col space-y-1">
          <div className="font-medium text-sm">{donation.donor}</div>
          <div className="text-xs text-muted-foreground">
            {donation.amount} • {donation.timeAgo}
          </div>
        </div>
      ))}
    </div>
  );
};
