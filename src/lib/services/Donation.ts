import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetMemberDonationStats = async ({ username }: { username: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/donations/stats/${username}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }

};

export default GetMemberDonationStats;

export const GetMemberSellDonations = async ({ username }: { username: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/donations/sell/${username}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const GetMemberPurchaseDonations = async ({ username }: { username: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/donations/purchase/${username}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const GetDirectMoneyDonations = async ({ username }: { username: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/donations/direct/${username}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const GetTreeDonations = async ({ username }: { username: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/donations/tree/${username}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};
