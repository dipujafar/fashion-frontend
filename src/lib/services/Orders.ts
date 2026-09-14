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

export default GetOrdersBySeller;