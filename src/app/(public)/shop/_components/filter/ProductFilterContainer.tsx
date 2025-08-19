"use client";
import React, { useState } from "react";
import CategoriesFilter from "./CategoriesFilter";
import { useUpdateSearchParamsWithRedirect } from "@/hooks/useUpdateSearchParamsWithRedirct";

export default function ProductFilterContainer() {
  const [selectedItem, setSelectedItem] = useState("");
  const updateParams = useUpdateSearchParamsWithRedirect();

  const handleSelectionChange = (item: string) => {
    setSelectedItem(item);
    console.log("Selected item:", item);
  };
  
  return (
    <>
      <CategoriesFilter
        selectedItem={selectedItem}
        onSelectionChange={handleSelectionChange}
        updateParams={updateParams}
      />
    </>
  );
}
