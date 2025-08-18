"use client";
import { SellerProfileCategoryFilter } from "../../CategoryFilter/SellerProfileCategoryFilter";
import { SellerProfileProductSorting } from "../../CategoryFilter/SellerProfileProductSorting";


type TProps = {
  totalItems: number;
};

export default function UserProfileProductFilter({ totalItems }: TProps) {
  const handleSelectionChange = (selection: any) => {
    console.log("Selected:", selection);
  };


  return (
    <div className="flex flex-wrap justify-between my-5">
      {/* --------------------- total items ----------------------------- */}
      <div>
        <span className="font-semibold">{totalItems} items</span>
      </div>
      <div className="flex flex-wrap gap-x-4">
        <div>
          <SellerProfileCategoryFilter
            onSelectionChange={handleSelectionChange}
          />
        </div>
        <div >
         <SellerProfileProductSorting />
        </div>
      </div>
    </div>
  );
}
