"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, ChevronRight, Handshake, Heart, List, LogOut, Mail, MapPin, Moon, Package, PackageOpen, Settings, SquareChartGantt, Tags, UserRoundCog, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { CharityDonationFormDialog } from "../../Modal/Charity/CharityDonationFormDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CartIcon } from "@/icons";

const navLinksFotProfileIcon = [
  {
    icon: <UserRoundCog className="size-5" />,
    name: "Edit Profile ",
    link: "/profile",
  },
  {
    icon: <CartIcon className="size-5" />,
    name: "Shop",
    link: "/shop",
  },
  {
    icon: <SquareChartGantt className="size-5" />,
    name: "List an item",
    link: "/sell",
  },
  {
    icon: <List className="size-5" />,
    name: "Products-Listing",
    link: "/profile/sell/products",
  },
  {
    icon: <Package className="size-5" />,
    name: "My Orders",
    link: "/profile/purchase/orders",
  },
  {
    icon: <Heart className="size-5" />,
    name: "Favorites",
    link: "/wishlist",
  },
  {
    icon: <Settings className="size-5" />,
    name: "Settings",
    link: "/profile",
  },
  {
    icon: <Handshake className="size-5" />,
    name: "Assisted Seller",
    link: "/assisted-seller",
  },
  {
    icon: <Tags className="size-5" />,
    name: "Badges",
    link: "/profile/badges",
  },
  {
    icon: <Wallet className="size-5" />,
    name: "Earnings & Wallet",
    link: "/profile/earnings",
  },
  {
    icon: <Bell className="size-5" />,
    name: "Notifications",
    link: "/notifications",
  },
  {
    icon: <Mail className="size-5" />,
    name: "Message",
    link: "/inbox",
  },
  {
    icon: <Moon className="size-5" />,
    name: "Vacation mode",
    link: "/profile/vacation-mode",
  },
  {
    icon: <PackageOpen className="size-5" />,
    name: "Bundle Offers",
    link: "/profile/sell/bundle-discount",
  },
  // {
  //   icon: <LogOut className="size-5" />,
  //   label: "Sign Out",
  //   link: "/sign-in",
  // },
];

export function SheetContentContainer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex h-full flex-col bg-background overflow-y-auto scroll-hide">
      {/* Header Section */}
      <div className="border-b mt-3">
        <Link href={`/member/${user?.userName}`} onClick={() => setOpen(false)} className="cursor-pointer">
          <div className="flex items-center justify-between hover:bg-zinc-50 px-4 py-2">
            <div className="space-x-2 flex items-center ">
              {/* <Avatar className="h-12 w-12">
              <AvatarImage
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
              />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar> */}
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">{user?.userName}</span>
                <span className="text-xs text-muted-foreground">View Profile</span>
              </div>
            </div>
            <div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          </div>
        </Link>
      </div>

      {/* Featured Section */}
      <div className="border-b p-4">
        <Card className="overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <CardContent className="p-0">
            <div className="flex items-center gap-3 p-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Sell an item</h3>
                <p className="text-xs text-muted-foreground">
                  (Earn money and donate to charity)
                </p>
              </div>
              <div className="relative">
                <div className="h-16 w-16 overflow-hidden rounded-lg">
                  <Image
                    src="/userRoleImage3.png"
                    alt="Sell items"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-8 right-8 h-16 w-16 overflow-hidden rounded-lg">
                  <Image
                    src="/recently_viewed_image4.png"
                    alt="Sell items"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="bg-black px-4 py-2 text-center">
              <Link
                href={"/sell"}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 group"
              >
                <span className="text-sm font-medium text-white">Sell Now</span>
                <ChevronRight className="h-4 w-4 text-white group-hover:translate-x-2 duration-500" />
              </Link>
            </div>
            <CharityDonationFormDialog>
              <Button
                className="w-full rounded-none bg-white text-black hover:bg-gray-100 group cursor-pointer"
                size="sm"
              >
                Donate Now{" "}
                <ChevronRight className="h-4 w-4  group-hover:translate-x-2 duration-500" />
              </Button>
            </CharityDonationFormDialog>
          </CardContent>
        </Card>
      </div>

      {/* Navigation List */}
      <div className="flex-1 ">
        <nav className="py-2">
          {navLinksFotProfileIcon.map((item, index) => (
            <Link href={item.link || "#"} key={index} onClick={() => setOpen(false)} className="cursor-pointer">

              <button
                key={index}

                className={cn(
                  "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50",
                  "group"
                )}
              >
                <div className="flex h-5 w-5 items-center justify-center text-muted-foreground">
                  {item.icon}
                </div>
                <span className="flex-1 text-sm font-medium text-foreground">
                  {item.name}
                </span>

                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />

              </button>

            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
