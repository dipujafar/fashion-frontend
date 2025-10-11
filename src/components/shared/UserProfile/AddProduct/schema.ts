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
  tags: z.string().min(1, {
    message: "Please add at least one tag.",
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
  careInstructions: z.string().min(10, {
    message: "Care instructions must be at least 10 characters.",
  }),

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
  shippingReturns: z.string().min(10, {
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
    tags: "",
    condition: "",
    fabric: "",
    brand: "",
    availableSizes: "",
    color: "",
    careInstructions: "",
    donationPrivacy: undefined,
    donateToCharity2: "",
    donationAmount2: "",
    productDescription: "",
    deliveryPolicy: "",
    shippingReturns: "",
    donations: [{ donateToCharity: "", donationAmount: 0 }],
    durationTime: "",
    returnsPolicy: undefined,
    returnDescription: "",
    allowOffers: false,
  };
};
