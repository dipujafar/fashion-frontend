"use client";

import React from "react";
import { IShipmentEvent, IOrder } from "@/types";
import moment from "moment";
import {
  Clock,
  MapPin,
  CheckCircle2,
  Package,
  Truck,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ShipmentEventsTimelineProps {
  events: IShipmentEvent[];
  order: IOrder;
}

export function ShipmentEventsTimeline({ events, order }: ShipmentEventsTimelineProps) {
  const isAuthEnabled = Boolean(order?.allowedAuthentication);

  return (
    <div className="border border-neutral-200 bg-white p-5 md:p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-neutral-800" />
          <h3 className="text-base font-bold text-neutral-900">Shipment Activity & History</h3>
        </div>
        <span className="text-xs text-neutral-500 font-medium">
          {events.length} {events.length === 1 ? "Update" : "Updates"}
        </span>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-10 space-y-2">
          <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 mx-auto">
            <Clock className="size-5" />
          </div>
          <p className="text-sm font-medium text-neutral-800">No Tracking Events Yet</p>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Carrier scan updates will appear here in chronological order as soon as the package is processed.
          </p>
        </div>
      ) : (
        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
          {events.map((event, idx) => {
            const isFirst = idx === 0;
            const isAuthLeg = isAuthEnabled && event?.shipmentId === order?.authShipmentId;

            return (
              <div key={event.id || idx} className="relative group">
                {/* Timeline Dot */}
                <div
                  className={cn(
                    "absolute -left-6 top-1 size-4 rounded-full border-2 bg-white flex items-center justify-center",
                    isFirst ? "border-neutral-900 bg-neutral-900" : "border-neutral-400"
                  )}
                >
                  {isFirst && <div className="size-1.5 rounded-full bg-white" />}
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-neutral-900">
                        {event.eventType || event.shipmentStatus || "Status Update"}
                      </span>
                      {isAuthEnabled && (
                        <Badge
                          variant="outline"
                          className="text-[10px] font-normal px-1.5 py-0 border-neutral-300 text-neutral-600 rounded-none"
                        >
                          {isAuthLeg ? "Auth → Buyer" : "Seller → Auth"}
                        </Badge>
                      )}
                    </div>
                    <time className="text-xs text-neutral-500 font-mono">
                      {moment(event.eventTime || event.createdAt).format("MMM DD, YYYY · h:mm A")}
                    </time>
                  </div>

                  {event.eventDescription && (
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      {event.eventDescription}
                    </p>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
