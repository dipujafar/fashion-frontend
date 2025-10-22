"use client";
import React from "react";

import { ShoppingCartCard } from "./ShoppingCartCard";
import { productData } from "../data";
import ConfirmationPopover from "@/components/shared/popover/ConfirmationPopover";

export default function ShoppingCartMobileContainer() {
  const handleDelete = () => {
    console.log("Deleted");
  };
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium text-muted-foreground">Your Cart</h1>
        <ConfirmationPopover
          title="Are you sure you want clear your cart?"
          handleConfirm={handleDelete}
        />
      </div>
      <p className="text-lg font-bold text-">2 Items</p>
      <div className="space-y-4 mt-4">
        {productData.map((product, index) => (
          <ShoppingCartCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}
