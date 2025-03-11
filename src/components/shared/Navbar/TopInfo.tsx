import React from "react";
import Container from "../Container";
import Link from "next/link";
import { cn } from "@/lib/utils";
const quickLink = [
  {
    label: "Donate now",
    href: "#",
  },
  {
    label: "Sing In",
    href: "#",
  },
  {
    label: "Sing Up",
    href: "#",
  },
  {
    label: "Sell Now",
    href: "#",
  },
];

const TopInfo = () => {
  return (
    <header className="bg-primary-black text-primary-white py-2">
      <Container className="flex justify-between items-center text-sm ">
        <div className="xl:space-x-8 space-x-4  text-center w-full md:w-fit ">
          <Link href={"tel:+ 123 (456) 789-987"}>+ 123 (456) 789-987</Link>
          <Link href={"mailto:contact@fashion.com"}>contact@fashion.com</Link>
        </div>

        <div className="xl:space-x-4 space-x-2 hidden md:block">
          {quickLink.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "uppercase",
                link.label === "Donate now" && "text-primary-yellow",
                link.label === "Sell Now" && "text-primary-red"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </header>
  );
};

export default TopInfo;
