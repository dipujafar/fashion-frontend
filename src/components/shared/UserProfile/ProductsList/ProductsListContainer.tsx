import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import UserProfileProductFilter from "./UserProfileProductFilter";
import { IMeta, IProduct } from "@/types";
import ProductCard from "../../Cards/ProductCard";
import Empty from "@/components/ui/empty";
import GetCategoriesHairerchy from "@/lib/services/Categories";

const ProductsListContainer = async ({ prodPromise, selectedCat }: { prodPromise: Promise<{ data: { data: IProduct[], meta: IMeta } }>, selectedCat ?: string }) => {
  
  const result = await prodPromise;

  const categoryPromise = GetCategoriesHairerchy();

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:gap-8 gap-4">

        <div className="2xl:col-span-5 xl:col-span-4 md:col-span-3 ">
          {/* =========== display total items and option for product filter ======== */}
          <UserProfileProductFilter totalItems={result?.data?.meta?.total} selectedCat={selectedCat} catPromise={categoryPromise}/>

          {/* ========================= all products ========================== */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-4 xl:gap-6 ">
            {result?.data?.data?.map((prod) => (
              <ProductCard data={prod} key={prod?.id} ownProduct={true}></ProductCard>
            ))}
          </div>

          {
            result?.data?.data?.length <= 0 && <Empty message="No listings at the moment" />
          }

        </div>
      </div>

      {/* Pagination */}
      <PaginationSection total={result?.data?.meta?.total} current={1}></PaginationSection>
    </div>
  );
};

export default ProductsListContainer;
