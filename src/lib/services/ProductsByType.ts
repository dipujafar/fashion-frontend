import { tags } from "@/utils/serverTags";
import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetProductsByType = async ({ query }: { query: { [key: string]: string } }) => {
    try {
        const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";
        const res = await serverQueryWithReauth({
            endPoint: `/products/by-type${queryString}`,
            method: "GET",
            tags: [tags.products],
            revalidate: 3 * 60 // revalidate after 3 min
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetProductsByType;