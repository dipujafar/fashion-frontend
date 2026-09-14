import { tags } from "@/utils/serverTags";
import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetCategoriesHairerchy = async () => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/category`,
            method: "GET",
            tags: [tags.category_hairerchy]
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetCategoriesHairerchy;

export const GetCategoryParentChainByCategory = async (catId ?: string) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/category/parent/${catId}`,
            method: "GET",
            tags: [tags.category_hairerchy],
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};