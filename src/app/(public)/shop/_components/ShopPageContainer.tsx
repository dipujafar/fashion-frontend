"use client";
import ProductCategory from "./ProductCategory";
import AllProducts from "./AllProducts";
import { SmallDeviceFilter } from "./SmallDeviceFilter";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import DisplayProductSection from "@/components/shared/DisplayProductSection/DisplayProductSection";
import { recentlyViewedData, trendingProductData } from "@/data/dummyData.tsx";
import { useSearchParams } from "next/navigation";
import CategoryFilter from "./CategoriesFilter";
// import AllCategory from "./AllCategories";

const ShopPageContainer = () => {
  const filterOptions = useSearchParams().get("category");
  const subCategory = useSearchParams().get("subCategory");
  const finalCategory = useSearchParams().get("finalCategory");



  return (
    <>
      <div>
        <ProductCategory></ProductCategory>
        {/* <AllCategory /> */}
        

        {/* ----------------------------------------- show filter option ------------------------------------- */}
        <div className="mt-5 space-x-2 text-black/70 mb-5">
          <span>{filterOptions}</span> {subCategory && <span>/</span>}{" "}
          <span>{subCategory}</span> {finalCategory && <span>/</span>}{" "}
          <span>{finalCategory}</span>
        </div>
        {/* ------------------------------------------------------------------------------------------------ */}
        <CategoryFilter/>


        <div className=" grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5	lg:gap-8 gap-4 xl:mt-8 mt-4">
          {/* <div className="2xl:space-y-10 space-y-6 hidden lg:block">
            <Categories title="Category" data={collectionTypes}></Categories>
            <Categories title="Material" data={materialData}></Categories>
            <Categories title="BRANDS" data={brandsData}></Categories>
            <Categories title="Size" data={sizeData}></Categories>
            <Categories title="condition" data={conditionData}></Categories>
            <PriceCategory></PriceCategory>
            <ColorCategory></ColorCategory>
            <Categories title="Discount" data={discountData}></Categories>
          </div> */}

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

                <div className="lg:hidden block">
                  <SmallDeviceFilter></SmallDeviceFilter>
                </div>
              </div>
            </div>

            {/* ========================= all products ========================== */}
            <AllProducts></AllProducts>
          </div>
        </div>
        {/* Pagination */}
        <PaginationSection></PaginationSection>
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
