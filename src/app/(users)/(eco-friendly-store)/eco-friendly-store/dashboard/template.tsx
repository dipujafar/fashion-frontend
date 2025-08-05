import { ReactNode } from "react";
import EcoFriendlyUserDashboardTopSelector from "./_components/EcoFriendlyUserDashboardTopSelector";

const EcoFriendlyUserDashboardTemplate = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="xl:space-y-16 space-y-8">
      <EcoFriendlyUserDashboardTopSelector />
      <div className="md:pb-16 pb-8">{children}</div>
    </div>
  );
};

export default EcoFriendlyUserDashboardTemplate;
