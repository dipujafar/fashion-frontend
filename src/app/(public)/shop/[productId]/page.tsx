import React from "react";
import SingleProductDetails from "./_components/SingleProductDetails";
import { Button } from "@/components/ui/button";
import { MessageIcon } from "@/icons";

const SingleProductDetailsPage = () => {
  return (
    <div>
      <SingleProductDetails></SingleProductDetails>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-lg md:hidden">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <MessageIcon  className="h-[40px] w-[60px]" />
          <Button variant="outline" className="flex-1 bg-transparent h-[45px]">
            Make an offer
          </Button>
          <Button className="flex-1 bg-black text-white h-[45px]">Buy now</Button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetailsPage;
