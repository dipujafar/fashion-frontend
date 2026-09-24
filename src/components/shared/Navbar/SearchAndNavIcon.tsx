import ProfileIcon from "./NavIconsWithDropDown/ProfileIcon";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import NotificationIcon from "./NavIconsWithDropDown/NotificationIcon";
import WishListDropDown from "./NavIconsWithDropDown/WishListDropDown";
import CartDropDown from "./NavIconsWithDropDown/CartDropDown";
import MessageDropDown from "./NavIconsWithDropDown/MessageDropDown";

const SearchAndNavIcon = () => {

  return (
    <>

      <Menubar className="border-none shadow-none">

        <div className="mr-2">
          <MessageDropDown />
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
