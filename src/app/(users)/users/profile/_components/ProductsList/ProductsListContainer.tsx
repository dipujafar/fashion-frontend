import Categories from "@/components/shared/Categories/Categories";
import { collectionTypes } from "@/lib/collectionType";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import AllUploadedProduct from "./AllUploadedProduct";
import { SmallDeviceFilter } from "./SmallDeviceFilter";
import { categoryData } from "@/lib/categoryData";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ProductsListContainer = () => {
  return (
    <div>
      <div className="grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5	lg:gap-8 gap-4 ">
        <div className="2xl:space-y-10 space-y-6 hidden lg:block">
            <div className="relative">
            <Search
              size={20}
              color="#00000026"
              className="absolute top-1/4 left-0.5"
            />
            <Input
              className=" bg-[#F6F6F6] pl-6 py-5"
              placeholder="Search any dress, price,..."
            />
          </div>
          <Categories title="Category" data={categoryData}></Categories>
          <Categories title="COLLECTION" data={collectionTypes}></Categories>
        </div>

        <div className="2xl:col-span-4 xl:col-span-3 md:col-span-2 ">
          {/* =============================== categories ========================== */}
          <div className="flex justify-between items-center xl:mb-8 mb-4 lg:hidden ">
            <div className="relative">
              <div className="absolute top-1/4 left-0.5 min-w-[250px]">
                <Search size={20} color="#00000026" />
              </div>
              <Input
                className=" bg-[#F6F6F6] pl-6 py-5"
                placeholder="Search any dress, price,..."
              />
            </div>
            <div className="lg:hidden block">
              <SmallDeviceFilter></SmallDeviceFilter>
            </div>
          </div>
          {/* ========================= all products ========================== */}
          <AllUploadedProduct></AllUploadedProduct>
        </div>
      </div>
      {/* Pagination */}
      <PaginationSection></PaginationSection>
    </div>
  );
};

export default ProductsListContainer;
