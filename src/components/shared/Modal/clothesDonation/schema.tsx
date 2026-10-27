import { z } from "zod"

export const ITEM_TYPES = [
  "T-Shirts",
  "Shirts",
  "Jumpers & Hoodies",
  "Cardigans",
  "Dresses",
  "Skirts",
  "Jeans",
  "Trousers",
  "Vests & Jackets",
  "Slippers",
  "Shoes",
  "Bags and Accessories",
  "Sportswear/Gymwear",
  "Nightwear & Loungewear",
  "Baby & Kids Clothes",
  "Home Textiles",
  "Other Clothing",
] as const

export const BAG_CONTENTS = [
  "Women - mixed clothes",
  "Men - mixed clothes",
  "Kids - mixed clothes",
  "Unisex - mixed",
  "Home textiles",
  "Not sure / mixed bag",
] as const

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const

export const CONDITIONS = [
  "New with Tags",
  "New",
  "Like New",
  "3 Months Used",
  "6 Months Used",
  "1 Year Used",
  "Well Used",
  "Other",
] as const

export const BAG_CONDITIONS = [
  "Mixed (some good, some worn)",
  "Mostly good",
  "Mostly worn",
  "Like new",
] as const

export const ITEMS_COUNT_OPTIONS = [
  { label: "5-10 items", value: "5-10" },
  { label: "10-20 items", value: "10-20" },
  { label: "20-30 items", value: "20-30" },
  { label: "30-50 items", value: "30-50" },
  { label: "50+ items", value: "50+" },
] as const

export const WASHED_OPTIONS = [
  { label: "Recently Washed", value: "RECENT_WASHED" },
  { label: "All Washed", value: "WASHED" },
  { label: "Not Washed", value: "UNWASHED" },
] as const

export const GENDERS = ["Women", "Men", "Kids", "Baby", "Unisex"] as const

export const donationSchema = z.object({
  donationType: z.enum(["SINGLE", "MULTIPLE"]),
  itemTypes: z.array(z.string()).min(1, "Please select at least one item type"),
  personTypes: z.array(z.string()).min(1, "Please select who it is for"),
  brands: z.array(z.string()).optional(),
  itemsCount: z.string().min(1, "Please select approximate number of items"),
  condition: z.string().min(1, "Please select a condition"),
  washedType: z
    .string({ required_error: "Please select wash status" })
    .min(1, "Please select wash status")
    .refine(
      (val) => ["RECENT_WASHED", "WASHED", "UNWASHED"].includes(val),
      "Please select a valid wash status"
    ),
  description: z.string().optional(),
})

export type Donation = z.infer<typeof donationSchema>
