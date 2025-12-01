export type DonationType = "direct" | "purchase" | "item-sale";

interface Donation {
  id: string;
  name: string;
  avatar?: string;
  amount: string;
  time: string;
  item?: string;
  type: DonationType;
  extraDonation?: string;
}

export const moneyDonations: Donation[] = [
  {
    id: "1",
    name: "Fred Adu",
    avatar: "https://i.pravatar.cc/150?img=12",
    amount: "£20",
    time: "6 mos",
    item: "Jacket",
    extraDonation: "£10",
    type: "item-sale",
  },
  {
    id: "2",
    name: "Fred Adu",
    avatar: "https://i.pravatar.cc/150?img=13",
    amount: "£20",
    time: "6 mos",
    item: "Jacket",

    type: "purchase",
  },
  {
    id: "3",
    name: "Fred Adu",
    avatar: "https://i.pravatar.cc/150?img=14",
    amount: "£20",
    time: "6 mos",
    item: "Jacket",
    extraDonation: "£10",
    type: "direct",
  },
  {
    id: "4",
    name: "Anonymous",
    amount: "£20",
    time: "6 mos",
    type: "direct",
  },
  {
    id: "5",
    name: "Fred Adu",
    avatar: "https://i.pravatar.cc/150?img=15",
    amount: "£20",
    time: "6 mos",
    item: "Jacket",
    extraDonation: "£10",
    type: "purchase",
  },
  {
    id: "6",
    name: "Fred Adu",
    avatar: "https://i.pravatar.cc/150?img=16",
    amount: "£20",
    time: "6 mos",
    item: "Jacket",
    type: "item-sale",
  },
  {
    id: "7",
    name: "Anonymous",
    amount: "£20",
    time: "6 mos",
    type: "direct",
  },
  {
    id: "8",
    name: "Fred Adu",
    avatar: "https://i.pravatar.cc/150?img=17",
    amount: "£20",
    time: "6 mos",
    item: "Jacket",
    type: "purchase",
  },
  {
    id: "9",
    name: "Fred Adu",
    avatar: "https://i.pravatar.cc/150?img=18",
    amount: "£20",
    time: "6 mos",
    item: "Jacket",
    type: "purchase",
  },
];

export interface ClothingDonation {
  id: string;
  name: string;
  avatar?: string;
  time: string;
  items: string[];
}

export const clothingDonations: ClothingDonation[] = [
  {
    id: "1",
    name: "John Smith",
    avatar: "https://i.pravatar.cc/",
    time: "2 months",
    items: ["T-shirts", "Jeans"],
  },
  {
    id: "2",
    name: "Alice M.",
    avatar: "https://i.pravatar.cc/150?img=2",
    time: "2 months",
    items: ["Dresses", "Shirts"],
  },
  {
    id: "3",
    name: "Sarah B.",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "2 months",
    items: ["T-shirts", "Jeans", "Jackets", "Sweaters"],
  },
  {
    id: "4",
    name: "Anonymous",
    time: "6 mos",
    items: ["Hoodies", "Jeans"],
  },
  {
    id: "5",
    name: "Sarah B.",
    avatar: "https://i.pravatar.cc/150?img=4",
    time: "6 mos",
    items: ["T-shirts", "Jeans", "Jackets"],
  },
  {
    id: "6",
    name: "Sarah B.",
    avatar: "https://i.pravatar.cc/150?img=5",
    time: "6 mos",
    items: ["T-shirts", "Jeans", "Jackets"],
  },
  {
    id: "7",
    name: "Anonymous",
    time: "6 mos",
    items: ["Hoodies", "Jeans"],
  },
  {
    id: "8",
    name: "Sarah B.",
    avatar: "https://i.pravatar.cc/150?img=6",
    time: "6 mos",
    items: ["T-shirts", "Jeans", "Jackets"],
  },
  {
    id: "9",
    name: "Sarah B.",
    avatar: "https://i.pravatar.cc/150?img=7",
    time: "6 mos",
    items: ["T-shirts", "Jeans", "Jackets"],
  },
];

export interface DonationPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
