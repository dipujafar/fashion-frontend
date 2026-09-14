import { tags } from "@/utils/serverTags";
import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetCartProds = async () => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/carts`,
            method: "GET",
            tags: [tags.carts],
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const getCheckoutItems = async (cartGroupId: string) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/carts/${cartGroupId}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const GetOfferItems = async (offerId  : string) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/carts/offer/${offerId}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const getOfferCheckoutSummary = async ({ offerId }: { offerId: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/carts/checkout/offer/${offerId}/summary`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const getOfferShippingRates = async ({ offerId }: { offerId: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/carts/checkout/offer/${offerId}/shipping-rates`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const getCartSummary = async ({ cartGroupId }: { cartGroupId: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/carts/checkout/${cartGroupId}/summary`,
            method: "GET",
            cache: "no-store",
            tags: [tags.cart_summary]
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetCartProds;

export const getCheckoutShippingRates = async ({ cartGroupId }: { cartGroupId: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/carts/checkout/${cartGroupId}/shipping-rates`,
            method: "GET",
            cache: "no-store",
            tags: [tags.shipping_rates]
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const getBundleItemsBySeller = async (cartGroupId: string) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/carts/${cartGroupId}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};