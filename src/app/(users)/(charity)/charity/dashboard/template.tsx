import { ReactNode } from "react";
import CharityShopDashboardTopSelector from "./_components/CharityShopDashboardTopSelector";

const UserTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="xl:space-y-16 space-y-8">
      <CharityShopDashboardTopSelector />
      <div className="md:pb-16 pb-8">{children}</div>
    </div>
  );
};

export default UserTemplate;
