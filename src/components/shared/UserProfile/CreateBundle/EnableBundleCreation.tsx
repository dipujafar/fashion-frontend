"use client";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

export default function EnableBundleCreation() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center bg-[#ecfef4] py-4 px-5 rounded-xl">
      <span className="text-lg">Enable Bundle Creation</span>
      <Switch
        onCheckedChange={() => router.push("/create-bundle")}
        className="data-[state=checked]:bg-[#3DB39E] cursor-pointer"
      />
    </div>
  );
}
