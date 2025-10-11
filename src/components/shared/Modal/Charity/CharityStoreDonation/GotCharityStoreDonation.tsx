"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  clothingDonations,
  DonationPopupProps,
  DonationType,
  moneyDonations,
} from "./data.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function GotCharityStoreDonation({
  open,
  onOpenChange,
}: DonationPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0  pt-5 gap-0">
        <div className="relative">
          {/* Tabs */}
          <Tabs defaultValue="money" className="w-full">
            <div className="p-4 pb-0">
              <TabsList className="grid w-full grid-cols-2 h-auto p-0 bg-transparent gap-2">
                <TabsTrigger
                  value="money"
                  className="py-2 px-4 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-600 "
                >
                  Money Raised
                </TabsTrigger>
                <TabsTrigger
                  value="clothing"
                  className="py-2 px-4 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-600"
                >
                  Clothing Donated
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Content */}
            <div className="p-4">
              <TabsContent value="money" className="mt-0">
                {/* Summary */}
                <div className="space-y-2 mb-4 border border-gray-500 rounded-md p-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Total Raised</span>
                    <span className="text-muted-foreground">£1,450</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Direct Donation</span>
                    <span className="text-muted-foreground">£1,450</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Item Sales Proceeds</span>
                    <span className="text-muted-foreground">£450</span>
                  </div>
                </div>

                {/* Donations List */}
                <div className="space-y-3 max-h-[400px] overflow-y-auto scroll-hide">
                  {moneyDonations.map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          {donation.avatar ? (
                            <AvatarImage
                              src={donation.avatar || "/placeholder.svg"}
                              alt={donation.name}
                            />
                          ) : null}
                          <AvatarFallback className="bg-gray-200 text-gray-600">
                            {donation.name === "Anonymous"
                              ? "?"
                              : donation.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{donation.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {donation.amount} • {donation.time}
                            {donation.item && ` • ${donation.item}`}
                          </p>
                        </div>
                      </div>
                      {getDonationTypeBadge(donation.type)}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="clothing" className="mt-0">
                {/* Clothing Summary */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium">
                    Total Clothing Donated
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {clothingDonations.length} items
                    </span>
                  </div>
                </div>

                {/* Clothing Donations List */}
                <div className="space-y-3 max-h-[400px] overflow-y-auto scroll-hide">
                  {clothingDonations.map((donation) => (
                    <div key={donation.id} className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        {donation.avatar ? (
                          <AvatarImage
                            src={donation.avatar || "/placeholder.svg"}
                            alt={donation.name}
                          />
                        ) : null}
                        <AvatarFallback className="bg-gray-200 text-gray-600">
                          {donation.name === "Anonymous"
                            ? "?"
                            : donation.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{donation.name}</p>
                        <p className="text-xs text-muted-foreground mb-2">
                          donated {donation.time}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {donation.items.map((item, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Function to get donation type badge
const getDonationTypeBadge = (type: DonationType) => {
  const styles = {
    direct: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    purchase: "bg-purple-100 text-purple-700 hover:bg-purple-100",
    "item-sale": "bg-blue-100 text-blue-700 hover:bg-blue-100",
  };

  const labels = {
    direct: "Direct",
    purchase: "Purchase",
    "item-sale": "Item sale",
  };

  return (
    <Badge variant="secondary" className={styles[type]}>
      {labels[type]}
    </Badge>
  );
};
