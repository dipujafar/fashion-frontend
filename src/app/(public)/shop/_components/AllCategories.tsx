"use client";

import {
  Users, User, Palette, Baby, Home,
  Zap, Gamepad2, Gift, Trophy, Info, Settings,
} from "lucide-react";

const categoriesData = [
  { name: "Women", icon: Users },
  { name: "Men", icon: User },
  { name: "Designer", icon: Palette },
  { name: "Kids", icon: Baby },
  { name: "Home", icon: Home },
  { name: "Electronics", icon: Zap },
  { name: "Entertainment", icon: Gamepad2 },
  { name: "Hobbies", icon: Gift },
  { name: "Sports", icon: Trophy },
  { name: "About", icon: Info },
  { name: "Platform", icon: Settings },
];

export default function AllCategory() {
  return (
    <div
      aria-label="Category Navigation"
      className="bg-white mt-5"
    >
      <div className="flex overflow-x-auto no-scrollbar px-4 py-2 gap-4 xl:justify-center xl:overflow-visible">
        {categoriesData.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="flex gap-x-2 items-center justify-center text-gray-600 hover:text-black transition-colors px-2 cursor-pointer text-sm"
          >
            <Icon className="w-5 h-5 mb-1" />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
