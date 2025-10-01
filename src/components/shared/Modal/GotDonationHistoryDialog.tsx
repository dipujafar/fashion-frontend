import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { IndividualCharityDonationFormDialog } from "./IndividualCharityDonationFormDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

interface Donation {
  id: string;
  donor: string;
  amount: string;
  timeAgo: string;
  type:
    | "direct"
    | "item_sale"
    | "purchase"
    | "extra_donation"
    | "tree_donation";
  itemName?: string;
  isAnonymous?: boolean;
}

interface DonationStats {
  totalRaised: string;
  directDonations: string;
  itemSalesProceeds: string;
  itemsDonated: number;
  contributionsFromPurchases: string;
  extraDonations: string;
}

interface CharityDonationHistoryDialogProps {
  totalDonations?: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  stats?: DonationStats;
  charityName?: string;
}

const mockCharityDonations: Donation[] = [
  {
    id: "1",
    donor: "Anonymous",
    amount: "£50",
    timeAgo: "2 hrs",
    type: "direct",
  },
  {
    id: "2",
    donor: "Fred Adu",
    amount: "£25",
    timeAgo: "1 day",
    type: "item_sale",
    itemName: "Vintage Jacket",
  },
  {
    id: "3",
    donor: "Sarah Johnson",
    amount: "£15",
    timeAgo: "2 days",
    type: "direct",
  },
  {
    id: "4",
    donor: "Store Purchase",
    amount: "£10",
    timeAgo: "3 days",
    type: "purchase",
  },
  {
    id: "5",
    donor: "Anonymous",
    amount: "£30",
    timeAgo: "1 week",
    type: "extra_donation",
  },
];

const defaultStats: DonationStats = {
  totalRaised: "£2,450",
  directDonations: "£1,200",
  itemSalesProceeds: "£950",
  itemsDonated: 15,
  contributionsFromPurchases: "£180",
  extraDonations: "£300",
};

export function GotDonationHistoryDialog({
  open,
  setOpen,
  stats = defaultStats,
}: CharityDonationHistoryDialogProps) {
  const [openDonationModal, setOpenDonationModal] = useState(false);
  const pathName = usePathname();

  const handleDonateNow = () => {
    setOpen(false);
    setOpenDonationModal(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md p-0 gap-0 max-h-[80vh]">
          <div className="flex flex-col h-full pt-8">
            <div className="px-4 py-3 bg-muted/50 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Raised:</span>
                <span className="font-semibold">{stats.totalRaised}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Direct Donations:</span>
                <span className="font-medium">{stats.directDonations}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Item Sales Proceeds:</span>
                <span className="font-medium">{stats.itemSalesProceeds}</span>
              </div>
            </div>

            <Tabs defaultValue="newest" className="flex flex-col flex-1">
              <TabsList className="grid w-full grid-cols-2 mx-4 mt-4 max-w-sm">
                <TabsTrigger
                  value="newest"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Recent
                </TabsTrigger>
                <TabsTrigger
                  value="top"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Top
                </TabsTrigger>
              </TabsList>

              <TabsContent value="newest" className="flex-1 mt-4">
                <CharityDonationTable data={mockCharityDonations} />
              </TabsContent>

              <TabsContent value="top" className="flex-1 mt-4">
                <CharityDonationTable data={mockCharityDonations.slice(0, 3)} />
              </TabsContent>
            </Tabs>

            <div className="p-4 pt-6 border-t">
              {pathName !== "/charity/profile" && (
                <Button
                  onClick={handleDonateNow}
                  className="w-full bg-transparent border-b-2 border-r-2 border-primary text-primary hover:bg-primary/10 flex items-center justify-center gap-2"
                >
                  DONATE NOW
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Donation form dialog would be rendered here */}
      {openDonationModal && (
        <IndividualCharityDonationFormDialog
          showTrigger={false}
          open={openDonationModal}
          setOpen={setOpenDonationModal}
        />
      )}
    </>
  );
}

interface CharityDonationTableProps {
  data: Donation[];
}

export const CharityDonationTable = ({ data }: CharityDonationTableProps) => {
  const getDisplayText = (donation: Donation) => {
    return {
      primary: donation.isAnonymous ? "Anonymous" : donation.donor,
      secondary: `${donation.amount} • ${donation.timeAgo}${
        donation.itemName ? ` • ${donation.itemName}` : ""
      }`,
      badge:
        donation.type === "item_sale"
          ? "Item Sale"
          : donation.type === "direct"
          ? "Direct"
          : "Purchase",
    };
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Direct":
        return "bg-green-100 text-green-800";
      case "Item Sale":
        return "bg-blue-100 text-blue-800";
      case "Purchase":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="px-4 space-y-3 max-h-96 overflow-y-auto">
      {data.map((donation) => {
        const display = getDisplayText(donation);
        return (
          <div
            key={donation.id}
            className="flex flex-col space-y-2 p-3 rounded-lg bg-background border"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-x-1.5">
                  {display.primary !== "Anonymous" && (
                    <Avatar className="size-10">
                      <AvatarImage src={"/placeholder.svg"} alt="avatar" />
                      <AvatarFallback>
                        {display?.primary?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div className="font-medium text-sm">{display.primary}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {display.secondary}
                    </div>
                  </div>
                </div>
              </div>
              {display.badge && (
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor(
                    display.badge
                  )}`}
                >
                  {display.badge}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
