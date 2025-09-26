import {
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ProfileNavIcon } from "@/icons";
import { ArrowRight, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinksFotProfileIcon = [
  {
    name: "Profile Details",
    link: "/professional-seller/dashboard/profile",
  },
  {
    name: "Products-list",
    link: "/professional-seller/dashboard/products-list",
  },
  {
    name: "Your Offers",
    link: "/professional-seller/dashboard/offers",
  },
  {
    name: "Settings",
    link: "/professional-seller/dashboard/settings",
  },
  {
    name: "Logout",
    link: "#",
  },
];

export default function ProfileIcon() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/sign-in");
  };
  return (
    <>
      <MenubarTrigger>
        <ProfileNavIcon />
      </MenubarTrigger>
      <MenubarContent>
        {navLinksFotProfileIcon.map((link, index) =>
          link.name === "Logout" ? (
            <MenubarItem onClick={handleLogout} className="cursor-pointer group">
              {link.name}
              <MenubarShortcut>
                <LogOut   className="  group-hover:translate-x-2 transition-all duration-300" />
              </MenubarShortcut>
            </MenubarItem>
          ) : (
            <Link href={link?.link} key={link.name}>
              <MenubarItem className="cursor-pointer group">
                {link.name}
                <MenubarShortcut>
                  <ChevronRight className="group-hover:translate-x-2 transition-all duration-300" />
                </MenubarShortcut>
              </MenubarItem>
              {index !== navLinksFotProfileIcon.length - 1 && (
                <MenubarSeparator />
              )}
            </Link>
          )
        )}
      </MenubarContent>
    </>
  );
}
