import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetProducts = async ({ query }: { query: { [key: string]: string } }) => {
    try {
        const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";
        const res = await serverQueryWithReauth({
            endPoint: `/products${queryString}`,
            method: "GET",
            cache: "no-store"
            // revalidate: 3 * 60 // revalidate after 3 min
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetProducts;

export const GetAuthenticProducts = async ({ query }: { query: { [key: string]: string } }) => {
    try {
        const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";
        const res = await serverQueryWithReauth({
            endPoint: `/products/authenticate${queryString}`,
            method: "GET",
            revalidate: 5 * 60 // revalidate after 5 min
        });
        return res;
    } catch (err) {
        throw err;
    }
};

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

export const MySellProducts = async ({ query }: { query: { [key: string]: string } }) => {
    try {
        const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";
        const res = await serverQueryWithReauth({
            endPoint: `/products/my-items${queryString}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const GetProductCharitySupport = async ({ productId }: { productId: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/products/donation-support/${productId}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const GetSimilarFromSeller = async ({ productId }: { productId: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/products/similar-from-seller/${productId}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};
export const GetSimilarCategoryProds = async ({ productId }: { productId: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/products/same-category/${productId}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};
export const GetSimilarColorProds = async ({ productId }: { productId: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/products/same-color/${productId}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};