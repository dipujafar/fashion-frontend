import Categories from "@/components/shared/Categories/Categories";
import AllUsers from "./AllUsers";
import { userTypes } from "@/lib/userTypeData";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import { SmallDeviceFilter } from "./SmallDeviceFilter";

const UsersPageContainer = () => {
  return (
    <div>
      <div className=" grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 gap-4 xl:mt-8 mt-4">
        <div className="hidden lg:block">
          <Categories data={userTypes} title="USER TYPE"></Categories>
        </div>

        <div className=" xl:col-span-3 md:col-span-2 ">
          <AllUsers></AllUsers>
        </div>
      </div>
      {/* Pagination */}
      <PaginationSection></PaginationSection>
    </div>
  );
};

export default UsersPageContainer;
