import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { NotificationBellIcon, NotificationBellIconWhite } from "@/icons";
import Link from "next/link";

const dummyNotifications = [
  {
    id: "1",
    message: "Dear Aris, Track your parcel from Fashion.",
    timestamp: "Fri, 12:30pm",
    sender: "Fashion Store",
  },
  {
    id: "2",
    message: "Dear Aris, Track your parcel from Fashion.",
    timestamp: "Fri, 12:30pm",
    sender: "Fashion Store",
  },
  {
    id: "3",
    message: "Dear Aris, Track your parcel from Fashion.",
    timestamp: "Fri, 12:30pm",
    sender: "Fashion Store",
  },
  {
    id: "4",
    message: "Dear Aris, Track your parcel from Fashion.",
    timestamp: "Fri, 12:30pm",
    sender: "Fashion Store",
  },
  {
    id: "5",
    message: "Dear Aris, Track your parcel from Fashion.",
    timestamp: "Fri, 12:30pm",
    sender: "Fashion Store",
  },
];

export default function NotificationIcon() {
  return (
    <>
      <MenubarTrigger>
        <NotificationBellIcon className="size-7 md:size-5" />
      </MenubarTrigger>
      <MenubarContent>
        {dummyNotifications.map((notification) => (
          <div key={notification.id}>
            <MenubarItem className="cursor-pointer">
              <Card
                key={notification.id}
                className="p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="size-8 bg-gray-900  flex justify-center items-center flex-shrink-0">
                    <NotificationBellIconWhite className="text-white size-6" />
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 break-words">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </MenubarItem>
          </div>
        ))}
        <Link href={"/notifications"}>
          <Button className="w-full mt-2">View All</Button>
        </Link>
      </MenubarContent>
    </>
  );
}
