import { ReactNode } from "react";

const EcoFriendlyUserDashboardTemplate = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="xl:space-y-16 space-y-8">
      {/* <div className={cn("hidden md:block", isMessagePage && "md:hidden")}>
        <EcoFriendlyUserDashboardTopSelector />
      </div> */}
      <div className="md:pb-16 pb-8">{children}</div>
    </div>
  );
};

export default EcoFriendlyUserDashboardTemplate;
