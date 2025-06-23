import Categories from "@/components/shared/Categories/Categories";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { collectionTypes } from "@/lib/collectionType";
import { brandsData } from "@/lib/brandsData";
import { SlidersHorizontal } from "lucide-react";
import { categoryData } from "@/lib/categoryData";
import PriceCategory from "@/app/(public)/shop/_components/PriceCategory";
import ColorCategory from "@/app/(public)/shop/_components/ColorCategory";
import { discountData } from "@/lib/discountData";

export function SmallDeviceFilter() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <SlidersHorizontal />
      </SheetTrigger>
      <SheetContent side={"left"} className="h-screen overflow-scroll ">
        <div className="2xl:space-y-5 space-y-4 mt-10 px-2 mb-10 ">
          <Categories title="Category" data={categoryData}></Categories>
          <Categories title="COLLECTION" data={collectionTypes}></Categories>
          <Categories title="BRANDS" data={brandsData}></Categories>
          <PriceCategory></PriceCategory>
          <ColorCategory></ColorCategory>
          <Categories title="Discount" data={discountData}></Categories>
        </div>
      </SheetContent>
    </Sheet>
  );
}
