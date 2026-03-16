"use client";
import ProductCategory from "./ProductCategory";
import AllProducts from "./AllProducts";
import { SmallDeviceFilter } from "./SmallDeviceFilter";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import DisplayProductSection from "@/components/shared/DisplayProductSection/DisplayProductSection";
import { recentlyViewedData, trendingProductData } from "@/data/dummyData.tsx";
import { useSearchParams } from "next/navigation";
import { formatLabel } from "@/utils/formatText";
import ProductFilterContainer from "./filter/ProductFilterContainer";
import { useGetProductsQuery } from "@/redux/api/productApi";
// import AllCategory from "./AllCategories";

const ShopPageContainer = () => {
  const filterOptions = useSearchParams().get("category");
  const subCategory = useSearchParams().get("subCategory");
  const finalCategory = useSearchParams().get("finalCategory");

  // ====================== set query params ===========================
  const page = useSearchParams()?.get("page") || 1;
  const limit = 50;
  const queries: Record<string, string | number> = {};
  if (page) queries.page = page;
  if (limit) queries.limit = limit;

  const { data: products, isLoading } = useGetProductsQuery(queries);

  return (
    <>
      <div>
        <ProductCategory></ProductCategory>
        {/* <AllCategory /> */}

        {/* ----------------------------------------- show filter option ------------------------------------- */}
        <div className="mt-5 space-x-2 text-black/70 mb-5">
          {filterOptions && <span>{formatLabel(filterOptions as string)}</span>}{" "}
          {subCategory && <span>/</span>}{" "}
          {subCategory && <span>{formatLabel(subCategory as string)}</span>}{" "}
          {finalCategory && <span>/</span>}{" "}
          {finalCategory && <span>{formatLabel(finalCategory as string)}</span>}
        </div>
        {/* ------------------------------------------------------------------------------------------------ */}
        <div className="hidden lg:block">
          <ProductFilterContainer />
        </div>

        <div className=" grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5	lg:gap-8 gap-4 xl:mt-8 mt-4">


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
            <AllProducts data={products?.data?.data} loading={isLoading}></AllProducts>
          </div>
        </div>
        {/* Pagination */}
        <PaginationSection total={products?.data?.meta?.total} current={Number(page)} pageSize={Number(limit)}></PaginationSection>
      </div>
      <div className="xl:mt-8 mt-5 space-y-10">
        <DisplayProductSection
          title="Recently Viewed"
          data={recentlyViewedData}
        ></DisplayProductSection>

        <DisplayProductSection
          title="You may also like"
          data={trendingProductData}
        ></DisplayProductSection>
      </div>
    </>
  );
};

export default ShopPageContainer;
