"use client";

import React, { useState } from "react";
import {
  IOrder,
  IShipmentEvent,
  IShipment,
  ShipmentStatus,
  CurrentShipTo,
  OrderStatus,
} from "@/types";
import moment from "moment";
import {
  Truck,
  Home,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getOrderStatusFormat } from "@/utils/EnumFormater";

interface ShipmentStepsProps {
  order: IOrder;
  events?: IShipmentEvent[];
}

// The 5 shipment status points for each stepper
const STATUS_POINTS = [
  { id: ShipmentStatus.PENDING, label: "Pending" },
  { id: ShipmentStatus.PICKED_UP, label: "Picked Up" },
  { id: ShipmentStatus.IN_TRANSIT, label: "In Transit" },
  { id: ShipmentStatus.OUT_FOR_DELIVERY, label: "Out for Delivery" },
  { id: ShipmentStatus.DELIVERED, label: "Delivered" },
];

function getStatusPointIndex(status?: ShipmentStatus | null, isCompleted?: boolean): number {
  if (isCompleted || status === ShipmentStatus.DELIVERED) return 4;
  if (status === ShipmentStatus.OUT_FOR_DELIVERY) return 3;
  if (status === ShipmentStatus.IN_TRANSIT) return 2;
  if (status === ShipmentStatus.PICKED_UP) return 1;
  return 0; // PENDING
}

/**
 * Stepper Bar displaying the 5 status points
 */
interface StepperBarProps {
  stepNumber: number;
  destinationLabel: "Authentication Center" | "Buyer";
  shipment: IShipment | null | undefined;
  isLegDone?: boolean;
  isLegUpcoming?: boolean;
  onSelectPoint?: (index: number) => void;
  selectedPoint?: number;
}

