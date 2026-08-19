"use client"
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { NotificationBellIcon, NotificationBellIconWhite } from "@/icons";
import { useNotificationsQuery } from "@/redux/api/notification.api";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export default function NotificationIcon() {

  const { data: notifications, isLoading, isSuccess } = useNotificationsQuery({});

  return (
    <>
      <MenubarTrigger className="cursor-pointer relative">
        <NotificationBellIcon className="size-5 lg:size-6" />

        {(isSuccess && notifications?.data?.data?.length > 0) && <span className="absolute top right grid min-h-[20px] min-w-[20px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 py-0.5 px-[3px] text-xs text-white">{notifications?.data?.data?.length}</span>}

      </MenubarTrigger>
      <MenubarContent className="overflow-y-auto max-h-[calc(100vh-100px)] rounded-none min-w-xs">

        <div className="border-b border-gray-200 flex flex-row justify-between items-center py-2 px-3">
          <p className="text-base font-medium">Notifications</p>
          {(isSuccess && notifications?.data?.data?.length > 0) && (
            <button className="rounded-none text-sm cursor-pointer">Mark All as Read</button>
          )}
        </div>

        {
          isLoading ? (<div className="flex-center h-28">
            <span className="loaderDark !w-10"> </span>
          </div>) : isSuccess ? <>


            {notifications?.data?.data?.map((notification) => (
              <div key={notification?.id} className="overflow-y-auto max-h-[450px]">
                <MenubarItem className="">

                  <Card
                    className="p-4 shadow-none rounded cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="size-8 bg-gray-900  flex justify-center items-center flex-shrink-0">
                        <NotificationBellIconWhite className="text-white size-6" />
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">
                              {notification?.message}
                            </p>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {moment(notification?.createdAt).format("MM/DD/YYYY, hh:mm A")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </MenubarItem>
              </div>
            ))}

            {notifications?.data?.data?.length <= 0 && <div className="py-10 space-y-2">
              <Image src={"/notification.gif"} alt="empty-cart" className="h-12 w-auto mx-auto" height={500} width={500} />
              <p className="text-center text-gray-500 text-sm">No notifications available</p>
              <center>
              </center>
            </div>}


          </> : <></>
        }

        {(isSuccess && notifications?.data?.data?.length > 0) && <Link href={"/shopping-cart"}>
          <Button variant={"default"} className="w-full mt-2 rounded-none py-5 border-2 border-primary-black cursor-pointer font-semibold">View All</Button>
        </Link>}


      </MenubarContent>
    </>
  );
}
