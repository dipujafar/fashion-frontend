"use client";
import Link from "next/link";
import Container from "../Container";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { activeNavLink } from "@/utils/activeNavLink";
import { navLinks } from "@/lib/NavLinks";


const NavLinksSection = () => {
  const currentPath = usePathname();
  const paths = currentPath.split("/");

  return (
    <div
      className="bg-primary-white py-2 z-0"
      style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}
    >
      <Container className="flex items-center justify-center  lg:gap-x-10">
        {navLinks.map((link) => (
          <div key={link.id} className="group relative overflow-hidden">
            {/* Background Hover Effect */}
            <span
              className={cn(
                "absolute inset-0 bg-black/10 transform scale-x-0 transition-transform duration-700 ease-in-out group-hover:scale-x-100",
                "z-0",
                activeNavLink(paths, link?.href, currentPath) && "scale-x-100"
              )}
            ></span>

            {/* Navigation Link */}
            <Link
              href={link.href}
              className={cn(
                "relative uppercase py-2 px-6  font-medium z-10 transition-colors duration-300 truncate lg:text-base md:text-sm"
              )}
            >
              {link.label}
            </Link>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default NavLinksSection;
