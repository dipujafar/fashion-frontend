import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetProducts = async ({ query }: { query: { [key: string]: string } }) => {
    try {
        const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";
        const res = await serverQueryWithReauth({
            endPoint: `/products${queryString}`,
            method: "GET",
            // revalidate: 3 * 60 // revalidate after 3 min
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetProducts;

export const GetProductsByMember = async ({ query, userName }: { query: { [key: string]: string }, userName: string }) => {
    try {
        const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";
        const res = await serverQueryWithReauth({
            endPoint: `/products/member/${userName}${queryString}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};