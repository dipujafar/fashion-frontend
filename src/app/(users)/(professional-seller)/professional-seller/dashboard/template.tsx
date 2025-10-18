"use client";
import { ReactNode } from "react";
import ProfessionalSellerDashboardTopSelector from "./_components/ProfessionalSellerDashboardTopSelector";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ProfessionalSellerUserDashboardTemplate = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pathName = usePathname();
  const isMessagePage = pathName.includes("message");
  return (
    <div className="xl:space-y-16 space-y-8">
      <div className={cn("hidden md:block", isMessagePage && "md:hidden")}>
        <ProfessionalSellerDashboardTopSelector />
      </div>
      <div className="md:pb-16 pb-8">{children}</div>
    </div>
  );
};

export default ProfessionalSellerUserDashboardTemplate;
