import {
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Switch } from "@/components/ui/switch";
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
    name: "vacation mode",
    label: (
      <div>
        <div className="flex justify-between items-center gap-2 px-1.5 text-sm py-1 ">
          Vacation mode
          <Switch />
        </div>
        <MenubarSeparator />
      </div>
    ),
  },
  {
    name: "Balance",
    label: (
      <div>
        <div className="flex justify-between items-center gap-2 px-1.5 text-sm py-1 ">
          Balance
          <span>$600</span>
        </div>
        <MenubarSeparator />
      </div>
    ),
  },
];

export default function ProfileIcon() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/sign-in");
  };
  return (
    <>
      <MenubarTrigger className="md:flex hidden">
        <ProfileNavIcon />
      </MenubarTrigger>
      <MenubarContent>
        {navLinksFotProfileIcon.map((item, index) =>
          item?.link ? (
            <Link href={item?.link} key={item.name}>
              <MenubarItem className="cursor-pointer group">
                {item.name}
                <MenubarShortcut>
                  <ChevronRight className="group-hover:translate-x-2 transition-all duration-300" />
                </MenubarShortcut>
              </MenubarItem>
              {index !== navLinksFotProfileIcon.length - 1 && (
                <MenubarSeparator />
              )}
            </Link>
          ) : (
            item?.label
          )
        )}

        <MenubarItem onClick={handleLogout} className="cursor-pointer group">
          Logout
          <MenubarShortcut>
            <LogOut className="  group-hover:translate-x-2 transition-all duration-300" />
          </MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </>
  );
}
