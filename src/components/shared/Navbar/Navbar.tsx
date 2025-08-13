import NavLinksSection from "./NavLinksSection";
import NavLogoCategory from "./NavLogoCategory";
import NavbarCategories from "./NavbarCategories";

const Navbar = () => {
  return (
    <div>
      <NavLogoCategory></NavLogoCategory>
      <div className="hidden md:block">
        <NavLinksSection></NavLinksSection>
      </div>
      <NavbarCategories />
    </div>
  );
};

export default Navbar;
