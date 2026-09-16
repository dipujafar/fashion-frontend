import { tags } from "@/utils/serverTags";
import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetTrendingProds = async () => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/products/trendings`,
            method: "GET",
            revalidate: 5 * 60 // revalidate after 5 min
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetTrendingProds;