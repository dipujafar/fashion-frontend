import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetProductDetails = async ({ id }: { id: string }) => {
    try {
        const res = await serverQueryWithReauth({ endPoint: `/products/${id}`, method: "GET", tags: [], cache: "no-store" });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetProductDetails;

export const GetQuesAnsWithProdDetails = async ({ prodId }: { prodId: string }) => {
    try {
        const res = await serverQueryWithReauth({ endPoint: `/questions/${prodId}`, method: "GET", tags: [], cache: "no-store" });
        return res;
    } catch (err) {
        throw err;
    }
};