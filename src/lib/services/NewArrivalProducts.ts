import { tags } from "@/utils/serverTags";
import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetNewArrivalProds = async () => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/products/new-arrival`,
            method: "GET",
            tags: [tags.new_arrival],
            revalidate: 5 * 60 // revalidate after 5 min
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetNewArrivalProds;