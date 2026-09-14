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
  TrainFrontTunnel,
  UsersRound,
  BrickWall,
  Tags,
  Handshake,
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
  location: string;
  rating: number;
}

export const user: User = {
  name: "Abrahum",
  handle: "@abra.mail.com",
  avatar: "/userProfile8.png",
  location: "Lagos, Nigeria",
  rating: 4.5,
};

export const stats: Stats = {
  sold: 22,
  listed: 21,
  purchases: 10,
  totalDonations: "$3,000",
  totalClothes: 10,
};


