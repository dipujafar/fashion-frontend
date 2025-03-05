"use client";
import Link from "next/link";
import Container from "../Container";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Shop",
    href: "/#",
  },
  {
    id: 3,
    label: "STYLE BLOG",
    href: "/#",
  },
  {
    id: 4,
    label: "ABOUT US",
    href: "/#",
  },
  {
    id: 5,
    label: "EXPLORE USERS",
    href: "/#",
  },
];

const NavLinksSection = () => {
  const currentPath = usePathname();
  return (
    <div
      className="bg-primary-white shadow-2xl py-2"
      style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}
    >
      <Container className="flex items-center justify-center lg:gap-x-10">
        {navLinks.map((link) => (
          <div key={link.id} className="group relative">
            <Link
              href={link.href}
              className={cn(
                "uppercase py-2 px-6 font-medium",
                link.href === currentPath && "border-b-2 border-b-black"
              )}
            >
              {link.label}
            </Link>
            <span
              className={cn(
                "absolute left-0 -bottom-[7px] h-[2px] w-full bg-black transform scale-x-0 transition-transform duration-700 ease-in-out group-hover:scale-x-100 origin-right"
              )}
            ></span>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default NavLinksSection;
