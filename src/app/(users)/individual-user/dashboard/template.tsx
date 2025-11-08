import { ReactNode } from "react";

const UserTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="xl:space-y-16 space-y-8">
      {/* <div className={cn("hidden md:block", isMessagePage && "md:hidden")}>
        <IndividualUserPagesTopSection />
      </div> */}
      <div className="md:pb-16 pb-8">{children}</div>
    </div>
  );
};

export default UserTemplate;
