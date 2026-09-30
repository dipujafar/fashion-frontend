import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetOrdersBySeller = async ({ query }: { query: { [key: string]: string } }) => {
    try {
        const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";

        const res = await serverQueryWithReauth({
            endPoint: `/orders/by-seller${queryString}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const GetOrdersByBuyer = async ({ query }: { query: { [key: string]: string } }) => {
    try {
        const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";

        const res = await serverQueryWithReauth({
            endPoint: `/orders/by-buyer${queryString}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const GetOrderDetailsByCode = async ({ orderCode }: { orderCode: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/orders/details/${encodeURIComponent(orderCode)}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err: any) {
        return {
            success: false,
            message: err?.message || "Failed to fetch order details",
            data: null
        };
    }
};

export default GetOrdersBySeller;