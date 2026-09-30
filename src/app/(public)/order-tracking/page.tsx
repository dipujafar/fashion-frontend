import React from "react";
import OrderTrackingContainer from "./_components/OrderTrackingContainer";
import { GetOrderDetailsByCode } from "@/lib/services/Orders";

export const metadata = {
    title: "Order Tracking | FASHI-ON",
    description: "Track your order status, authentication verification, and shipment delivery progress.",
};

async function OrderTrackingPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const ssp = await searchParams;
    const orderCode = (ssp?.orderCode || ssp?.orderNumber || ssp?.orderId || "").trim();

    const res = await GetOrderDetailsByCode({ orderCode });

    return (
        <div>
            <OrderTrackingContainer
                orderCode={orderCode}
                order={res?.data?.order}
                events={res?.data?.events || []}
            />
        </div>
    );
}

export default OrderTrackingPage
