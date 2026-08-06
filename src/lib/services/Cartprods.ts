import { tags } from "@/utils/serverTags";
import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetCartProds = async () => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/carts`,
            method: "GET",
            tags: [tags.carts],
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

const getCheckoutItems = async (cartGroupId: string) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/carts/${cartGroupId}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export { getCheckoutItems };

export default GetCartProds;