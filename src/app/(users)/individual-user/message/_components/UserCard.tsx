import CustomAvatar from "@/components/shared/CustomeAvater";
import { cn } from "@/lib/utils";
import Image from "next/image";

const UserCard = ({ user, active }: { user: any; active: boolean }) => {
  const { img, name, latestMsg } = user;
  return (
    <div
      className={`flex items-center  gap-x-4 ${
        active ? "bg-[#E6E6E6]  p-2 rounded-lg " : ""
      }`}
    >
      <div>
        {/* <Image src={img} alt={name} className="w-full rounded-full" /> */}
        <CustomAvatar img={img} name={name} className="md:size-14 size-10" />
      </div>

      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h4
            className={cn(
              "text-xl font-medium text-black"
            )}
          >
            {name}
          </h4>
          <p className="font-medium text-secondary-2 text-gray-500">12m</p>
        </div>
        <p className="text-ellipsis text-sm text-black/60">{latestMsg}</p>
        <div className="flex items-center gap-x-1">
          <Image src="/t_shirt_image.png" alt="product_image" width={1200} height={1200} className="size-10" />
          <p className="text-black/60">Jeans & T-shirt</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;