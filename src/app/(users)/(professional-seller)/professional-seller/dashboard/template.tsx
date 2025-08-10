import { ReactNode } from "react";
import ProfessionalSellerDashboardTopSelector from "./_components/ProfessionalSellerDashboardTopSelector";


const ProfessionalSellerUserDashboardTemplate = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="xl:space-y-16 space-y-8">
      <ProfessionalSellerDashboardTopSelector />
      <div className="md:pb-16 pb-8">{children}</div>
    </div>
  );
};

export default ProfessionalSellerUserDashboardTemplate;
