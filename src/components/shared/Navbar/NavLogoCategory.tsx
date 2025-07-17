import Link from "next/link";
import Container from "../Container";
import logo from "@/assets/images/common-image/logo.png";
import Image from "next/image";
import SmallDeviceView from "./SmallDeviceView";
import SearchAndNavIcon from "./SearchAndNavIcon";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// const category = [
//   {
//     id: 1,
//     label: "Womans",
//     href: "/shop/#",
//   },
//   {
//     id: 2,
//     label: "Mens",
//     href: "/shop/#",
//   },
//   {
//     id: 3,
//     label: "Kids",
//     href: "/shop/#",
//   },
// ];

const NavLogoCategory = () => {
  return (
    <div>
      <Container className="flex justify-between items-center gap-x-5 lg:gap-x-10 xl:gap-x-16 bg-primary-white py-4">
        {/* ======= Small Screen view ========== */}
        <SmallDeviceView></SmallDeviceView>
        {/* ======= category ========== */}
        {/* <div className="md:flex lg:gap-x-6 gap-x-1.5 hidden ">
          {category.map((item) => (
            <div key={item.id} className="relative group">
              <Link
                href={item.href}
                className="uppercase group-hover:text-primary-black font-medium text-sm lg:text-base "
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
        </div> */}
        {/* ======= logo ========== */}
        <div className="flex justify-center items-center ">
          <Link href={"/"}>
            <Image src={logo} alt="logo"></Image>
          </Link>
        </div>

        <div className="relative hidden md:block flex-1">
          <Input
            className="border-0 bg-slate-200 focus:outline-0 shadow-none focus-visible:ring-0 w-full px-2 rounded-sm"
            placeholder="Search here for items or members"
          ></Input>
          <div className="absolute   top-2 right-1.5">
            <Search size={20} color="#9E9E9E" />
          </div>
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
