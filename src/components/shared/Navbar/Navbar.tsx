import React from "react";
import TopInfo from "./TopInfo";
import NavLinksSection from "./NavLinksSection";
import NavLogoCategory from "./NavLogoCategory";

const Navbar = () => {
  return (
    <div>
      <TopInfo></TopInfo>
      <NavLogoCategory></NavLogoCategory>
      <NavLinksSection></NavLinksSection>
    </div>
  );
};

export default Navbar;
