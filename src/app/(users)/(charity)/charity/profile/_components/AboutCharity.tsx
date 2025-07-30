import Image from "next/image";
import React from "react";

export default function AboutCharity() {
  return (
    <div className="flex h-full w-full items-center justify-center">
    <div className="grid h-full w-full gap-4  grid-cols-2 grid-rows-2">
    
      <div 
        className="col-span-1 row-span-3  rounded-lg flex items-center justify-center"
      >
        <Image
          src="/dummyImages/charity-about-image1.png"
          alt="Placeholder"
          width={1200}
          height={1200}
          className="w-full"
        />
      </div>
    
      <div 
        className="col-span-1 row-span-1  rounded-lg flex items-center justify-center"
      >
         <Image
          src="/dummyImages/charity-about-image2.png"
          alt="Placeholder"
          width={1200}
          height={1200}
          className="w-full"
        />
      </div>
    
      <div 
        className="col-span-1 row-span-1  rounded-lg flex items-center justify-center"
      >
         <Image
          src="/dummyImages/charity-about-image3.png"
          alt="Placeholder"
          width={1200}
          height={1200}
          className="w-full"
        />
      </div>
    
    </div>
  </div>
  );
}
