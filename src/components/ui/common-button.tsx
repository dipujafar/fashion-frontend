import { ReactNode } from "react";
import { Button } from "./button";

const CommonButton = ({ children }: { children: ReactNode }) => {
  return (
    <Button className="rounded border-r-3 border-b-3 border-primary-red uppercase w-40 py-5 cursor-pointer">
      {children}
    </Button>
  );
};

export default CommonButton;
