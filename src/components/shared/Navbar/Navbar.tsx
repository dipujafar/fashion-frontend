import Container from "../Container";
import GlobalItemAndMemberSearch from "./GlobalItemAndMemberSearch";
import NavLogoCategory from "./NavLogoCategory";
import NavbarCategories from "./NavbarCategories";

const Navbar = () => {
  return (
    <>
      <NavLogoCategory/>
      <Container className="lg:hidden px-0">
        <GlobalItemAndMemberSearch/>
      </Container>
      {/* <div className="hidden md:block">
        <NavLinksSection></NavLinksSection>
      </div> */}
      <NavbarCategories />
    </>
  );
};

export default Navbar;
