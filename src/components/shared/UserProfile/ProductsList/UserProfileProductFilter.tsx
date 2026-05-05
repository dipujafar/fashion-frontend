import { Suspense } from "react";
import { SellerProfileProductSorting } from "../../CategoryFilter/SellerProfileProductSorting";
import { Skeleton } from "@/components/ui/skeleton";
import CategorySelectClient from "@/app/(public)/shop/_components/CategorySelectClient";
import { Category } from "../AddProduct/Categories/CategoryFilterSelector";


type TProps = {
  totalItems: number;
  selectedCat?: string,
  catPromise: Promise<{ data: Category[] }>
};

export default async function UserProfileProductFilter({ totalItems, selectedCat, catPromise }: TProps) {

  const result = await catPromise;

  return (
    <div className="flex flex-wrap justify-between my-5 items-center">
      {/* --------------------- total items ----------------------------- */}
      <div>
        <span className="font-semibold">{totalItems} items</span>
      </div>
      <div className="flex flex-wrap gap-x-2">
        <div>
          <Suspense fallback={<Skeleton className="h-10 w-44" />}>
            <CategorySelectClient selectedCat={selectedCat} categories={result?.data} className="bg-transparent hover:bg-gray-50 duration-150 focus:ring-0 md:py-2 py-1 rounded-sm"/>
          </Suspense>
        </div>
        <div >
          <SellerProfileProductSorting/>
        </div>
      </div>
    </div>
  );
}
