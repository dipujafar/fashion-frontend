import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const ProductCard = ({ data }: any) => {
  return (
    <Card className="border-none  hover:scale-105 hover:-translate-y-3 duration-500">
      <CardContent className="space-y-4">
        {/* ===================================== product image =============================== */}
        <div className="relative">
          <Image src={data?.image} alt="product_image"></Image>
        </div>
        {/* ===================================== product details =============================== */}
        <div className="">
          <div></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
