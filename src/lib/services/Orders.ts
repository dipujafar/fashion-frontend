import { tags } from "@/utils/serverTags";
import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetOrdersBySeller = async ({ query }: { query: { [key: string]: string } }) => {
    try {
        const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";

        const res = await serverQueryWithReauth({
            endPoint: `/orders/by-seller${queryString}`,
            method: "GET",
            tags: [tags.orders],
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetOrdersBySeller;