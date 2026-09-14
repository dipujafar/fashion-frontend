import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetReturnsBySeller = async ({ query }: { query: { [key: string]: string } }) => {
    try {
        const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";

        const res = await serverQueryWithReauth({
            endPoint: `/returns/by-seller${queryString}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const GetReturnsByBuyer = async ({ query }: { query: { [key: string]: string } }) => {
    try {
        const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";

        const res = await serverQueryWithReauth({
            endPoint: `/returns/by-buyer${queryString}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetReturnsBySeller;