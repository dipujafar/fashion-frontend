import { ReactNode } from "react";
import {
  User,
  Package,
  Heart,
  Wallet,
  List,
  Calendar,
  Moon,
  Users,
  HandHeart,
  Building,
  ShoppingBag,
  Tag,
  Settings,
  HelpCircle,
  Send,
  Globe,
  LogOut,
  Bell,
  Mail,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { CartIcon } from "@/icons";

export interface NavItem {
  icon: ReactNode;
  label: string | ReactNode;
  value?: string | ReactNode;
  onClick?: () => void;
  link?: string;
  reactNode?: boolean;
}

export interface Stats {
  sold: number;
  listed: number;
  purchases: number;
  totalDonations: string;
  totalClothes: number;
}

export interface User {
  name: string;
  handle: string;
  avatar: string;
}

export const user: User = {
  name: "Abrahum",
  handle: "@abra.mail.com",
  avatar: "/userProfile8.png",
};

export const stats: Stats = {
  sold: 22,
  listed: 21,
  purchases: 10,
  totalDonations: "$3,000",
  totalClothes: 10,
};

export const navItems: NavItem[] = [
  {
    icon: <User className="h-5 w-5" />,
    label: "Edit your profile",
    link: "/professional-seller/dashboard/profile",
  },
  {
    icon: <Package className="h-5 w-5" />,
    label: "Orders",
    link: "/professional-seller/dashboard/products-list/purchase-product",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    label: "Favorites",
    link: "/wishlist",
  },
  {
    icon: <CartIcon className="h-5 w-5" />,
    label: "Shopping Cart",
    link: "/shopping-cart/shopping",
  },
  {
    icon: <Bell className="h-5 w-5" />,
    label: "Notifications",
    link: "/notifications",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Message",
    link: "/professional-seller/dashboard/message",
  },

  {
    icon: <Wallet className="h-5 w-5" />,
    label: "Balance",
    value: "$0.00",
  },
  {
    icon: <List className="h-5 w-5" />,
    label: "Product Listing",
    link: "/professional-seller/dashboard/products-list",
  },

  {
    icon: <Moon className="h-5 w-5" />,
    label: (
      <div className="flex justify-between items-center gap-2 ">
        Vacation mode
        <Switch />
      </div>
    ),
    reactNode: true,
  },

  {
    icon: <Tag className="h-5 w-5" />,
    label: "Sold products",
    link: "/professional-seller/dashboard/products-list/sale",
  },
  {
    icon: <Tag className="h-5 w-5" />,
    label: "Your Offers",
    link: "/professional-seller/dashboard/offers",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    link: "/professional-seller/dashboard/settings",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "Invite friends",
  },

  {
    icon: <LogOut className="h-5 w-5" />,
    label: "Sign Out",
    link: "/sign-in",
  },
];
