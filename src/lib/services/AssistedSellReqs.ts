import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

export const GetAssistedSellReqs = async ({ query }: { query: { [key: string]: string } }) => {
    try {
        const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";
        const res = await serverQueryWithReauth({
            endPoint: `/assistent-sell/requests${queryString}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};