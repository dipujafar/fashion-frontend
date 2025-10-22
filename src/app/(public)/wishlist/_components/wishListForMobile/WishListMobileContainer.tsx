"use client";
import React from "react";
import ConfirmationPopover from "@/components/shared/popover/ConfirmationPopover";
import { productData } from "../data";
import { WishListCardForMobile } from "./WishListCardForMobile";

export default function WishListMobileContainer() {
  const handleDelete = () => {
    console.log("Deleted");
  };
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium text-muted-foreground">Wishlist</h1>
        <ConfirmationPopover
          title="Are you sure you want clear your wishlist?"
          handleConfirm={handleDelete}
        />
      </div>
      <p className="text-lg font-bold text-">2 Items</p>
      <div className="space-y-4 mt-4">
        {productData.map((product, index) => (
          <WishListCardForMobile key={index} {...product} />
        ))}
      </div>
    </div>
  );
}
