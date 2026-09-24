"use client"
import { Button } from '@/components/ui/button'
import { GetLebel } from '@/lib/Actions/Order.action';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import React from 'react'
import { toast } from 'sonner';

function GetLabel({ ordeId }: { ordeId: string }) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    const handleGetLebel = async (orderId: string) => {
        setIsLoading(true);
        // Implementation for getting label
        try {
            const res = await GetLebel({ payload: { orderId } });
            if (!res.success) {
                throw new Error(res.message);
            }
            const url = res?.data?.labelUrl;
            window.open(url, "_blank", "noopener,noreferrer");
        }
        catch (error: any) {
            if (isRedirectError(error)) {
                throw error;
            }
            toast.error(error?.message || "Something went wrong, try again");
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Button onClick={() => handleGetLebel(ordeId)} variant={"default"} className="rounded-none shadow-none cursor-pointer min-w-40" disabled={isLoading}>
            {isLoading ? <span className="loader" /> : "Get Shipping Label"}
        </Button>
    )
}

export default GetLabel