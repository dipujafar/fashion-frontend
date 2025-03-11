import React from "react";
import TopInfo from "./TopInfo";
import NavLinksSection from "./NavLinksSection";
import NavLogoCategory from "./NavLogoCategory";

const Navbar = () => {
  return (
    <div>
      <NavLogoCategory></NavLogoCategory>
      <div className="hidden md:block">
        <NavLinksSection></NavLinksSection>
      </div>
    </div>
  );
};

export default Navbar;
