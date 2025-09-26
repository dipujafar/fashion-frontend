"use client";
import Link from "next/link";
import { CartIcon, WishListIcon } from "@/icons";
import ProfileIcon from "./NavIconsWithDropDown/ProfileIcon";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import NotificationIcon from "./NavIconsWithDropDown/NotificationIcon";

const SearchAndNavIcon = () => {
  return (
    <Menubar className="border-none shadow-none">
      <div>
        <Link href={"/wishlist"}>
          <WishListIcon />
        </Link>
      </div>
      <MenubarMenu>
        <NotificationIcon />
      </MenubarMenu>
      <div>
        <CartIcon />
      </div>
      <MenubarMenu>
        <ProfileIcon></ProfileIcon>
      </MenubarMenu>
    </Menubar>
  );
};

export default SearchAndNavIcon;
