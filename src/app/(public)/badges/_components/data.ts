export interface Badge {
  id: string
  name: string
  description: string
  trigger: string
  icon: string,
  remaining?: number,
  total?: number
}

export const BADGES: Badge[] = [
  {
    id: "style-starter",
    name: "Style Starter",
    description: "Encourages users to begin selling and join the circular fashion movement.",
    trigger: "List your first two items for sale",
    icon: "👕",
    remaining: 0,
    total: 10
  },
  {
    id: "first-purchase",
    name: "First Purchase",
    description: "Marks your first contribution to sustainable fashion through buying.",
    trigger: "Purchase your first re-loved item",
    icon: "🛍️",
  },
  {
    id: "first-sale",
    name: "First Sale",
    description: "Recognises your first successful sale on the platform.",
    trigger: "Sell your first item",
    icon: "✓",
  },
  {
    id: "tree-planter",
    name: "Tree Planter",
    description: "Supports global reforestation and carbon offset initiatives.",
    trigger: "Donate to plant a tree",
    icon: "🌱",
  },
  {
    id: "clothing-donor",
    name: "Clothing Donor",
    description: "Promotes textile reuse and supports local charities.",
    trigger: "Donate clothes through the platform",
    icon: "🤝",
  },
  {
    id: "money-donor",
    name: "Money Donor",
    description: "Acknowledges users who contribute financially to good causes.",
    trigger: "Donate money to a supported charity",
    icon: "💚",
  },
  {
    id: "eco-hero",
    name: "Eco Hero",
    description: "Shows full sustainability commitment across all donation options.",
    trigger: "Complete all three donation types",
    icon: "🦸",
  },
  {
    id: "frequent-seller",
    name: "Frequent Seller",
    description: "Recognises consistent sellers who contribute to the re-use economy.",
    trigger: "Sell 50 total items",
    icon: "📦",
  },
  {
    id: "top-buyer",
    name: "Top Buyer",
    description: "Recognises active buyers who support circular shopping.",
    trigger: "Purchase 20 items",
    icon: "⭐",
  },
  {
    id: "speedy-shipper",
    name: "Speedy Shipper",
    description: "Promotes responsible and timely seller behaviour.",
    trigger: "Ship an order within 24 hours",
    icon: "🚚",
  },
  {
    id: "fashion-activist",
    name: "Fashion Activist",
    description: "Represents users who consistently champion sustainable actions across the app.",
    trigger: "Earn 10 or more total badges",
    icon: "✨",
  },
]
