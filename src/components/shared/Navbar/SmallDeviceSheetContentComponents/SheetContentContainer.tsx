"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, stats, user } from "./data.type";
import Image from "next/image";
import Link from "next/link";
import { CharityDonationFormDialog } from "../../Modal/Charity/CharityDonationFormDialog";
import { useRouter } from "next/navigation";

export function SheetContentContainer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col bg-background overflow-y-auto scroll-hide">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b p-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
          />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-foreground">{user.name}</span>
          <span className="text-sm text-muted-foreground">{user.handle}</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-b p-4">
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-muted/50">
            <CardContent className="px-3 py-0.5 text-center">
              <div className="text-2xl font-bold">{stats.listed}</div>
              <div className="text-xs text-muted-foreground">Items Listed</div>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="px-3 py-0.5 text-center">
              <div className="text-2xl font-bold">{stats.sold}</div>
              <div className="text-xs text-muted-foreground">Items Sold</div>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="px-3 py-0.5 text-center">
              <div className="text-2xl font-bold">{stats.purchases}</div>
              <div className="text-xs text-muted-foreground">Purchased</div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-3 flex flex-col items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Total money donations:{" "}
            <span className="text-green-600 font-medium">{stats.totalDonations}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Total clothing donations:{" "}
            <span className="text-green-600 font-medium">{stats.totalClothes}</span>
          </p>
        </div>
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
                href={"/sell-products"}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 group"
              >
                <span className="text-sm font-medium text-white">Sell Now</span>
                <ChevronRight className="h-4 w-4 text-white group-hover:translate-x-2 duration-500" />
              </Link>
            </div>
            <CharityDonationFormDialog>
              <Button
                className="w-full rounded-none bg-white text-black hover:bg-gray-100 group"
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
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                router.push(item.link as string);
                setOpen(item?.reactNode ? true : false);
              }}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50",
                "group"
              )}
            >
              <div className="flex h-5 w-5 items-center justify-center text-muted-foreground">
                {item.icon}
              </div>
              <span className="flex-1 text-sm font-medium text-foreground">
                {item.label}
              </span>
              {item.value && (
                <span className="text-sm text-muted-foreground">
                  {item.value}
                </span>
              )}
              {!item?.reactNode && (
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
