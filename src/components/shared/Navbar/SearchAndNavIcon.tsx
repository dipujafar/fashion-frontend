import ProfileIcon from "./NavIconsWithDropDown/ProfileIcon";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import NotificationIcon from "./NavIconsWithDropDown/NotificationIcon";
import WishListDropDown from "./NavIconsWithDropDown/WishListDropDown";
import CartDropDown from "./NavIconsWithDropDown/CartDropDown";
import Link from "next/link";
import { Mail } from "lucide-react";

const SearchAndNavIcon = () => {

  return (
    <>

      <Menubar className="border-none shadow-none">

        <div className="mr-2">
          <Link href="/inbox">
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
            <CartDropDown />
          </MenubarMenu>
        </div>

        <MenubarMenu>
          <ProfileIcon />
        </MenubarMenu>

      </Menubar>

    </>

  );
};

export default SearchAndNavIcon;
