import { tags } from "@/utils/serverTags";
import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetRecentViewProds = async () => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/products/recent-views`,
            method: "GET",
            tags: [tags.recentView],
            cache: "no-store" // every req new data
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetRecentViewProds;