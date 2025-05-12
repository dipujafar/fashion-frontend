import UserRoleCard from "@/components/shared/Cards/UserRoleCard";
import { userRoleData } from "@/data/dummyData.tsx/userRoleData";

const UserRoleContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
      {userRoleData?.map((role) => (
        <UserRoleCard data={role}></UserRoleCard>
      ))}
    </div>
  );
};

export default UserRoleContainer;
