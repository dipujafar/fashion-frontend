import UserCard from "@/components/shared/Cards/UserCard";
import { userData } from "@/data/dummyData.tsx/userData";

const AllUsers = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3     lg:gap-4 gap-2">
      {userData?.map((user) => (
        <UserCard data={user} key={user._id}></UserCard>
      ))}
    </div>
  );
};

export default AllUsers;
