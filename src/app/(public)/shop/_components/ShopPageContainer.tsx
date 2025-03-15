import Categories from "@/components/shared/Categories/Categories";
import { brandsData } from "@/lib/brandsData";
import { collectionTypes } from "@/lib/collectionType";
import { discountData } from "@/lib/discountData";
import ColorCategory from "./ColorCategory";
import PriceCategory from "./PriceCategory";

const ShopPageContainer = () => {
  return (
    <div className=" grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5	lg:gap-8 gap-4 xl:mt-8 mt-4">
      <div className="2xl:space-y-10 space-y-6">
        <Categories title="COLLECTION" data={collectionTypes}></Categories>
        <Categories title="BRANDS" data={brandsData}></Categories>
        <PriceCategory></PriceCategory>
        <ColorCategory></ColorCategory>

        <Categories title="Discount" data={discountData}></Categories>
      </div>

      <div className="2xl:col-span-4 xl:col-span-3 md:col-span-2 ">
        {/* <AllUsers></AllUsers> */}
      </div>
    </div>
  );
};

export default ShopPageContainer;
