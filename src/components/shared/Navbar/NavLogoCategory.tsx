import Link from "next/link";
import Container from "../Container";
import logo from "@/assets/images/common-image/logo.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import SmallDeviceView from "./SmallDeviceView";
import SearchAndNavIcon from "./SearchAndNavIcon";

const category = [
  {
    id: 1,
    label: "Womans",
    href: "/shop/#",
  },
  {
    id: 2,
    label: "Mens",
    href: "/shop/#",
  },
  {
    id: 3,
    label: "Kids",
    href: "/shop/#",
  },
];

const NavLogoCategory = () => {
  return (
    <div>
      <Container className="flex justify-between items-center gap-x-5 bg-primary-white py-4">
        {/* ======= Small Screen view ========== */}
        <SmallDeviceView></SmallDeviceView>
        {/* ======= category ========== */}
        <div className="md:flex lg:gap-x-6 gap-x-3 hidden ">
          {category.map((item) => (
            <div key={item.id} className="relative group">
              <Link
                href={item.href}
                className="uppercase group-hover:text-primary-black font-medium text-sm lg:text-base"
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
        <div className="flex justify-center items-center flex-1 ">
          <Link href={"/"}>
            <Image src={logo} alt="logo"></Image>
          </Link>
        </div>
        {/* ======= search and nav icon  ========== */}
        <div className="md:block hidden ">
          <SearchAndNavIcon></SearchAndNavIcon>
        </div>
      </Container>
    </div>
  );
};

export default NavLogoCategory;
