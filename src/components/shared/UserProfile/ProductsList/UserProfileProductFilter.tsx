import { SellerProfileProductSorting } from "../../CategoryFilter/SellerProfileProductSorting";
import { Skeleton } from "@/components/ui/skeleton";
import CategorySelectClient from "@/app/(public)/shop/_components/CategorySelectClient";
import { useGetCategoryQuery } from "@/redux/api/categoryApi";

type TProps = {
  selectedCat?: string,
};

export default function UserProfileProductFilter({ selectedCat }: TProps) {

  const { isLoading, isError, isSuccess, data } = useGetCategoryQuery();

  return (
    <div className="flex flex-wrap justify-between my-5 items-center">
      {/* --------------------- total items ----------------------------- */}
      <div>
        <span className="font-medium">On Sale Items</span>
      </div>
      <div className="flex flex-wrap gap-x-2">
        <div>
          {
            isLoading ? <Skeleton className="h-10 w-44" /> : <CategorySelectClient selectedCat={selectedCat} categories={data?.data || []} className="bg-transparent hover:bg-gray-50 duration-150 focus:ring-0 md:py-2 py-1 rounded-sm" />
          }
        </div>
        <div >
          <SellerProfileProductSorting />
        </div>
      </div>
    </div>
  );
}
