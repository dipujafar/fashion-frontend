import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SmallDeviceFilter() {
  return (
    <>
    <Button className="rounded-full hover:bg-transparent hover:text-black hover:border hover:border-black duration-500 cursor-pointer"><ListFilter />Filter</Button>
     {/* <Sheet>
       <SheetTrigger asChild>
         <SlidersHorizontal />
       </SheetTrigger>
       <SheetContent side={"left"} className="h-screen overflow-scroll ">
         <div className="2xl:space-y-10 space-y-6 mt-10 px-2 mb-10 ">
           <Categories title="Category" data={collectionTypes}></Categories>
           <Categories title="Material" data={materialData}></Categories>
           <Categories title="BRANDS" data={brandsData}></Categories>
           <Categories title="Size" data={sizeData}></Categories>
           <Categories title="condition" data={conditionData}></Categories>
           <PriceCategory></PriceCategory>
           <ColorCategory></ColorCategory>
           <Categories title="Discount" data={discountData}></Categories>
         </div>
       </SheetContent>
     </Sheet> */}
    </>
  );
}
