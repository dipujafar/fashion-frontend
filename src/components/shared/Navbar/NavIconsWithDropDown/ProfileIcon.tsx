import {
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Switch } from "@/components/ui/switch";
import { ProfileNavIcon } from "@/icons";
import {
  ChevronRight,
  Handshake,
  LifeBuoy,
  List,
  LogOut,
  Moon,
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

const navLinksFotProfileIcon = [
  {
    icon: <UserRound className="h-5 w-5" />,
    name: "View Profile",
    link: "/professional-seller/profile-preview",
  },
  {
    icon: <UserRoundCog className="h-5 w-5" />,
    name: "Edit Profile ",
    link: "/professional-seller/dashboard/profile",
  },
  {
    icon: <SquareChartGantt className="h-5 w-5" />,
    name: "List an item",
    link: "/sell-products",
  },
  {
    icon: <List className="h-5 w-5" />,
    name: "Products-Listing",
    link: "/professional-seller/dashboard/products-list",
  },
  {
    icon: <Package className="h-5 w-5" />,
    name: "My Orders",
    link: "/professional-seller/dashboard/products-list/purchase-product",
  },
  {
    icon: <Tag className="h-5 w-5" />,
    name: "Your Offers",
    link: "/professional-seller/dashboard/offers",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    name: "Settings",
    link: "/professional-seller/dashboard/settings",
  },
  {
    icon: <Handshake className="h-5 w-5" />,
    name: "Assisted Seller",
    link: "/assisted-seller",
  },
  {
    icon: <Tags className="h-5 w-5" />,
    name: "Badges",
    link: "/badges",
  },

  {
    name: "vacation mode",
    label: (
      <div>
        <div className="flex justify-between items-center gap-2 px-1.5 text-sm py-1 ">
          <div className="flex items-center gap-x-2 pl-1">
            <div className="flex h-5 w-5 items-center justify-center text-muted-foreground">
              <Moon />
            </div>
            <p className="text-base ">
              Vacation mode
            </p>
          </div>
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
          <div className="flex items-center gap-x-2 pl-1">
            <div className="flex h-5 w-5 items-center justify-center text-muted-foreground">
              <Wallet />
            </div>
            <p className="text-base ">
              Balance
            </p>
          </div>
          <span className="text-base">$600</span>
        </div>
        <MenubarSeparator />
      </div>
    ),
  },
  {
    name: "Donate now",
    label: (
      <div className="px-1.5">
        <div className="flex items-center gap-x-2 pl-1 cursor-pointer">
          <LifeBuoy className="flex h-5 w-5 items-center justify-center text-muted-foreground" />
          <CharityDonationFormDialog>Donate Now</CharityDonationFormDialog>
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
      <MenubarContent className="md:min-w-sm overflow-y-auto max-h-[calc(100vh-100px)]">
        {navLinksFotProfileIcon.map((item, index) =>
          item?.link ? (
            <Link href={item?.link} key={item.name}>
              <MenubarItem className="cursor-pointer group">
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
              {index !== navLinksFotProfileIcon.length - 1 && (
                <MenubarSeparator />
              )}
            </Link>
          ) : (
            item?.label
          )
        )}

        <MenubarItem onClick={handleLogout} className="cursor-pointer group">
          <div className="flex items-center gap-x-2 pl-1">
            <div>
              <LogOut className="h-6 w-6" />
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
