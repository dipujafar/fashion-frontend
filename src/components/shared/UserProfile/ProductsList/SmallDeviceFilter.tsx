import Categories from "@/components/shared/Categories/Categories";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { collectionTypes } from "@/lib/collectionType";
import { brandsData } from "@/lib/brandsData";
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
