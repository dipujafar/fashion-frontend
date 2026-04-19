import { tags } from "@/utils/serverTags";
import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetRecommendedProds = async () => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/products/recommended`,
            method: "GET",
            tags: [tags.recommended],
            revalidate: 5 * 60 // revalidate after 5 min
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetRecommendedProds;