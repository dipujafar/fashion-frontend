import CustomAvatar from "@/components/shared/CustomAvatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

const UserCard = ({ user, active }: { user: any; active: boolean }) => {
  const { img, name, latestMsg } = user;
  return (
    <div
      className={`flex items-start p-3 gap-x-3 border-b border-gray-200 ${active ? "bg-[#E6E6E6] p-2" : ""}`}
    >
      <div>
        {/* <Image src={img} alt={name} className="w-full rounded-full" /> */}
        <CustomAvatar img={img} name={name} className="md:size-12 size-10" />
      </div>

      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <p className={cn("text-base font-medium text-black")}>
            {name}
          </p>
          <p className="font-medium text-sm text-secondary-2 text-gray-600">12m</p>
        </div>
        <p className="line-clamp-1 text-sm text-black/60">{latestMsg}</p>
        <div className="flex items-center gap-x-1">
          <Image src="/t_shirt_image.png" alt="product_image" width={1200} height={1200} className="size-8 rounded" />
        </div>
      </div>

    </div>
  );
};

export default UserCard;