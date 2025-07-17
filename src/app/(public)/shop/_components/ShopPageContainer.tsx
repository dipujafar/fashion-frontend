import Categories from "@/components/shared/Categories/Categories";
import { brandsData } from "@/lib/brandsData";
import { collectionTypes } from "@/lib/collectionType";
import { discountData } from "@/lib/discountData";
import ColorCategory from "./ColorCategory";
import PriceCategory from "./PriceCategory";
import ProductCategory from "./ProductCategory";
import AllProducts from "./AllProducts";
import { RecommendedCategory } from "./RecommendedCategory";
import { UserTypeCategory } from "./UserTypeCategory";
import { SmallDeviceFilter } from "./SmallDeviceFilter";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import AllCategory from "./AllCategories";
import DisplayProductSection from "@/components/shared/DisplayProductSection/DisplayProductSection";
import { recentlyViewedData, trendingProductData } from "@/data/dummyData.tsx";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { sizeData } from "@/lib/sizeData";
import { materialData } from "@/lib/materialData";
import { conditionData } from "@/lib/conditionData";
import CategoryFilter from "./CategoriesFilter";

const ShopPageContainer = () => {
  return (
    <>
      <div>
        <ProductCategory></ProductCategory>
        {/* <AllCategory /> */}
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
              <CategoryFilter />
              <div className="flex justify-between items-center xl:mb-8 mb-4 ">
                {/* <div className="flex gap-x-2 items-center justify-center">
                  <RecommendedCategory></RecommendedCategory>
                  <UserTypeCategory></UserTypeCategory>
                </div> */}

                {/* ===================================search for item ================================= */}
                <div/>
                <div className="relative hidden md:block">
                  <Input
                    className="border-0 bg-slate-200 focus:outline-0 shadow-none focus-visible:ring-0 2xl:w-[450px]  lg:w-[350px] sm:w-[250px] px-2 rounded-sm"
                    placeholder="Search here for items...."
                  ></Input>
                  <div className="absolute   top-2 right-1.5">
                    <Search size={20} color="#9E9E9E" />
                  </div>
                </div>

                <div className="lg:hidden block">
                  <SmallDeviceFilter></SmallDeviceFilter>
                </div>
              </div>
            </div>

            {/* ===================================search in small screen for item ================================= */}
            <div className="relative md:hidden block mb-4">
              <Input
                className="border-0 bg-slate-200 focus:outline-0 shadow-none focus-visible:ring-0 2xl:w-[450px]  lg:w-[350px] sm:w-[250px] px-2 rounded-sm"
                placeholder="Search here for items...."
              ></Input>
              <div className="absolute   top-2 right-1.5">
                <Search size={20} color="#9E9E9E" />
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
