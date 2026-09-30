"use client";

import React from "react";
import { IOrder, ShipmentStatus, OrderStatus } from "@/types";
import { cn } from "@/lib/utils";

interface StatusPoint {
  id: string;
  stepNumber: number;
  label: string;
  status: ShipmentStatus;
  state: "completed" | "current" | "upcoming";
}

interface OrderStepperProps {
  order: IOrder;
  shipmentStatus?: ShipmentStatus;
}

export function OrderStepper({ order, shipmentStatus }: OrderStepperProps) {
  
  // Use passed status, or the order's primary shipment status
  const currentStatus = shipmentStatus || order?.shipment?.status || ShipmentStatus.PENDING;

  const isOrderCompleted = order?.status === OrderStatus.COMPLETED;

  const getStatusIndex = (st: ShipmentStatus): number => {
    if (isOrderCompleted || st === ShipmentStatus.DELIVERED) return 4;
    if (st === ShipmentStatus.OUT_FOR_DELIVERY) return 3;
    if (st === ShipmentStatus.IN_TRANSIT) return 2;
    if (st === ShipmentStatus.PICKED_UP) return 1;
    return 0; // PENDING
  };

  const activeIndex = getStatusIndex(currentStatus);

  const points: StatusPoint[] = [
    {
      id: "pending",
      stepNumber: 1,
      label: "Pending",
      status: ShipmentStatus.PENDING,
      state: activeIndex > 0 ? "completed" : activeIndex === 0 ? "current" : "upcoming",
    },
    {
      id: "picked-up",
      stepNumber: 2,
      label: "Picked Up",
      status: ShipmentStatus.PICKED_UP,
      state: activeIndex > 1 ? "completed" : activeIndex === 1 ? "current" : "upcoming",
    },
    {
      id: "in-transit",
      stepNumber: 3,
      label: "In Transit",
      status: ShipmentStatus.IN_TRANSIT,
      state: activeIndex > 2 ? "completed" : activeIndex === 2 ? "current" : "upcoming",
    },
    {
      id: "out-for-delivery",
      stepNumber: 4,
      label: "Out for Delivery",
      status: ShipmentStatus.OUT_FOR_DELIVERY,
      state: activeIndex > 3 ? "completed" : activeIndex === 3 ? "current" : "upcoming",
    },
    {
      id: "delivered",
      stepNumber: 5,
      label: "Delivered",
      status: ShipmentStatus.DELIVERED,
      state: activeIndex >= 4 ? (isOrderCompleted || currentStatus === ShipmentStatus.DELIVERED ? "completed" : "current") : "upcoming",
    },
  ];

  return (
    <div className="w-full bg-white border border-neutral-200 p-5 md:p-6 rounded-lg">
      <ol className="max-w-5xl mx-auto flex items-end" aria-label="Shipment Progress">
        {points.map((pt, idx) => {
          const isLast = idx === points.length - 1;
          const isCompleted = pt.state === "completed";
          const isCurrent = pt.state === "current";

          return (
            <li
              key={pt.id}
              className={cn("relative", isLast ? "shrink-0" : "w-full")}
              {...(isCurrent ? { "aria-current": "step" as const } : {})}
            >
              <div className="mb-3 mr-2">
                <span
                  className={cn(
                    "block text-xs font-semibold md:text-sm",
                    isCompleted || isCurrent ? "text-green-700" : "text-slate-400"
                  )}
                >
                  Step {pt.stepNumber}
                  {isCompleted && <span className="sr-only"> (Completed)</span>}
                </span>
                <span
                  className={cn(
                    "block text-[11px] md:text-xs font-medium truncate mt-0.5",
                    isCompleted || isCurrent ? "text-neutral-800" : "text-slate-400"
                  )}
                >
                  {pt.label}
                </span>
              </div>

              <div className="flex items-center">
                <div
                  className={cn(
                    "w-6 h-6 shrink-0 border-2 flex items-center justify-center rounded-full bg-transparent md:w-7 md:h-7 transition-colors",
                    isCompleted || isCurrent ? "border-green-600" : "border-slate-300"
                  )}
                  aria-hidden="true"
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 fill-green-600"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                    </svg>
                  ) : isCurrent ? (
                    <span className="w-3 h-3 bg-green-600 rounded-full" />
                  ) : (
                    <span className="text-sm text-slate-400 font-semibold">
                      {pt.stepNumber}
                    </span>
                  )}
                </div>

                {!isLast && (
                  <div
                    className={cn(
                      "w-full h-0.5 transition-colors",
                      isCompleted ? "bg-green-600" : "bg-slate-300"
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
