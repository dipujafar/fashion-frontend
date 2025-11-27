import { z } from "zod";

export const productFormSchema = z.object({
  title: z.string().min(2, {
    message: "Product title must be at least 2 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a valid positive number.",
  }),
  discountedPrice: z.string().refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    {
      message: "Discount must be between 0 and 100.",
    }
  ),
  // itemNumber: z.string().min(1, {
  //   message: "Item number is required.",
  // }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "Please select at least one tag.",
  }),
  condition: z.string().min(1, {
    message: "Please select a condition.",
  }),
  fabric: z.string().min(1, {
    message: "Fabric information is required.",
  }),
  brand: z.string().min(1, {
    message: "Please select a brand.",
  }),
  availableSizes: z.string().min(1, {
    message: "Please specify available sizes.",
  }),
  color: z.string().min(1, {
    message: "Please select colors.",
  }),
  careInstructions: z.array(z.string()).optional(),

  donations: z.array(
    z.object({
      donateToCharity: z.string().min(1, "Please select a charity"),
      donationAmount: z.preprocess(
        (val) => Number(val),
        z.number().min(1).max(100)
      ),
    })
  ),

  donationPrivacy: z.enum(["anonymous", "show-name"], {
    required_error: "Please select donation privacy preference.",
  }),
  donateToCharity2: z.string().optional(),
  donationAmount2: z.string().optional(),
  productDescription: z.string().min(20, {
    message: "Product description must be at least 20 characters.",
  }),
  deliveryPolicy: z.string().min(10, {
    message: "Delivery policy must be at least 10 characters.",
  }),
  shippingDelivery: z.string().min(10, {
    message: "Shipping & returns information must be at least 10 characters.",
  }),
  durationTime: z.string().min(1, {
    message: "Duration time is required.",
  }),
  returnsPolicy: z.enum(["yes", "no"], {
    required_error: "Please select returns policy.",
  }),
  returnDescription: z.string().optional(),
  allowOffers: z.boolean().default(false),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const productFormDefaultValues = () => {
  return {
    title: "",
    price: "",
    discountedPrice: "0",
    // itemNumber: "",
    category: "",
    tags: [],
    condition: "",
    fabric: "",
    brand: "",
    availableSizes: "",
    color: "",
    careInstructions: [],
    donationPrivacy: undefined,
    donateToCharity2: "",
    donationAmount2: "",
    productDescription: "",
    deliveryPolicy: "",
    shippingDelivery: "",
    donations: [{ donateToCharity: "", donationAmount: 0 }],
    durationTime: "",
    returnsPolicy: undefined,
    returnDescription: "",
    allowOffers: false,
  };
};

// color data
export const colors = [
  { name: "Turquoise", hex: "#40E0D0" },
  { name: "Cream", hex: "#FFFDD0" },
  { name: "Apricot", hex: "#FBCEB1" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Rose", hex: "#FFB6C1" },
  { name: "Red", hex: "#FF0000" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#008000" },
  { name: "Orange", hex: "#FFA500" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Lilac", hex: "#C8A2C8" },
  { name: "Light blue", hex: "#ADD8E6" },
  { name: "Navy", hex: "#000080" },
  { name: "Dark green", hex: "#006400" },
  { name: "Mustard", hex: "#FFDB58" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Multi", hex: "linear-gradient(90deg, #FF0000, #00FF00, #0000FF)" },
  { name: "Khaki", hex: "#C3B091" },
  { name: "Mint", hex: "#98FF98" },
  { name: "Clear", hex: "transparent" },
  { name: "Black", hex: "#000000" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Gray", hex: "#808080" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Purple", hex: "#800080" },
];

export const shippingDelivery = [
  "UK Standard Shipping (3–5 working days)",
  "UK Express Shipping (1–2 working days)",
  "International Shipping (5–10 working days)",
];

export const returnsPolicy = [
  "Returns accepted – 3 days",
  "Returns accepted – 7 days",
  "Returns accepted – 14 days",
  "No returns",
];

export const careInstructionsOptions = [
  { id: "machine-wash-cold", label: "Machine wash cold" },
  { id: "hand-wash-only", label: "Hand wash only" },
  { id: "dry-clean-only", label: "Dry clean only" },
  { id: "tumble-dry-low", label: "Tumble dry low" },
  { id: "do-not-tumble-dry", label: "Do not tumble dry" },
  { id: "do-not-bleach", label: "Do not bleach" },
  { id: "iron-low-heat", label: "Iron low heat" },
  { id: "iron-medium-heat", label: "Iron medium heat" },
];
