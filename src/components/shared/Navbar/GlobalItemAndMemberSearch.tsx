import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export default function GlobalItemAndMemberSearch() {
  return (
    <div className="relative">
      <Search color="#808080" size={20} className="absolute top-1/2 -translate-y-1/2 left-1" />
      <Input
        className="border-0 bg-slate-200 focus:outline-0 shadow-none focus-visible:ring-0 w-full px-2 rounded-sm pl-8"
        placeholder="Search here for items or members"
      ></Input>
    </div>
  );
}