function StepperBar({
  stepNumber,
  destinationLabel,
  shipment,
  isLegDone = false,
  isLegUpcoming = false,
  onSelectPoint,
  selectedPoint,
}: StepperBarProps) {
  const currentStatus = isLegDone
    ? ShipmentStatus.DELIVERED
    : isLegUpcoming
      ? ShipmentStatus.PENDING
      : shipment?.status || ShipmentStatus.PENDING;

  const activeIndex = isLegDone ? 4 : isLegUpcoming ? 0 : getStatusPointIndex(currentStatus, isLegDone);

  return (
    <div className="space-y-4">
      {/* Header Row: Step Number + Destination Badge beside it + Status Headline on right */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="size-7 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
            {stepNumber}
          </div>
          <span className="text-base font-bold text-neutral-900">Step {stepNumber}</span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
            {destinationLabel === "Authentication Center" ? (
              <ShieldCheck className="size-3.5 text-neutral-700" />
            ) : (
              <Home className="size-3.5 text-neutral-700" />
            )}
            <span>Destination: {destinationLabel}</span>
          </div>
        </div>
      </div>

      {/* Stepper with the 5 Status Points */}
      <div className="relative pt-2 pb-4 px-1 sm:px-2 md:px-4">
        {/* Continuous Horizontal Line */}
        <div
          className="absolute top-[18px] h-1 bg-neutral-200 -z-0 transition-all"
          style={{
            left: `${(0.5 / STATUS_POINTS.length) * 100}%`,
            right: `${(0.5 / STATUS_POINTS.length) * 100}%`,
          }}
        >
          <div
            className="h-full bg-green-600 transition-all duration-300"
            style={{
              width: `${(Math.min(activeIndex, 4) / 4) * 100}%`,
            }}
          />
        </div>

        {/* 5 Status Dots */}
        <div className="flex items-center justify-between relative z-10">
          {STATUS_POINTS.map((point, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            const isSelected = selectedPoint !== undefined && idx === selectedPoint;

            return (
              <div
                key={point.id}
                onClick={() => onSelectPoint && onSelectPoint(idx)}
                className="flex flex-col items-center cursor-pointer group"
                style={{ width: `${100 / STATUS_POINTS.length}%` }}
              >
                <div
                  className={cn(
                    "size-5 md:size-6 rounded-full flex items-center justify-center transition-all bg-white border-2",
                    isCompleted
                      ? "bg-green-600 border-green-600"
                      : isCurrent
                        ? "border-green-600 ring-4 ring-green-50"
                        : "border-neutral-300 bg-neutral-300"
                  )}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-3 fill-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                    </svg>
                  ) : isCurrent ? (
                    <span className="size-2 md:size-2.5 bg-green-600 rounded-full" />
                  ) : (
                    <span className="size-2 bg-neutral-300 rounded-full" />
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-[10px] sm:text-xs md:text-sm transition-colors text-center truncate px-0.5",
                    isCurrent || isSelected
                      ? "font-bold text-neutral-900"
                      : isCompleted
                        ? "font-medium text-neutral-800"
                        : "font-normal text-neutral-400"
                  )}
                >
                  {point.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ShipmentSteps({ order, events = [] }: ShipmentStepsProps) {

  const { seller, shipment } = order || {};

  const sellerOrigin = shipment?.origin

  const sellerLocation = sellerOrigin?.city

    ? `${sellerOrigin.city}${sellerOrigin.state ? `, ${sellerOrigin.state}` : ""}${sellerOrigin.country ? `, ${sellerOrigin.country}` : ""}`
    : "Seller Location";

  const isAuthEnabled = Boolean(order?.allowedAuthentication);

  const isBuyerActive = order?.currentShipTo === CurrentShipTo.BUYER;

  // Step 1 & Step 2 details
  const leg1Shipment = order?.shipment;
  const leg2Shipment = order?.authShipment;

  const leg1Status = leg1Shipment?.status || ShipmentStatus.PENDING;
  const isLeg1Done = leg1Status === ShipmentStatus.DELIVERED || isBuyerActive || order?.status === OrderStatus.COMPLETED;

  const isLeg2Upcoming = !isLeg1Done;

  // Single Events Section states
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const visibleEvents = isExpanded ? events : events.slice(0, 5);

  return (
    <div className="border border-neutral-200 bg-white rounded p-5 md:p-6 space-y-8 shadow-sm">
      {/* Top Header of Container */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-neutral-200 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-md bg-neutral-100 text-neutral-800 shrink-0">
            <Truck className="size-5" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-semibold text-neutral-900">
              {order?.orderNumber}
            </h3>
            <p className="text-xs md:text-sm text-neutral-500">
              Sold by <Link href={`/member/${seller?.userName}`} className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">@{seller?.userName || "Seller"}</Link> - {sellerLocation}
            </p>
          </div>
        </div>

        <div className="space-y-2 md:flex flex-col items-end">
          <Badge
            variant="outline"
            className={cn(getOrderStatusFormat(order)?.color, "text-xs px-2.5 py-1 font-semibold rounded-none")}>
            {getOrderStatusFormat(order)?.label}
          </Badge>
          <p className="text-xs text-gray-600">Placed on {moment(order.createdAt).format("MMMM D, YYYY · h:mm A")}</p>
        </div>

      </div>

      {/* Steppers Section */}
      <div className="space-y-6">
        {/* Stepper 1: Destination Authentication Center (or Buyer if Direct) */}
        <StepperBar
          stepNumber={1}
          destinationLabel={isAuthEnabled ? "Authentication Center" : "Buyer"}
          shipment={leg1Shipment}
          isLegDone={isLeg1Done}
          isLegUpcoming={false}
        />

        {/* Stepper 2: Destination Buyer (stacked down when Authentication enabled) */}
        {isAuthEnabled && (
          <div className="pt-2 border-t-2 border-dashed border-neutral-200">
            <StepperBar
              stepNumber={2}
              destinationLabel="Buyer"
              shipment={leg2Shipment}
              isLegDone={
                order?.status === OrderStatus.COMPLETED ||
                leg2Shipment?.status === ShipmentStatus.DELIVERED
              }
              isLegUpcoming={isLeg2Upcoming}
            />
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SINGLE UNIFIED EVENTS & TRACKING ACTIVITY SECTION                         */}
      {/* ========================================================================= */}
      <div className="relative bg-[#f9fafb] border border-neutral-200/90 rounded-md p-4 md:p-6 space-y-4">


        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-neutral-200/70 pb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
            Shipment Updates
          </span>
          <span className="text-xs text-neutral-500 font-medium">
            {events.length} {events.length === 1 ? "Update" : "Updates"}
          </span>
        </div>

        {/* Event Rows */}
        {events.length === 0 ? (
          <div className="py-6 text-center text-xs md:text-sm text-neutral-500">
            No tracking updates logged for this order yet. Carrier scan updates
            will appear here once dispatched.
          </div>
        ) : (
          <div className="space-y-3 divide-y divide-neutral-200/60">
            {visibleEvents.map((evt, idx) => {
              const isLeg2 = isAuthEnabled && evt.shipmentId === order?.authShipmentId;

              return (
                <div
                  key={evt.id || idx}
                  className={cn(
                    "flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 text-xs md:text-sm",
                    idx > 0 && "pt-3"
                  )}
                >
                  <div className="font-mono text-neutral-500 shrink-0 sm:w-36 text-xs flex items-center gap-1.5">
                    <span>
                      {moment(evt.eventTime || evt.createdAt).format("DD-MM-YY hh:mm A")}
                    </span>
                  </div>

                  <div className="text-neutral-800 leading-relaxed flex-1 flex flex-wrap items-center gap-2">
                    {/* Badge indicating leg if authentication is enabled */}
                    {isAuthEnabled && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-800 border border-neutral-300 shrink-0">
                        {isLeg2 ? "Step 2: To Buyer" : "Step 1: To Auth Center"}
                      </span>
                    )}

                    <span>{evt.eventDescription || evt.eventType}</span>

                    {evt.eventLocation && (
                      <span className="text-neutral-500 text-xs">
                        ({evt.eventLocation})
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* "View More" / "View Less" Toggle Button */}
        {events.length > 5 && (
          <div className="pt-3 text-center border-t border-neutral-200/60">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              {isExpanded ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>

      {/* Route Summary Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-neutral-50/70 border border-neutral-200/70 rounded-md space-y-0.5">
          <div className="flex items-center gap-1.5 font-semibold text-neutral-700">
            <MapPin className="size-3.5 text-neutral-500" />
            <span>Dispatch Origin</span>
          </div>
          <p className="font-medium text-neutral-900">{seller?.userName || "Seller"}</p>
          <p className="text-neutral-500">{sellerLocation}</p>
        </div>

        <div className="p-3 bg-neutral-50/70 border border-neutral-200/70 rounded-md space-y-0.5">
          <div className="flex items-center gap-1.5 font-semibold text-neutral-700">
            <Home className="size-3.5 text-neutral-500" />
            <span>Final Delivery Destination</span>
          </div>
          <p className="font-medium text-neutral-900">{order?.buyer?.userName || "Buyer"}</p>
          <p className="text-neutral-500">{buyerLocation}</p>
        </div>
      </div> */}

    </div>
  );
}
