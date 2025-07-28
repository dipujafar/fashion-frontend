import { ReactNode } from "react";
import CharityShopDashboardPageTopSection from "./_components/CharityShopDashboardPageTopSection";

const UserTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="xl:space-y-16 space-y-8">
      <CharityShopDashboardPageTopSection />
      <div className="md:pb-16 pb-8">{children}</div>
    </div>
  );
};

export default UserTemplate;
