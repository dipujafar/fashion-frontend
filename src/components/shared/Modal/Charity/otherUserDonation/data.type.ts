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
    type: "Direct" as const,
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
    type: "Direct" as const,
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
    type: "Direct" as const,
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
    type: "Direct" as const,
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
    type: "Direct" as const,
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
    type: "Direct" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
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
