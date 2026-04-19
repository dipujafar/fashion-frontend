import { EnvConfig } from "@/config";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const serverQueryWithReauth = async ({ payload, endPoint, method, tags = [], revalidate, cache }: { payload?: any, endPoint: string, method: string, tags?: string[], revalidate?: number, cache?: "force-cache" | "no-store" }) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("fashion-access-token")?.value;
    const refreshToken = cookieStore.get('fashion-refresh-token')?.value;

    const makeRequest = async (token?: string) => {

        const isJsonPayload = payload && !(payload instanceof FormData) && !(payload instanceof URLSearchParams);

        return fetch(
            EnvConfig.serverBaseUrl + endPoint,
            {
                method,
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    ...(isJsonPayload ? { "Content-Type": "application/json" } : {}),
                },
                body: payload ? (isJsonPayload ? JSON.stringify(payload) : payload) : undefined,
                ...(cache ? { cache: cache } : {}),
                ...((tags || revalidate) ? {
                    next: {
                        ...(tags ? { tags } : {}),
                        ...(revalidate ? { revalidate } : {}),
                    }
                } : {}),
            }
        );
    };

    let response = await makeRequest(accessToken);

    if (!response.ok && response.status === 401 && refreshToken) {

        const refreshResponse = await fetch(EnvConfig.serverBaseUrl + '/auth/refresh', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            const newAccessToken = data?.data?.accessToken;
            const newRefreshToken = data?.data?.refreshToken;

            // Save new access token cookie
            cookieStore.set('fashion-access-token', newAccessToken, {
                httpOnly: false,
                maxAge: 14 * 24 * 60 * 60,
                path: '/',
                sameSite: 'lax',
                secure: EnvConfig.hasSSL === "true"
            });
            cookieStore.set('fashion-refresh-token', newRefreshToken, {
                httpOnly: false,
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
                sameSite: 'lax',
                secure: EnvConfig.hasSSL === "true"
            });

            // Retry original request with new token
            response = await makeRequest(newAccessToken);
        } else {

            // Logout logic: remove cookies
            cookieStore.delete('fashion-access-token');
            cookieStore.delete('fashion-refresh-token');
            // Optionally, send redirect info to client
            // const errorData = await refreshResponse.json().catch(() => null);

            // user redict to login page
            redirect('/sign-in', RedirectType.push);

        }

    } else if (response.status === 401 && !refreshToken && !accessToken) {
        redirect('/sign-in', RedirectType.push);
    }
    else if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        return { error: errorData?.message || "Request Failed, try again", redirect: null };
    }

    else {
        return await response.json();
    }
};