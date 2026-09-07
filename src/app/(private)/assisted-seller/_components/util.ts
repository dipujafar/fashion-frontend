import { z } from "zod";
import { formSchema } from "./AssistedSellerForm";

export const formattedAssistedSellerData = (data: z.infer<typeof formSchema>) => {

    return {
        itemsCount: Number(data?.itemsCount),

        itemsDetails: data?.itemsDetails,
        additionalNotes: data?.additionalNotes,

        priceType: data?.priceType,

        targetPrice: Number(data?.targetPrice),

        contactNumber: data?.contactNumber,

        charities: data?.charities,
        donationPct: data?.donationPct ? Number(data?.donationPct) : 0,

        donationAnonymous: data?.donationAnonymous,

        weight_kg: data?.weight_kg ? Number(data?.weight_kg) : 0,

        length_cm: data?.length_cm ? Number(data?.length_cm) : 0,

        width_cm: data?.width_cm ? Number(data?.width_cm) : 0,

        hight_cm: data?.hight_cm ? Number(data?.hight_cm) : 0,
    };
};