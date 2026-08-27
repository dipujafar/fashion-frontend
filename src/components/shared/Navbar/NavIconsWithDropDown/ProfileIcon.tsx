"use client";
import {
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ProfileNavIcon } from "@/icons";
import {
  ChevronRight,
  Handshake,
  LifeBuoy,
  List,
  LogOut,
  Package,
  Settings,
  SquareChartGantt,
  Tag,
  Tags,
  UserRound,
  UserRoundCog,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CharityDonationFormDialog } from "../../Modal/Charity/CharityDonationFormDialog";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";

const navLinksFotProfileIcon = [
  {
    icon: <UserRound className="size-5" />,
    name: "View Profile",
    link: "/professional-seller/profile-preview",
  },
  {
    icon: <UserRoundCog className="size-5" />,
    name: "Edit Profile ",
    link: "/professional-seller/dashboard/profile",
  },
  {
    icon: <SquareChartGantt className="size-5" />,
    name: "List an item",
    link: "/sell-products",
  },
  {
    icon: <List className="size-5" />,
    name: "Products-Listing",
    link: "/professional-seller/dashboard/products-list",
  },
  {
    icon: <Package className="size-5" />,
    name: "My Orders",
    link: "/professional-seller/dashboard/products-list/purchase-product",
  },
  {
    icon: <Tag className="size-5" />,
    name: "Your Offers",
    link: "/professional-seller/dashboard/offers",
  },
  {
    icon: <Settings className="size-5" />,
    name: "Settings",
    link: "/professional-seller/dashboard/settings",
  },
  {
    icon: <Handshake className="size-5" />,
    name: "Assisted Seller",
    link: "/assisted-seller",
  },
  {
    icon: <Tags className="size-5" />,
    name: "Badges",
    link: "/badges",
  },
  {
    icon: <Wallet className="size-5" />,
    name: "Wallet",
    link: "/wallet",
  },
  {
    name: "Donate now",
    label: (
      <CharityDonationFormDialog>
        <div className="px-1.5 hover:bg-zinc-100">
          <div className="flex items-center gap-x-3 pl-1 cursor-pointer py-3">
            <LifeBuoy className="flex size-5 items-center justify-center text-muted-foreground" />
            Donate Now
          </div>
          <MenubarSeparator />
        </div>
      </CharityDonationFormDialog>
    ),
  },
];

export default function ProfileIcon() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.refresh();
  };
  return (
    <>
      <MenubarTrigger className="md:flex hidden cursor-pointer">
        <ProfileNavIcon />
      </MenubarTrigger>
      <MenubarContent align="end" className="md:min-w-xs overflow-y-auto max-h-96 p-0 rounded-none">
        {navLinksFotProfileIcon.map((item, index) =>
          item?.link ? (
            <Link href={item?.link} key={item.name}>
              <MenubarItem className="cursor-pointer group rounded-none border-b border-gray-200 py-3">
                <div className="flex h-6 w-6 items-center justify-center text-muted-foreground">
                  {item.icon}
                </div>
                <p className="text-base">
                  {item.name}
                </p>
                <MenubarShortcut>
                  <ChevronRight className="group-hover:translate-x-2 transition-all duration-300" />
                </MenubarShortcut>
              </MenubarItem>
             
            </Link>
          ) : (
            item?.label
          )
        )}

        <MenubarItem onClick={handleLogout} className="cursor-pointer group rounded-none border-b border-gray-200 py-3">
          <div className="flex items-center gap-x-2 pl-1">
            <div>
              <LogOut className="size-5" />
            </div>
            <p className="text-base">
              Logout
            </p>
          </div>
        </MenubarItem>

      </MenubarContent>
    </>
  );
}
