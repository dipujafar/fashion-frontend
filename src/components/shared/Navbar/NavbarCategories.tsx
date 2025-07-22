"use client";
import * as React from "react";
import {
  ChevronRight,
  Grid3X3,
  Shirt,
  ShoppingBag,
  Sparkles,
  Footprints,
  Gem,
  Menu,
  X,
  PartyPopper,
  Watch,
  LandPlot,
  Telescope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatLabel } from "@/utils/formatText";
import { useUpdateSearchParamsWithRedirect } from "@/hooks/useUpdateSearchParamsWithRedirct";
import { navigationData } from "@/lib/navigation-data";


const mainNavItems = [
  "NewIn",
  "Designers",
  "Women",
  "Men",
  "WeLove",
  "Vintage",
  "Bags",
  "Watches&Jewellery",
  "Children",
  "ExpressDelivery",
  "DirectShipping",
];

export default function MegaNavigation() {
  const [activeNav, setActiveNav] = React.useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = React.useState<
    string | null
  >(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigationRef = React.useRef<HTMLDivElement>(null);
  const updateParams = useUpdateSearchParamsWithRedirect();

  const handleNavHover = (item: string) => {
    if (window.innerWidth >= 768) {
      if (navigationData[item as keyof typeof navigationData]) {
        setActiveNav(item);
        setActiveSubcategory(null);
        setIsMenuOpen(true);
      }
    }
  };

  const handleNavClick = (item: string) => {
    if (navigationData[item as keyof typeof navigationData]) {
      if (activeNav === item) {
        setActiveNav(null);
        setIsMenuOpen(false);
        setActiveSubcategory(null);
      } else {
        setActiveNav(item);
        setActiveSubcategory(null);
        setIsMenuOpen(true);
      }
    }
  };

  // Only close when mouse leaves the entire navigation component
  const handleNavigationLeave = () => {
    if (window.innerWidth >= 768) {
      setActiveNav(null);
      setActiveSubcategory(null);
      setIsMenuOpen(false);
    }
  };

  const handleSubcategoryHover = (subcategoryId: string) => {
    if (subcategoryId.toLocaleLowerCase() === "all") {
      setActiveSubcategory(null);
      return;
    }
    setActiveSubcategory(subcategoryId);
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    setActiveSubcategory(
      activeSubcategory === subcategoryId ? null : subcategoryId
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setActiveNav(null);
      setIsMenuOpen(false);
      setActiveSubcategory(null);
    }
  };

  const currentData = activeNav
    ? navigationData[activeNav as keyof typeof navigationData]
    : null;

  // Get the current subcategory or fallback to default active
  const getActiveSubcategory = () => {
    if (!currentData) return null;

    // If there's an explicitly selected subcategory, use it
    if (activeSubcategory) {
      return currentData.subcategories.find(
        (sub) => sub.id === activeSubcategory
      );
    }

    // Otherwise, find and use the default active subcategory
    return currentData.subcategories.find((sub) => sub.defaultActive);
  };

  const currentSubcategory = getActiveSubcategory();

  const handleRedirect = (
    category: string | null,
    currentSubcategory: string | null
  ) => {
    updateParams({
      path: "/shop",
      params: {
        category: activeNav,
        subCategory: activeSubcategory || currentSubcategory,
        finalCategory: category,
        filter: null, // this key will be removed if it exists
      },
    });
    setIsMenuOpen(false);
  };

  return (
    <div
      className="relative"
      ref={navigationRef}
      onMouseLeave={handleNavigationLeave}
    >
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <div className="text-lg font-semibold"></div>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Main Navigation - Desktop */}
      <nav className="hidden md:block border-b bg-white border ">
        <div className="flex justify-center px-20 overflow-x-auto">
          <div className="flex items-center">
            <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
              {mainNavItems.map((item) => (
                <div
                  key={item}
                  className="relative flex-shrink-0"
                  onMouseEnter={() => handleNavHover(item)}
                >
                  <button
                    onClick={() => handleNavClick(item)}
                    className={cn(
                      "px-3 py-2 text-gray-600 font-medium transition-colors hover:text-black whitespace-nowrap cursor-pointer",
                      activeNav === item
                        ? "text-black border-b-2 border-black"
                        : "text-gray-700"
                    )}
                  >
                    {formatLabel(item)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={cn(
          "md:hidden bg-white border-b transition-all duration-300",
          isMobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="px-4 py-2">
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
            {mainNavItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "px-3 py-2 font-medium rounded-md transition-colors whitespace-nowrap flex-shrink-0",
                  activeNav === item
                    ? "bg-blue-100 text-black"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mega Menu Dropdown */}
      {isMenuOpen && currentData && (
        <div className="absolute left-0 top-full z-50 w-full bg-white shadow-lg border-t">
          <div className="mx-auto max-w-7xl">
            {/* Desktop Layout */}
            <div className="hidden md:flex">
              {/* Left Sidebar - Subcategories */}
              <div className="w-64 border-r bg-gray-50 p-4">
                <div className="space-y-1">
                  {currentData.subcategories.map((subcategory) => {
                    const IconComponent = subcategory.icon;
                    const isActive =
                      activeSubcategory === subcategory.id ||
                      (!activeSubcategory && subcategory.defaultActive);

                    return (
                      <div
                        key={subcategory.id}
                        className={cn(
                          "flex items-center justify-between rounded-md px-3 py-2 xl:text-lg cursor-pointer transition-colors",
                          isActive
                            ? "bg-white shadow-sm"
                            : "text-gray-700 hover:bg-white hover:text-black"
                        )}
                        onMouseEnter={() =>
                          handleSubcategoryHover(subcategory.id)
                        }
                        onClick={() => handleRedirect(null, null)}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="size-5 " />
                          <span>{subcategory.name}</span>
                        </div>
                        {subcategory.categories.length > 0 && (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Right Content - Categories */}
              <div className="flex-1 p-6">
                {currentSubcategory &&
                currentSubcategory.categories.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {currentSubcategory.categories.map((category, index) => (
                      <div key={index}>
                        <ul className="space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <p
                                onClick={() =>
                                  handleRedirect(item, currentSubcategory?.name)
                                }
                                className="text-gray-600 hover:text-black transition-colors cursor-pointer"
                              >
                                {item}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    {/* <p>No items available in this category</p> */}
                  </div>
                )}
              </div>
            </div>
            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="p-4 space-y-4">
                {/* Subcategories */}
                <div className="space-y-2">
                  {currentData.subcategories.map((subcategory) => {
                    const IconComponent = subcategory.icon;
                    const isActive =
                      activeSubcategory === subcategory.id ||
                      (!activeSubcategory && subcategory.defaultActive);

                    return (
                      <div key={subcategory.id}>
                        <button
                          onClick={() => handleSubcategoryClick(subcategory.id)}
                          className={cn(
                            "w-full flex items-center justify-between rounded-md px-3 py-3 xl:text-lg transition-colors",
                            isActive
                              ? "bg-blue-50 text-black"
                              : "text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-4 w-4 text-black" />
                            <span>{subcategory.name}</span>
                          </div>
                          {subcategory.categories.length > 0 && (
                            <ChevronRight
                              className={cn(
                                "h-4 w-4 transition-transform",
                                isActive ? "rotate-90" : ""
                              )}
                            />
                          )}
                        </button>
                        {/* Mobile Categories */}
                        {isActive && subcategory.categories.length > 0 && (
                          <div className="mt-2 ml-4 space-y-4 border-l-2 border-gray-100 pl-4">
                            {subcategory.categories.map((category, index) => (
                              <div key={index}>
                                <div className="space-y-1">
                                  {category.items.map((item, itemIndex) => (
                                    <a
                                      key={itemIndex}
                                      href="#"
                                      className="block text-gray-600 hover:text-black transition-colors py-1"
                                    >
                                      {item}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
