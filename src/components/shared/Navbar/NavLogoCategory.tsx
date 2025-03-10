import Link from "next/link";
import Container from "../Container";
import logo from "@/assets/images/common-image/logo.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import favoriteIcons from "@/assets/icons/heart.png";
import profileIcon from "@/assets/icons/Profile.png";
import shoppingIcon from "@/assets/icons/shopping-bag.png";
import { Heart, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const category = [
  {
    id: 1,
    label: "Womans",
    href: "/#",
  },
  {
    id: 2,
    label: "Mens",
    href: "/#",
  },
  {
    id: 3,
    label: "Kids",
    href: "/#",
  },
];

const NavLogoCategory = () => {
  return (
    <div>
      <Container className="flex justify-between items-center gap-x-5 bg-primary-white py-4">
        {/* ======= category ========== */}
        <div className="flex lg:gap-x-6 gap-x-3">
          {category.map((item) => (
            <div key={item.id} className="relative group">
              <Link
                href={item.href}
                className="uppercase group-hover:text-primary-black font-medium "
              >
                {item.label}
              </Link>
              <span
                className={cn(
                  "absolute left-0 bottom-0 h-[2px] w-full bg-black transform scale-x-0 transition-transform duration-700 ease-in-out group-hover:scale-x-100 origin-left"
                )}
              ></span>
            </div>
          ))}
        </div>
        {/* ======= logo ========== */}
        <div className="flex justify-center items-center flex-1">
          <Link href={"/"}>
            <Image src={logo} alt="logo"></Image>
          </Link>
        </div>
        {/* ======= search and  ========== */}`
        <div className="flex lg:gap-x-4 gap-x-2 items-center ">
          <div className="relative ">
            <Input
              className="border-0 border-b border-b-black focus:outline-0 shadow-none rounded-none focus-visible:ring-0 "
              placeholder="Search here....."
            ></Input>
            <div className="absolute  right-0 top-2">
              <Search size={20} color="#9E9E9E" />
            </div>
          </div>
          <Link href={"/#"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m8.962 18.91l.464-.588zM12 5.5l-.54.52a.75.75 0 0 0 1.08 0zm3.038 13.41l.465.59zm-5.612-.588C7.91 17.127 6.253 15.96 4.938 14.48C3.65 13.028 2.75 11.335 2.75 9.137h-1.5c0 2.666 1.11 4.7 2.567 6.339c1.43 1.61 3.254 2.9 4.68 4.024zM2.75 9.137c0-2.15 1.215-3.954 2.874-4.713c1.612-.737 3.778-.541 5.836 1.597l1.08-1.04C10.1 2.444 7.264 2.025 5 3.06C2.786 4.073 1.25 6.425 1.25 9.137zM8.497 19.5c.513.404 1.063.834 1.62 1.16s1.193.59 1.883.59v-1.5c-.31 0-.674-.12-1.126-.385c-.453-.264-.922-.628-1.448-1.043zm7.006 0c1.426-1.125 3.25-2.413 4.68-4.024c1.457-1.64 2.567-3.673 2.567-6.339h-1.5c0 2.198-.9 3.891-2.188 5.343c-1.315 1.48-2.972 2.647-4.488 3.842zM22.75 9.137c0-2.712-1.535-5.064-3.75-6.077c-2.264-1.035-5.098-.616-7.54 1.92l1.08 1.04c2.058-2.137 4.224-2.333 5.836-1.596c1.659.759 2.874 2.562 2.874 4.713zm-8.176 9.185c-.526.415-.995.779-1.448 1.043s-.816.385-1.126.385v1.5c.69 0 1.326-.265 1.883-.59c.558-.326 1.107-.756 1.62-1.16z"
              ></path>
            </svg>
          </Link>
          <Link href={"/#"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              >
                <path d="M12.5 21H8.574a3 3 0 0 1-2.965-2.544l-1.255-8.152A2 2 0 0 1 6.331 8H17.67a2 2 0 0 1 1.977 2.304l-.73 4.744"></path>
                <path d="M9 11V6a3 3 0 0 1 6 0v5m1 8h6"></path>
              </g>
            </svg>
          </Link>
          <Link href={"/#"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinejoin="round"
                  d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                ></path>
                <circle cx={12} cy={7} r={3}></circle>
              </g>
            </svg>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default NavLogoCategory;
