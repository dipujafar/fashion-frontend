"use client";

import React from "react";
import Container from "@/components/shared/Container";
import { IOrder, IShipmentEvent } from "@/types";
import { OrderSearchHeader } from "./OrderSearchHeader";
import { ShipmentSteps } from "./ShipmentSteps";
import { OrderItemsList } from "./OrderItemsList";
import { BuyerPriceOverview } from "./BuyerPriceOverview";
import { PackageSearch, AlertCircle, ShieldCheck, Truck, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface OrderTrackingContainerProps {
  orderCode?: string;
  order: IOrder | null;
  events: IShipmentEvent[];
}

export default function OrderTrackingContainer({
  orderCode = "",
  order,
  events = [],
}: OrderTrackingContainerProps) {
  const hasSearched = Boolean(orderCode.trim());

  return (
    <Container className="pt-6 pb-20 space-y-8">
      {/* Search Header Input */}
      <OrderSearchHeader initialOrderCode={orderCode} />

      {/* Case 1: Order found */}
      {order ? (
        <div className="space-y-6 max-w-6xl mx-auto">

          {/* Main Grid: Left for Tracking & Timeline, Right for Items & Pricing */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left 2 Cols: Tracking Package Card & Shipping Details */}
            <div className="lg:col-span-2 space-y-6">
              <ShipmentSteps order={order} events={events} />
            </div>

            {/* Right 1 Col: Items & Buyer Price Overview */}
            <div className="space-y-6">
              <OrderItemsList items={order?.items || []} />
              <BuyerPriceOverview order={order} />
            </div>
          </div>
        </div>

      ) : hasSearched ? (
        /* Case 2: Searched but not found */
        <div className="border border-neutral-200 bg-white p-10 max-w-xl mx-auto text-center space-y-4">
          <div className="size-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 mx-auto">
            <AlertCircle className="size-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-neutral-900">Order Not Found</h3>
            <p className="text-sm text-neutral-600">
              We couldn&apos;t find an order matching{" "}
              <span className="font-mono font-bold text-neutral-900">&quot;{orderCode}&quot;</span>.
            </p>
            <p className="text-xs text-neutral-500 pt-1">
              Please double-check your order number from your confirmation email or order history and try again.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/profile/purchase/orders">
              <Button variant="outline" className="rounded-none border-neutral-900 cursor-pointer">
                View My Orders
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Case 3: Initial Empty State */
        <div className="border border-neutral-200 bg-white p-8 md:p-12 max-w-3xl mx-auto text-center space-y-6">
          <div className="size-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 mx-auto">
            <PackageSearch className="size-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-neutral-900">Track Any FASHI-ON Order</h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              Follow every stage of your order from dispatch, courier pickups, and authentication reviews to final doorstep delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left border-t border-neutral-100">
            <div className="p-3 bg-neutral-50 border border-neutral-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-xs text-neutral-900">
                <Truck className="size-3.5" />
                Live Tracking
              </div>
              <p className="text-[11px] text-neutral-600">
                Real-time carrier scans and delivery progress updates.
              </p>
            </div>
            <div className="p-3 bg-neutral-50 border border-neutral-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-xs text-neutral-900">
                <ShieldCheck className="size-3.5" />
                Authentication
              </div>
              <p className="text-[11px] text-neutral-600">
                Full transparency for two-step verified luxury items.
              </p>
            </div>
            <div className="p-3 bg-neutral-50 border border-neutral-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-xs text-neutral-900">
                <Clock className="size-3.5" />
                Event Logs
              </div>
              <p className="text-[11px] text-neutral-600">
                Timestamped courier milestones and location logs.
              </p>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
