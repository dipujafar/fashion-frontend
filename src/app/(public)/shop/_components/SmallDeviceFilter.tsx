import Categories from "@/components/shared/Categories/Categories";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import PriceCategory from "./PriceCategory";
import ColorCategory from "./ColorCategory";
import { collectionTypes } from "@/lib/collectionType";
import { brandsData } from "@/lib/brandsData";
import { discountData } from "@/lib/discountData";
import { SlidersHorizontal } from "lucide-react";

export function SmallDeviceFilter() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <SlidersHorizontal />
      </SheetTrigger>
      <SheetContent side={"left"} className="h-screen overflow-scroll ">
        <div className="2xl:space-y-10 space-y-6 mt-10 px-2 mb-10 ">
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
