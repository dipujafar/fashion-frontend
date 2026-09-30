"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

interface OrderSearchHeaderProps {
  initialOrderCode?: string;
}

export function OrderSearchHeader({ initialOrderCode = "" }: OrderSearchHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [orderCode, setOrderCode] = useState(
    initialOrderCode || searchParams.get("orderCode") || searchParams.get("orderId") || searchParams.get("orderNumber") || ""
  );

  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = orderCode.trim();
    if (!trimmed) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("orderCode", trimmed);
      router.push(`/order-tracking?${params.toString()}`);
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center space-y-4 pt-4">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
          Track Your Order
        </h1>
        <p className="text-sm md:text-base text-neutral-600 max-w-xl mx-auto">
          Enter your order number to check real-time courier updates, authentication progress, and shipment tracking.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2 max-w-xl mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
          <Input
            type="text"
            placeholder="Enter Order Number (e.g. #ORD-12345678)"
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            className="pl-10 pr-4 h-12 bg-white border-neutral-300 rounded-none shadow-none text-base focus-visible:ring-0 focus-visible:border-neutral-900"
          />
        </div>
        <Button
          type="submit"
          disabled={isPending || !orderCode.trim()}
          className="h-12 px-6 rounded-none bg-neutral-900 text-white hover:bg-neutral-800 transition-colors w-full sm:w-auto font-medium cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" />
              Tracking...
            </>
          ) : (
            "Track Order"
          )}
        </Button>
      </form>
    </div>
  );
}
