import Container from "@/components/shared/Container";
import CommonButton from "@/components/ui/common-button";
import Link from "next/link";
import PreviewClothes from "./PreviewClothes";

const ClothesSection = () => {
  return (
    <div>
      <Link href={"/shop"}>
        <CommonButton className="md:min-w-52 mx-auto flex">
          SHOP ALL PRODUCTS
        </CommonButton>
      </Link>
      <PreviewClothes></PreviewClothes>
    </div>
  );
};

export default ClothesSection;
