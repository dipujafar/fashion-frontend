"use client";

import { useState } from "react";
import {
  Users,
  User,
  Palette,
  Baby,
  Home,
  Zap,
  Gamepad2,
  Gift,
  Trophy,
  Info,
  Settings,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const categoriesData = [
  {
    name: "Women",
    icon: Users,
    subcategories: [
      {
        title: "See all",
        items: [{ title: "All Women's Items" }],
      },
      {
        title: "Clothing",
        items: [
          { title: "Dresses" },
          { title: "Tops & Blouses" },
          { title: "Pants & Jeans" },
          { title: "Skirts" },
          { title: "Jackets & Coats" },
        ],
      },
      {
        title: "Shoes",
        items: [
          { title: "Heels" },
          { title: "Flats" },
          { title: "Sneakers" },
          { title: "Boots" },
        ],
      },
      {
        title: "Accessories",
        items: [
          { title: "Bags & backpacks" },
          { title: "Belts" },
          { title: "Gloves" },
          { title: "Hats & caps" },
          { title: "Pocket squares" },
          { title: "Sunglasses" },
          { title: "Watches" },
        ],
      },
      {
        title: "Grooming",
        items: [
          { title: "Skincare" },
          { title: "Makeup" },
          { title: "Fragrance" },
        ],
      },
    ],
  },
  {
    name: "Men",
    icon: User,
    subcategories: [
      {
        title: "See all",
        items: [{ title: "All Men's Items" }],
      },
      {
        title: "Clothing",
        items: [
          { title: "Shirts" },
          { title: "T-Shirts" },
          { title: "Pants" },
          { title: "Suits" },
          { title: "Jackets" },
        ],
      },
      {
        title: "Shoes",
        items: [
          { title: "Dress Shoes" },
          { title: "Sneakers" },
          { title: "Boots" },
          { title: "Casual Shoes" },
        ],
      },
      {
        title: "Accessories",
        items: [
          { title: "Bandanas & headwraps" },
          { title: "Braces" },
          { title: "Handkerchiefs" },
          { title: "Jewellery" },
          { title: "Scarves & shawls" },
          { title: "Ties & bow ties" },
          { title: "Other accessories" },
        ],
      },
    ],
  },
  {
    name: "Designer",
    icon: Palette,
    subcategories: [
      {
        title: "Luxury Brands",
        items: [
          { title: "Premium Collections" },
          { title: "Limited Edition" },
          { title: "Haute Couture" },
        ],
      },
      {
        title: "Emerging Designers",
        items: [
          { title: "New Talent" },
          { title: "Sustainable Fashion" },
          { title: "Avant-garde" },
        ],
      },
    ],
  },
  {
    name: "Kids",
    icon: Baby,
    subcategories: [
      {
        title: "Baby",
        items: [
          { title: "Baby Clothes" },
          { title: "Baby Shoes" },
          { title: "Baby Accessories" },
        ],
      },
      {
        title: "Children",
        items: [
          { title: "Boys Clothing" },
          { title: "Girls Clothing" },
          { title: "Kids Shoes" },
          { title: "School Essentials" },
        ],
      },
    ],
  },
  {
    name: "Home",
    icon: Home,
    subcategories: [
      {
        title: "Furniture",
        items: [
          { title: "Living Room" },
          { title: "Bedroom" },
          { title: "Kitchen" },
        ],
      },
      {
        title: "Decor",
        items: [
          { title: "Wall Art" },
          { title: "Lighting" },
          { title: "Plants" },
        ],
      },
    ],
  },
  {
    name: "Electronics",
    icon: Zap,
    subcategories: [
      {
        title: "Gadgets",
        items: [
          { title: "Smartphones" },
          { title: "Laptops" },
          { title: "Tablets" },
        ],
      },
      {
        title: "Accessories",
        items: [
          { title: "Chargers" },
          { title: "Cases" },
          { title: "Headphones" },
        ],
      },
    ],
  },
  {
    name: "Entertainment",
    icon: Gamepad2,
    subcategories: [
      {
        title: "Gaming",
        items: [
          { title: "Video Games" },
          { title: "Consoles" },
          { title: "Accessories" },
        ],
      },
      {
        title: "Media",
        items: [{ title: "Movies" }, { title: "Music" }, { title: "Books" }],
      },
    ],
  },
  {
    name: "Hobbies & collectables",
    icon: Gift,
    subcategories: [
      {
        title: "Collections",
        items: [
          { title: "Vintage Items" },
          { title: "Art Pieces" },
          { title: "Memorabilia" },
        ],
      },
      {
        title: "Crafts",
        items: [
          { title: "Art Supplies" },
          { title: "DIY Kits" },
          { title: "Tools" },
        ],
      },
    ],
  },
  {
    name: "Sports",
    icon: Trophy,
    subcategories: [
      {
        title: "Equipment",
        items: [
          { title: "Fitness Gear" },
          { title: "Outdoor Sports" },
          { title: "Team Sports" },
        ],
      },
      {
        title: "Apparel",
        items: [
          { title: "Athletic Wear" },
          { title: "Sports Shoes" },
          { title: "Accessories" },
        ],
      },
    ],
  },
  {
    name: "About",
    icon: Info,
    subcategories: [
      {
        title: "Company",
        items: [
          { title: "Our Story", href: "/about-us#story" },
          { title: "Team", href: "/about-us#team"  },
          { title: "Mission", href: "/about-us#mission"  },
        ],
      },
    ],
  },
  {
    name: "Our Platform",
    icon: Settings,
    subcategories: [
      {
        title: "Services",
        items: [
          {
            title: "How it Works",
            href: "/our-platform/services/how-it-works",
          },
          { title: "Support", href: "/our-platform/services/support" },
          { title: "FAQ", href: "/our-platform/services/faq" },
        ],
      },
    ],
  },
];

export default function NavbarCategories() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="bg-white border-t border-gray-200 relative">
      {/* Mobile: Horizontal scroll */}
      <div className="block xl:hidden">
        <div className="flex overflow-x-auto scrollbar-hide px-4 py-2 gap-4">
          {categoriesData.map((category) => (
            <button
              key={category.name}
              className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600 hover:text-black transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === category.name ? null : category.name
                )
              }
            >
              {/* <category.icon className="w-4 h-4" /> */}
              {category.name}
              <ChevronDown className="w-3 h-3" />
            </button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        {activeDropdown && (
          <div className="border-t border-gray-200 bg-gray-50 p-4">
            {categoriesData
              .find((cat) => cat.name === activeDropdown)
              ?.subcategories.map((subcategory, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {subcategory.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {subcategory.items.map((item) => (
                      <a
                        key={item?.title}
                        href="#"
                        className="text-sm text-gray-600 hover:text-black py-1"
                      >
                        {item?.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Desktop: Hover dropdowns */}
      <div className="hidden xl:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center gap-8 py-3">
            {categoriesData.map((category) => (
              <div
                key={category.name}
                className="relative group "
                onMouseEnter={() => setActiveDropdown(category.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black transition-colors py-2">
                  {/* <category.icon className="w-4 h-4" /> */}
                  <span className="font-medium whitespace-nowrap">
                    {category.name}
                  </span>
                </div>

                {/* Hover underline */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                {/* Desktop Dropdown */}
                {activeDropdown === category.name && (
                  <div
                    className={cn(
                      "absolute top-full left-1/2 transform -translate-x-1/2  bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-[500px] max-w-[90vw]",
                      category.name === "Women" || category.name === "Men"
                        ? "-translate-x-1/4"
                        : "right-0"
                    )}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
                      {category.subcategories.map((subcategory, index) => (
                        <div key={index} className="space-y-3">
                          <h3 className="font-semibold text-gray-800 text-sm border-b border-gray-100 pb-2">
                            {subcategory.title}
                          </h3>
                          <div className="space-y-2">
                            {subcategory.items.map((item: any) =>
                              item?.href ? (
                                <Link
                                  key={item?.href}
                                  href={item?.href}
                                  className="block text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded px-2 py-1 transition-colors"
                                >
                                  {item?.title}
                                </Link>
                              ) : (
                                <span
                                  key={item?.title}
                                  className="block text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded px-2 py-1 transition-colors"
                                >
                                  {item?.title}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
