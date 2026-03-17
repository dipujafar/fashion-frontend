import { productFormSchema } from "./schema";
import { z } from "zod";

type Charity = {
  donateToCharity: string;
  donationAmount: number;
};

export const formattedData = (data: z.infer<typeof productFormSchema>) => {
  const charities = data?.donations?.map((item: Charity) => ({
    charityId: item.donateToCharity,
    percent: Number(item.donationAmount),
    isAnonymous: data?.donationPrivacy === "anonymous",
  }));

  return {
    title: data?.title,
    description: data?.productDescription,
    price: Number(data?.price),
    discountPct: Number(data?.discountedPrice) || 0,
    currency: "USD",
    brandId: data?.brandId,
    sizeId: data?.sizeId,
    categoryId: data?.categoryId,
    condition: data?.condition,
    color: data?.color,
    tags: data?.tags,
    meterials: [data?.fabric],
    care_instructions: data?.careInstructions,
    allow_offer: data?.allowOffers,
    return_window: Number(data?.returnsPolicy),
    charities: charities,
  };
};
