"use client";;
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const UserTemplate = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  const isMessagePage = pathName.includes("message");
  return (
    <div className="xl:space-y-16 space-y-8">
      {/* <div className={cn("hidden md:block", isMessagePage && "md:hidden")}>
        <CharityShopDashboardPageTopSection />
      </div> */}
      <div className="md:pb-16 pb-8">{children}</div>
    </div>
  );
};

export default UserTemplate;
