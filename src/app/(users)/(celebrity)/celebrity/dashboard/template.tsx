import { ReactNode } from "react";
import CelebrityUserDashboardTopSelector from "./_components/CelebrityUserDashboardTopSelector";



const ProfessionalSellerUserDashboardTemplate = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="xl:space-y-16 space-y-8">
      <CelebrityUserDashboardTopSelector />
      <div className="md:pb-16 pb-8">{children}</div>
    </div>
  );
};

export default ProfessionalSellerUserDashboardTemplate;
