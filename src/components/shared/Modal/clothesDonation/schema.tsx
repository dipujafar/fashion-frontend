import { z } from "zod"

const ITEM_TYPES = [
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

const BAG_CONTENTS = [
  "Women - mixed clothes",
  "Men - mixed clothes",
  "Kids - mixed clothes",
  "Unisex - mixed",
  "Home textiles",
  "Not sure / mixed bag"
] as const

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const
const CONDITIONS = ["New", "Like New", "3 Months Used", "6 Months Used", "1 Year Used", "Well Used", "Other"] as const
const WASHED_OPTIONS = ["Recently Washed", "All Washed", "Not Washed"] as const
const GENDERS = ["Women", "Men", "Kids", "Baby", "Unisex"] as const

export const singleItemSchema = z.object({
  itemType: z.array(z.string()).min(1, "Please select at least one item type"),
  gender: z.string().optional(),
  brand: z.string().optional(),
  condition: z.string().min(1, "Please select a condition"),
  washed: z.string().min(1, "Please select wash status"),
  description: z.string().optional(),
  photos: z.array(z.instanceof(File)).optional(),
})

export const bagItemSchema = z.object({
  bagContents: z.array(z.string()).min(1, "Please select at least one bag content"),
  itemTypes: z.array(z.string()).min(1, "Please select at least one item type"),
  mainBrands: z.string().optional(),
  approxItems: z.string().min(1, "Please select approximate number of items"),
  condition: z.string().min(1, "Please select overall condition"),
  washed: z.string().min(1, "Please select wash status"),
  description: z.string().optional(),
  photos: z.array(z.instanceof(File)).optional(),
})

export const donationSchema = z
  .object({
    donationType: z.enum(["single", "bag"]),
    singleItems: z.array(singleItemSchema).optional(),
    bagItems: bagItemSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.donationType === "single") return !!data.singleItems?.length
      if (data.donationType === "bag") return !!data.bagItems
      return false
    },
    { message: "Please fill in the required fields" },
  )

export { ITEM_TYPES, BAG_CONTENTS, SIZES, CONDITIONS, WASHED_OPTIONS, GENDERS }

export type SingleItem = z.infer<typeof singleItemSchema>
export type BagItem = z.infer<typeof bagItemSchema>
export type Donation = z.infer<typeof donationSchema>
