export interface Donation {
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

export interface DonationStats {
  totalRaised: string;
  directDonations: string;
  itemSalesProceeds: string;
  itemsDonated: number;
  contributionsFromPurchases: string;
  extraDonations: string;
}



export interface CharityDonationTableProps {
  data: Donation[];
}

export interface CharityDonationHistoryDialogProps {
  totalDonations?: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  stats?: DonationStats;
  charityName?: string;
}





export const mockCharityDonations: Donation[] = [
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

export const defaultStats: DonationStats = {
  totalRaised: "£2,450",
  directDonations: "£1,200",
  itemSalesProceeds: "£950",
  itemsDonated: 15,
  contributionsFromPurchases: "£180",
  extraDonations: "£300",
};


export const getBadgeColor = (type: string) => {
    switch (type) {
      case "Direct":
        return "bg-green-100 text-green-800";
      case "Item Sold":
        return "bg-blue-100 text-blue-800";
      case "Extra Donation":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
