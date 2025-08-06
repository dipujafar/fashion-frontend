import { ReactNode } from "react";
import AmbassadorUserTopBarSection from "./_components/AmbassadorUserTopBarSection";


const AmbassadorDashboardTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="xl:space-y-16 space-y-8">
      <AmbassadorUserTopBarSection />
      <div className="md:pb-16 pb-8">{children}</div>
    </div>
  );
};

export default AmbassadorDashboardTemplate;
