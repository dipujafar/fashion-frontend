import CustomAvatar from "@/components/shared/CustomAvatar";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { IChatUser } from "@/types";
import moment from "moment";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const UserCard = ({ chat, userName }: { chat: IChatUser, userName?: string }) => {

  const user = useSelector((state: RootState) => state?.auth?.user);

  const pathName = usePathname();

  const friendUser = chat?.user1?.id === user?.id ? chat?.user2 : chat?.user1;

  const active = pathName === `/inbox/${friendUser?.userName}`;

  const unreadCount = chat?._count?.messages || 0;

  const offerStatusMsg = chat?.messages[0]?.offer ? chat?.messages[0]?.offer?.status === "ACCEPTED" ? "🏷️Offer Accepted" : chat?.messages[0]?.offer?.status === "REJECTED" ? "🏷️Offer Rejected" : chat?.messages[0]?.offer?.status === "PENDING" ? "🏷️Waiting for offer response" : "🏷️Offer cancelled" : "";

  const lastmsg = chat?.messages[0]?.text ? chat?.messages[0]?.text : chat?.messages[0]?.files?.length > 0 ? "Sent an attachment" : chat?.messages[0]?.offer ? offerStatusMsg : "No messages yet";

  return (
    <Link
      href={`/inbox/${friendUser?.userName}`}>
      <div
        className={`flex items-start p-3 py-4 gap-x-3 border-b border-gray-200 hover:bg-zinc-100 duration-150 ${active ? "bg-zinc-100" : ""}`}
      >
        <div>
          {/* <Image src={img} alt={name} className="w-full rounded-full" /> */}
          <CustomAvatar img={friendUser?.picture?.url} name={friendUser?.userName || "Unknown User"} className="md:size-12 size-10" fallbackClass="text-base md:text-base" />
        </div>

        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <p className={cn("text-base font-medium text-black")}>
              {friendUser?.userName}
            </p>
            {<p className={`text-xs px-1.5 py-0.5 rounded-full font-normal text-secondary-2 text-gray-800`}>{moment(chat?.messages[0]?.createdAt).calendar(null, {
              sameDay: "hh:mm A",
              lastDay: "[Yesterday]",
              sameElse: "DD-MM-YYYY",
            })}</p>}

          </div>

          <div className="flex items-center justify-between">
            <p className="line-clamp-1 text-sm text-black/60">{lastmsg}</p>
            {unreadCount > 0 && <p className={`text-xs w-5 h-5 flex justify-center items-center rounded-full font-semibold text-secondary-2  bg-primary-black text-white`}>{unreadCount}</p>}

          </div>



        </div>

      </div>
    </Link >
  );
};

export default UserCard;