import Categories from "@/components/shared/Categories/Categories";
import AllUsers from "./AllUsers";
import UserTypes from "./UserTypes";
import { userTypes } from "@/lib/userTypeData";

const UsersPageContainer = () => {
  return (
    <div className=" grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5	lg:gap-8 gap-4 xl:mt-8 mt-4">
      <Categories data={userTypes} title="USER TYPE"></Categories>

      <div className="2xl:col-span-4 xl:col-span-3 md:col-span-2 ">
        <AllUsers></AllUsers>
      </div>
    </div>
  );
};

export default UsersPageContainer;
