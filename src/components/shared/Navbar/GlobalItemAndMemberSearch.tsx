import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export default function GlobalItemAndMemberSearch() {
  return (
    <div className="relative">
      <Search color="#808080" size={20} className="absolute top-1/2 -translate-y-1/2 left-2" />
      <Input
        className=" bg-zinc-100 focus:outline-0 shadow-none focus-visible:ring-0 w-full px-4 rounded-none md:rounded-sm pl-8 py-5"
        placeholder="Search here for items or members"
      ></Input>
    </div>
  );
}