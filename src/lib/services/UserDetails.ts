import { serverQueryWithReauth } from "../Actions/ReAuthRequest";

const GetUserDetails = async ({ userName }: { userName: string }) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/users/${userName}`,
            method: "GET",
            cache: "no-store"
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetUserDetails;