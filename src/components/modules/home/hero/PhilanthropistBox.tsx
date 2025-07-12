import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import fashionImage from "@/assets/images/home/hero/philanthropist-image.jpg";

export default function PhilanthropistBox() {
  return (
    <Card className="relative overflow-hidden bg-gradient-warm shadow-strong max-w-md mx-auto py-0 bg-white border-none rounded-none space-y-0">
      {/* Image Section */}
      <div className="relative xl:h-56 h-48 overflow-hidden ">
        <Image
          src={fashionImage}
          alt="Fashion closet with colorful clothes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="px-4 pb-2 ">

        {/* Heading */}
        <h2 className="lg:text-lg  font-medium text-center text-foreground line-clamp-1">
          Become a fashion philanthropist!
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Earn more and help make a change with us
        </p>

        {/* Call to Action Button */}
        <div className="pt-2 flex justify-center">
          <Button variant={"outline"} size="lg" className=" text-base border-black/40">
            Start selling
          </Button>
        </div>
      </div>
    </Card>
  );
}
