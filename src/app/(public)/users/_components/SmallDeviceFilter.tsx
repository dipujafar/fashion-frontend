import Categories from "@/components/shared/Categories/Categories";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { userTypes } from "@/lib/userTypeData";
import { SlidersHorizontal } from "lucide-react";

export function SmallDeviceFilter() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <SlidersHorizontal />
      </SheetTrigger>
      <SheetContent side={"left"} className="h-screen overflow-scroll ">
        <div className="2xl:space-y-10 space-y-6 mt-10 px-2 mb-10 ">
          <Categories title="USER TYPE" data={userTypes}></Categories>
        </div>
      </SheetContent>
    </Sheet>
  );
}
