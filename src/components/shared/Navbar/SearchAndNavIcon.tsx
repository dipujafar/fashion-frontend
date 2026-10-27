import ProfileIcon from "./NavIconsWithDropDown/ProfileIcon";
import NotificationIcon from "./NavIconsWithDropDown/NotificationIcon";
import WishListDropDown from "./NavIconsWithDropDown/WishListDropDown";
import CartDropDown from "./NavIconsWithDropDown/CartDropDown";
import MessageDropDown from "./NavIconsWithDropDown/MessageDropDown";

const SearchAndNavIcon = () => {

  return (
    <div className="flex flex-row items-center gap-x-1">

      <div className="mr-2">
        <MessageDropDown />
      </div>

      <WishListDropDown />


      <NotificationIcon />


      <CartDropDown />


      <ProfileIcon />

    </div>

  );
};

export default SearchAndNavIcon;
