import { cn } from "@/lib/utils";
import Link from "next/link";

const quickLink = [
  {
    id: 1,
    label: "home",
    href: "/",
  },
  {
    id: 2,
    label: "services",
    href: "#",
  },
  {
    id: 3,
    label: "Contact us",
    href: "#",
  },
  {
    id: 4,
    label: "Privacy policy",
    href: "#",
  },
  {
    id: 5,
    label: "Terms of use",
    href: "#",
  },
  {
    id: 6,
    label: "About us",
    href: "/about-us",
  },
];

const QuickLinks = () => {
  return (
    <div className="py-2 border-t border-t-black/30 w-full xl:mt-10 md:mt-6 mt-3 flex flex-col lg:flex-row justify-between text-primary-black/70 text-sm gap-y-1 items-center">
      <p>Copyright © 2024 Fashion. All rights reserved.</p>
      <div className="md:flex grid grid-cols-3 gap-x-4 gap-y-1">
        {quickLink.map((link) => (
          <div key={link.id} className="relative group">
            <Link href={link.href} className="uppercase font-medium">
              {link.label}
            </Link>
            <span
              className={cn(
                "absolute left-0  h-[2px] w-full bg-black transform scale-x-0 transition-transform duration-700 ease-in-out group-hover:scale-x-100 origin-left"
              )}
            >
              <Link href={link.href} className="uppercase font-medium">
                {link.label}
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
