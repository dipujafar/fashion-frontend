import { ReactNode } from "react";
import AssistedSellerTopBarSection from "./_components/AssistedSellerTopBarSection";



const AmbassadorDashboardTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="xl:space-y-16 space-y-8">
      <AssistedSellerTopBarSection />
      <div className="md:pb-16 pb-8">{children}</div>
    </div>
  );
};

export default AmbassadorDashboardTemplate;
