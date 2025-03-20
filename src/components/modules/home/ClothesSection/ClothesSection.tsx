import Container from "@/components/shared/Container";
import CommonButton from "@/components/ui/common-button";
import Link from "next/link";
import PreviewClothes from "./PreviewClothes";

const ClothesSection = () => {
  return (
    <Container>
      <Link href={"/shop"}>
        <CommonButton className="md:min-w-52 mx-auto flex">
          SHOP ALL PRODUCTS
        </CommonButton>
      </Link>
      <PreviewClothes></PreviewClothes>
    </Container>
  );
};

export default ClothesSection;
