import Container from "@/components/shared/Container";
import React, { Suspense } from "react";
import SingleProductDetails from "./_components/SingleProductDetails";
import { Button } from "@/components/ui/button";
import { MessageIcon } from "@/icons";
import GetProductDetails, { GetQuesAnsWithProdDetails } from "@/lib/services/ProductDetails";
import { IProduct } from "@/types";
import { EnvConfig } from "@/config";
import CharitySupportCards from "@/components/shared/Cards/CharitySupportCards";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { CharityDonationFormDialog } from "@/components/shared/Modal/Charity/CharityDonationFormDialog";
import CharityInfo from "./_components/dialog/CharityInfo";
import ReviewContainer from "./_components/review/ReviewContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {

  const fallback = {
    title: "Not Found",
    description: "Listing you are looking for is not available.",
    // metadataBase: new URL('https://google.com'),
  };

  try {
    const { productId } = await params;

    const { data } = (await GetProductDetails({ id: productId })) as { data: IProduct };

    if (!data) {
      return fallback;
    }

    const productUrl = `/shop/${data?.id}`;
    const image = data?.images?.[0];

    return {
      metadataBase: new URL(EnvConfig.serverRootUrl!),

      title: `${data?.title} | Buy Online at Fashion`,
      description:
        data?.description?.slice(0, 160) ||
        `Buy ${data?.title} at the best price. Fast delivery and secure payment.`,

      keywords: [
        data?.title,
        data?.category?.name,
        "buy online",
        "fashion store",
        "ecommerce",
      ],

      alternates: {
        canonical: productUrl,
      },

      openGraph: {
        title: data?.title,
        description: data?.description,
        url: productUrl,
        siteName: "FASHION",
        type: "website",
        images: [image],
      },

      twitter: {
        card: "summary_large_image",
        title: data?.title,
        description: data?.description,
        images: [image],
      },
    };
  } catch {
    return fallback
  }
}

const SingleProductDetailsPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;
  const detailPromise = GetProductDetails({ id: productId });
  const quesPromise = GetQuesAnsWithProdDetails({ prodId: productId });

  return (
    <div>

      <Container className="xl:space-y-8 lg:space-y-6 space-y-4">

        <Suspense fallback={<div>Loading...</div>}>
          <SingleProductDetails promiseDetails={detailPromise} />
        </Suspense>

        {/* ================Question & Answers=================== */}
        <ReviewContainer quesPromise={quesPromise} prodId={productId} />

        {/* ==============Charioty supports=============== */}
        <div>
          <div>
            {/* ======================================= section header ========================================== */}
            <div className="flex-between lg:mb-2 mb-1 ">
              <div className="flex items-center gap-x-1.5">
                <h4 className="lg:text-2xl text-lg font-medium">
                  Charity Support
                </h4>
                <CharityInfo />
              </div>
              <CharityDonationFormDialog>
                <div className="flex gap-x-3 items-center group cursor-pointer">
                  <h4 className="font-bold">ADD DONATE</h4>
                  <AnimatedArrow size={20} />
                </div>
              </CharityDonationFormDialog>
            </div>

            <hr className="border lg:mb-6 mb-4" />
          </div>
          <CharitySupportCards></CharitySupportCards>
        </div>

        {/* <ProductDescription></ProductDescription> */}
        {/* <DisplayProductSection
        title="Recently Viewed"
        data={recentlyViewedData}
      ></DisplayProductSection>

      <DisplayProductSection
        title="You may also like"
        data={trendingProductData}
      ></DisplayProductSection> */}

      </Container>

      {/* ==============Small device make offer================= */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-lg md:hidden">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <MessageIcon className="h-[40px] w-[60px]" />
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
