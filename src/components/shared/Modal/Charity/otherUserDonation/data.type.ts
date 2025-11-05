export const sellerCampaigns = [
  {
    id: 1,
    name: "Save the Animals",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Item sale" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Plant More Trees",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Item sale" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PlantTrees",
  },
  {
    id: 3,
    name: "Women's Rights",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Item sale" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=WomensRights",
  },
  {
    id: 4,
    name: "Plant More Trees",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Item sale" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PlantTrees2",
  },
  {
    id: 5,
    name: "Save the Animals",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Item sale" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SaveAnimals2",
  },
  {
    id: 6,
    name: "Plant More Trees",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Item sale" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PlantTrees3",
  },
  {
    id: 7,
    name: "Save the Animals",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Item sale" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SaveAnimals3",
  },
];

export const buyerCampaigns = [
  {
    id: 1,
    name: "Save the Animals",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Purchase" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Plant More Trees",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Purchase" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Women's Rights",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Purchase" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 4,
    name: "Plant More Trees",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Purchase" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 5,
    name: "Save the Animals",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Purchase" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 6,
    name: "Plant More Trees",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Purchase" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
];
export const directDonations = [
  {
    id: 1,
    name: "Save the Animals",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Direct" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Plant More Trees",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Direct" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Women's Rights",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Direct" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 4,
    name: "Plant More Trees",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Direct" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 5,
    name: "Save the Animals",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Direct" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 6,
    name: "Plant More Trees",
    amount: "£20",
    time: "6 mos",
    item: "T-Shirt",
    type: "Direct" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
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
    name: "Women's Rights",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PlantTrees3",
    time: "2 months",
    items: ["T-shirts", "Jeans"],
  },
  {
    id: "2",
    name: "Plant More Trees",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PlantTrees3",
    time: "2 months",
    items: ["Dresses", "Shirts"],
  },
  {
    id: "3",
    name: "Save the Animals",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PlantTrees3",
    time: "2 months",
    items: ["T-shirts", "Jeans", "Jackets", "Sweaters"],
  },
  {
    id: "5",
    name: "Save the Animals",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PlantTrees3",
    time: "6 mos",
    items: ["T-shirts", "Jeans", "Jackets"],
  },
  {
    id: "6",
    name: "Women's Rights",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PlantTrees3",
    time: "6 mos",
    items: ["T-shirts", "Jeans", "Jackets"],
  },
 
  {
    id: "8",
    name: "Save the Animals",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PlantTrees3",
    time: "6 mos",
    items: ["T-shirts", "Jeans", "Jackets"],
  },
  {
    id: "9",
    name: "Plant More Trees",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PlantTrees3",
    time: "6 mos",
    items: ["T-shirts", "Jeans", "Jackets"],
  },
];

export const getBadgeVariant = (type: string) => {
  switch (type) {
    case "Direct":
      return "default";
    case "Purchase":
      return "secondary";
    case "Item sale":
      return "outline";
    default:
      return "default";
  }
};
