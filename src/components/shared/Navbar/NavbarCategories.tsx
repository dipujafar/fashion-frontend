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

const navigationData = {
  NewIn: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "featured",
        defaultActive: true,
        name: "Featured",
        icon: Sparkles,
        categories: [
          {
            items: [
              "All",
              "Trending Now",
              "Just Landed",
              "This Week",
              "Back in Stock",
            ],
          },
          {
            items: [
              "Most Viewed",
              "Releases Today",
              "Only a Few Left",
              "Back in Trend",
              "Early Access",
            ],
          },
        ],
      },
      {
        id: "shopByCategory",
        name: "Shop by Category",
        icon: ShoppingBag,
        categories: [
          {
            items: [
              "Clothing",
              "Shoes",
              "Bags",
              "Accessories",
              "Beauty & Grooming",
            ],
          },
          {
            items: [
              "Watches",
              "Jewellery",
              "Activewear",
              "Loungewear",
              "Outerwear",
            ],
          },
        ],
      },
    ],
  },
  Designers: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "designerTypes",
        name: "Designer Types",
        defaultActive: true,
        icon: Gem,
        categories: [
          {
            items: [
              "All",
              "Luxury",
              "Emerging",
              "Sustainable",
              "Cult Favorites",
            ],
          },
          {
            items: [
              "Streetwear",
              "Minimalist",
              "Heritage",
              "Avant-garde",
              "Seasonal Icons",
            ],
          },
        ],
      },
      {
        id: "byItem",
        name: "Shop by Item",
        icon: Shirt,
        categories: [
          {
            items: ["Clothing", "Shoes", "Bags", "Accessories", "Watches"],
          },
          {
            items: ["Jewellery", "Beauty", "Fragrance", "Eyewear", "Scarves"],
          },
        ],
      },
    ],
  },
  Women: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "clothing",
        name: "Clothing",
        defaultActive: true,
        icon: Shirt,
        categories: [
          {
            title: "All",
            items: [
              "All",
              "Jumpers & sweaters",
              "Dresses",
              "Tops & T-shirts",
              "Pants & leggings",
              "Jumpsuits & rompers",
              "Lingerie & nightwear",
              "Activewear",
              "Other clothing",
            ],
          },
          {
            title: "Outerwear",
            items: [
              "Outerwear",
              "Suits & blazers",
              "Skirts",
              "Jeans",
              "Shorts & cropped pants",
              "Swimwear",
              "Maternity clothes",
              "Costumes & special outfits",
            ],
          },
        ],
      },
      {
        id: "shoes",
        name: "Shoes",
        icon: Footprints,
        categories: [
          {
            items: [
              "All",
              "Boat shoes, loafers & moccasins",
              "Clogs & mules",
              "Flip-flops & slides",
              "Lace-up shoes",
              "Sandals",
              "Sport shoes",
            ],
          },
          {
            items: [
              "Ballerinas",
              "Boots",
              "Espadrilles",
              "Heels",
              "Mary Janes & T-bar shoes",
              "Slippers",
              "Sneakers",
            ],
          },
        ],
      },
      {
        id: "bags",
        name: "Bags",
        icon: ShoppingBag,
        categories: [
          {
            items: [
              "All",
              "Beach bags",
              "Bucket bags",
              "Clutches",
              "Gym bags",
              "Hobo bags",
              "Luggage & suitcases",
              "Satchels & messenger bags",
              "Tote bags",
              "Wristlets",
            ],
          },
          {
            items: [
              "Backpacks",
              "Briefcases",
              "Fanny packs",
              "Garment bags",
              "Handbags",
              "Holdalls & duffel bags",
              "Makeup bags",
              "Shoulder bags",
              "Wallets",
            ],
          },
        ],
      },
      {
        id: "accessories",
        name: "Accessories",
        icon: Gem,
        categories: [
          {
            items: [
              "All",
              "Belts",
              "Hair accessories",
              "Hats & caps",
              "Keyrings",
              "Sunglasses",
              "Watches",
            ],
          },
          {
            items: [
              "Bandanas & headscarves",
              "Gloves",
              "Handkerchiefs",
              "Jewelry",
              "Scarves & shawls",
              "Umbrellas",
              "Other accessories",
            ],
          },
        ],
      },
      {
        id: "beauty",
        name: "Beauty",
        icon: Sparkles,
        categories: [
          {
            items: ["All", "Perfume", "Beauty tools", "Nail care", "Hair care"],
          },
          {
            items: [
              "Makeup",
              "Facial care",
              "Hand care",
              "Body care",
              "Other beauty items",
            ],
          },
        ],
      },
    ],
  },
  Men: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "clothing",
        name: "Clothing",
        defaultActive: true,
        icon: Shirt,
        categories: [
          {
            title: "All",
            items: [
              "All",
              "Outerwear",
              "Suits & blazers",
              "Pants",
              "Socks & underwear",
              "Swimwear",
              "Costumes & special outfits",
            ],
          },
          {
            title: "Outerwear",
            items: [
              "Jeans",
              "Tops & T-shirts",
              "Sweaters & sweatshirts",
              "Shorts",
              "Sleepwear",
              "Activewear",
              "Other men's clothing",
            ],
          },
        ],
      },
      {
        id: "shoes",
        name: "Shoes",
        icon: Footprints,
        categories: [
          {
            items: [
              "All",
              "Boots",
              "Espadrilles",
              "Formal shoes",
              "Slippers",
              "Sneakers",
            ],
          },
          {
            items: [
              "Boat shoes, loafers & moccasins",
              "Clogs & mules",
              "Flip-flops & slides",
              "Sandals",
              "Sport shoes",
            ],
          },
        ],
      },
      {
        id: "accessories",
        name: "Accessories",
        icon: Gem,
        categories: [
          {
            items: [
              "All",
              "Bandanas & headscarves",
              "Suspenders",
              "Handkerchiefs",
              "Jewelry",
              "Scarves & shawls",
              "Ties & bow ties",
              "Other accessories",
            ],
          },
          {
            items: [
              "Bags & backpacks",
              "Belts",
              "Gloves",
              "Hats & caps",
              "Pocket squares",
              "Sunglasses",
              "Watches",
            ],
          },
        ],
      },
      {
        id: "grooming",
        name: "Grooming",
        icon: Sparkles,
        categories: [
          {
            items: [
              "All",
              "Tools & accessories",
              "Body care",
              "Aftershave & cologne",
              "Grooming kits",
            ],
          },
          {
            items: [
              "Facial care",
              "Hair care",
              "Hand & nail care",
              "Makeup",
              "Other grooming items",
            ],
          },
        ],
      },
    ],
  },
  WeLove: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "popularNow",
        name: "Popular Now",
        defaultActive: true,
        icon: Sparkles,
        categories: [
          {
            items: [
              "Customer Picks",
              "Top Rated",
              "Back in Stock",
              "New Favorites",
              "Must-Haves",
            ],
          },
          {
            items: [
              "As Seen on Social",
              "Celebrity Picks",
              "Style Influencers",
              "Seasonal Trends",
              "Buzzworthy Finds",
            ],
          },
        ],
      },
      {
        id: "styleEdits",
        name: "Style Edits",
        icon: Shirt,
        categories: [
          {
            items: [
              "Festival Fits",
              "Vacation Vibes",
              "Luxury Looks",
              "Minimal Musts",
              "Retro Revival",
            ],
          },
          {
            items: [
              "Workwear Edit",
              "Weekend Wear",
              "Statement Pieces",
              "Understated Chic",
              "Transitional Pieces",
            ],
          },
        ],
      },
    ],
  },
  Vintage: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "vintageClothing",
        name: "Clothing",
        defaultActive: true,
        icon: Shirt,
        categories: [
          {
            items: [
              "Vintage Dresses",
              "Retro Jackets",
              "Old School Denim",
              "Printed Shirts",
              "80s & 90s Tees",
            ],
          },
          {
            items: [
              "Corduroy Pants",
              "Vintage Skirts",
              "Statement Suits",
              "Vintage Knitwear",
              "Overalls & Jumpsuits",
            ],
          },
        ],
      },
      {
        id: "vintageAccessories",
        name: "Accessories",
        icon: Gem,
        categories: [
          {
            items: [
              "Vintage Bags",
              "Classic Watches",
              "Antique Jewellery",
              "Brooches",
              "Hair Combs",
            ],
          },
          {
            items: [
              "Retro Sunglasses",
              "Silk Scarves",
              "Coin Purses",
              "Gloves",
              "Pocket Squares",
            ],
          },
        ],
      },
    ],
  },
  Bags: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "styles",
        name: "Bag Styles",
        defaultActive: true,
        icon: ShoppingBag,
        categories: [
          {
            items: [
              "Tote Bags",
              "Crossbody",
              "Mini Bags",
              "Bucket Bags",
              "Satchels",
            ],
          },
          {
            items: [
              "Clutches",
              "Shoulder Bags",
              "Top Handle Bags",
              "Backpacks",
              "Messenger Bags",
            ],
          },
        ],
      },
      {
        id: "useCases",
        name: "Occasions",
        icon: PartyPopper,
        categories: [
          {
            items: ["Work", "Travel", "Evening", "Sport", "Everyday"],
          },
          {
            items: ["Luxury", "Vintage", "Designer", "Minimalist", "Statement"],
          },
        ],
      },
    ],
  },
  "Watches&Jewellery": {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "jewellery",
        name: "Jewellery",
        defaultActive: true,
        icon: Gem,
        categories: [
          {
            items: ["Necklaces", "Earrings", "Rings", "Bracelets", "Brooches"],
          },
          {
            items: ["Charms", "Anklets", "Cuffs", "Chokers", "Body Jewellery"],
          },
        ],
      },
      {
        id: "watches",
        name: "Watches",
        icon: Watch,
        categories: [
          {
            items: [
              "Smartwatches",
              "Luxury Watches",
              "Chronographs",
              "Minimalist",
              "Vintage Styles",
            ],
          },
          {
            items: [
              "Leather Strap",
              "Metal Strap",
              "Sport Watches",
              "Automatic",
              "Digital Watches",
            ],
          },
        ],
      },
    ],
  },
  Children: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "kidsClothing",
        name: "Clothing",
        defaultActive: true,
        icon: Shirt,
        categories: [
          {
            items: ["Tops", "Bottoms", "Dresses", "Outerwear", "Sleepwear"],
          },
          {
            items: [
              "Sets & Bundles",
              "Activewear",
              "Swimwear",
              "Rainwear",
              "Special Occasion",
            ],
          },
        ],
      },
      {
        id: "kidsAccessories",
        name: "Shoes & Accessories",
        icon: Footprints,
        categories: [
          {
            items: ["Sneakers", "Sandals", "Boots", "School Shoes", "Slippers"],
          },
          {
            items: ["Hats", "Backpacks", "Gloves", "Scarves", "Toys & Gifts"],
          },
        ],
      },
    ],
  },
  ExpressDelivery: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "expressProducts",
        name: "Fast Delivery",
        defaultActive: true,
        icon: Sparkles,
        categories: [
          {
            items: ["Clothing", "Shoes", "Bags", "Accessories", "Beauty"],
          },
          {
            items: [
              "Watches",
              "Jewellery",
              "Grooming",
              "Kidswear",
              "Gift Items",
            ],
          },
        ],
      },
      {
        id: "deliveryRegions",
        name: "By Region",
        icon: LandPlot,
        categories: [
          {
            items: [
              "US Express",
              "EU Express",
              "UK Express",
              "Asia Express",
              "Global Fast",
            ],
          },
          {
            items: [
              "Same Day",
              "Next Day",
              "2-Day Delivery",
              "Weekend Delivery",
              "Holiday Express",
            ],
          },
        ],
      },
    ],
  },
  DirectShipping: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "shippingSource",
        name: "Ships From",
        defaultActive: true,
        icon: Gem,
        categories: [
          {
            items: [
              "From Brand",
              "From Partner",
              "From Warehouse",
              "Local Dispatch",
              "Direct Import",
            ],
          },
          {
            items: [
              "Designer Store",
              "Outlet",
              "Marketplace Vendor",
              "Fulfilled by Us",
              "Fulfilled by Seller",
            ],
          },
        ],
      },
      {
        id: "shippingBenefits",
        name: "Shipping Perks",
        icon: Telescope,
        categories: [
          {
            items: [
              "Duty-Free",
              "Tracked",
              "Fast Dispatch",
              "Free Shipping",
              "Easy Returns",
            ],
          },
          {
            items: [
              "No Customs Fees",
              "Eco Packaging",
              "Multiple Warehouses",
              "Express Available",
              "Local Returns",
            ],
          },
        ],
      },
    ],
  },
};

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
                              <a
                                href="#"
                                className="text-gray-600 hover:text-black transition-colors"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    <p>No items available in this category</p>
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
