import { IMeta, IProduct } from "@/types";
import { SmallDeviceFilter } from "./SmallDeviceFilter";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import AllProducts from "./AllProducts";

const ShopPageContainer = async ({ prodsPromise }: { prodsPromise: Promise<{ data: { data: IProduct[], meta: IMeta } }> }) => {

  const products = await prodsPromise;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:gap-8 gap-4">


        <div className="2xl:col-span-5 xl:col-span-4 md:col-span-3 ">
          {/* =============================== categories ========================== */}
          <div>
            {/* <CategoryFilter /> */}
            <div className="flex justify-between items-center xl:mb-8 mb-4 ">
              {/* <div className="flex gap-x-2 items-center justify-center">
                      <RecommendedCategory></RecommendedCategory>
                      <UserTypeCategory></UserTypeCategory>
                    </div> */}

              {/* ===================================search for item ================================= */}
              <div />

              <div className="lg:hidden ">
                <SmallDeviceFilter></SmallDeviceFilter>
              </div>
            </div>
          </div>

          {/* ========================= all products ========================== */}
          <AllProducts data={products?.data?.data}></AllProducts>
        </div>
      </div>
      {/* Pagination */}
      <PaginationSection total={products?.data?.meta?.total} current={Number(products?.data?.meta?.page)} pageSize={Number(products?.data?.meta?.limit)}></PaginationSection>

    </>
  );
};

export default ShopPageContainer;
