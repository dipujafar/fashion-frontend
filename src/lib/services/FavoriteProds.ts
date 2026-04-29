import { tags } from "@/utils/serverTags";
import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetFavouriteProds = async () => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/favourites`,
            method: "GET",
            tags: [tags.favourites],
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetFavouriteProds;