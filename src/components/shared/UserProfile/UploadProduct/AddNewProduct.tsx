import CommonButton from "@/components/ui/common-button";
import Link from "next/link";
import React from "react";

const AddNewProduct = ({link}: {link: string}) => {
  return (
    <div className="p-4 rounded-lg border border-[#DEDEDE] space-y-3">
      <h4 className="md:text-xl text-center">Enter New Product Details for Sale</h4>
      <Link href={link}>
        <CommonButton className="w-full">ADD NEW PRODUCT</CommonButton>
      </Link>
    </div>
  );
};

export default AddNewProduct;
