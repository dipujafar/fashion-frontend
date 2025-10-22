"use client";
import Link from "next/link";
import { CartIcon } from "@/icons";
import ProfileIcon from "./NavIconsWithDropDown/ProfileIcon";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import NotificationIcon from "./NavIconsWithDropDown/NotificationIcon";
import { Mail } from "lucide-react";
import WishListDropDown from "./NavIconsWithDropDown/WishListDropDown";

const SearchAndNavIcon = () => {
  return (
    <Menubar className="border-none shadow-none">
      {/* <div>
        <Link href={"/messages"}>
          <Mail />
        </Link>
      </div> */}
      <div className="px-1.5">
        <Link href={"/professional-seller/dashboard/message"}>
          <Mail className="size-[20px] lg:size-[24px]" color="#212121" />
        </Link>
      </div>
      <div>
        <MenubarMenu>
          <WishListDropDown />
        </MenubarMenu>
      </div>

      <MenubarMenu>
        <NotificationIcon />
      </MenubarMenu>
      <div>
        <MenubarMenu>
          <WishListDropDown />
        </MenubarMenu>
      </div>
      <MenubarMenu>
        <ProfileIcon />
      </MenubarMenu>
    </Menubar>
  );
};

export default SearchAndNavIcon;
