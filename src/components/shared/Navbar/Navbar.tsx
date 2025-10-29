import Container from "../Container";
import GlobalItemAndMemberSearch from "./GlobalItemAndMemberSearch";
import NavLinksSection from "./NavLinksSection";
import NavLogoCategory from "./NavLogoCategory";
import NavbarCategories from "./NavbarCategories";

const Navbar = () => {
  return (
    <div>
      <NavLogoCategory/>
      <Container className="md:hidden px-0">
        <GlobalItemAndMemberSearch/>
      </Container>
      <div className="hidden md:block">
        <NavLinksSection></NavLinksSection>
      </div>
      <NavbarCategories />
    </div>
  );
};

export default Navbar;
