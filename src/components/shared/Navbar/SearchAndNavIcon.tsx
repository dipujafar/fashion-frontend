"use client";
import Link from "next/link";
import { CartIcon, WishListIcon } from "@/icons";
import ProfileIcon from "./NavIconsWithDropDown/ProfileIcon";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import NotificationIcon from "./NavIconsWithDropDown/NotificationIcon";
import { Mail } from "lucide-react";

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
          <Mail className="size-[22px] lg:size-[26px]" color="#212121" />
        </Link>
      </div>
      <div>
        <Link href={"/wishlist"}>
          <WishListIcon />
        </Link>
      </div>

      <MenubarMenu>
        <NotificationIcon />
      </MenubarMenu>
      <div>
        <Link href={"/shopping-cart/shopping"}>
          <CartIcon />
        </Link>
      </div>
      <MenubarMenu>
        <ProfileIcon></ProfileIcon>
      </MenubarMenu>
    </Menubar>
  );
};

export default SearchAndNavIcon;
