import Container from "@/components/shared/Container";
import React, { Suspense } from "react";
import ShopPageContainer from "./_components/ShopPageContainer";
import { ProductGridSkeleton } from "@/components/skeletons/ProductsCardSkeleton";
import GetProducts from "@/lib/services/Products";
import ProductCategory from "./_components/ProductCategory";
import { SmallDeviceFilter } from "./_components/SmallDeviceFilter";
import CategorySelectClient, { SelectCatBypath } from "./_components/CategorySelectClient";
import GetCategoriesHairerchy, { GetCategoryParentChainByCategory } from "@/lib/services/Categories";
import { Category } from "@/components/shared/UserProfile/AddProduct/Categories/CategorySelector";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import RecentView from "@/components/modules/home/RecentView/RecentView";
import RecommendedProds from "@/components/modules/home/Recommended/Recommended";

export const metadata = {
  title: "Shop",
  description: "Enjoy your shopping with Fashion!",
};

const ShopPage = async ({ searchParams: ssp }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

  const { category, page } = await ssp;
  const query: any = {}

  if (page) {
    query.page = page
  }
  if (category) {
    query.category = category
  }

  const prodsPromise = GetProducts({ query });
  const categoryPromise = GetCategoriesHairerchy();
  const categoryParentChainPromise = GetCategoryParentChainByCategory(category);

  return (

    <Container>
      <div>
        {/* <ProductCategory></ProductCategory> */}
        {/* <AllCategory /> */}

        {/* ----------------------------------------- show filter option ------------------------------------- */}



        <Suspense fallback={<div className="flex flex-row gap-x-2 items-center">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-30" />
          <Skeleton className="h-5 w-15" />
          <Skeleton className="h-5 w-20" />
        </div>}>
          <SelectedCategoryParentChain catpromise={categoryParentChainPromise} />
        </Suspense>

        {/* ------------------------------------------------------------------------------------------------ */}
        <div className="hidden lg:block">

          {/* <ProductFilterContainer /> */}
          <Suspense fallback={<Skeleton className="h-12 w-60" />}>
            <CategorySelector selectedCat={category} catpromise={categoryPromise} />
          </Suspense>

        </div>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ShopPageContainer prodsPromise={prodsPromise} />
        </Suspense>

        {/* ================Recent View==================== */}
        <div>
          <div className="flex justify-between items-center gap-x-4 mb-2 ">
            <h4 className="section-name uppercase">{"Recently Viewed"}</h4>
            {
              <Link
                href={"/shop"}
                className="flex gap-x-2 items-center font-bold group "
              >
                <p>{"View All"} </p>
                <AnimatedArrow size={20}></AnimatedArrow>
              </Link>
            }
          </div>
          <hr />
          <RecentView />
        </div>

        {/* ==================Recommende============= */}
        <div className="mt-8">
          <div className="flex justify-between items-center gap-x-4 mb-2 ">
            <h4 className="section-name uppercase">{"You may also like"}</h4>
            {
              <Link
                href={"/shop"}
                className="flex gap-x-2 items-center font-bold group "
              >
                <p>{"View All"} </p>
                <AnimatedArrow size={20}></AnimatedArrow>
              </Link>
            }
          </div>
          <hr />

          <RecommendedProds />
        </div>


      </div>
    </Container>
  );
};

export default ShopPage;

const CategorySelector = async ({ catpromise, selectedCat }: { catpromise: Promise<{ data: Category[] }>, selectedCat?: string }) => {
  const categories = await catpromise;

  return <CategorySelectClient selectedCat={selectedCat} categories={categories?.data} />
}

const SelectedCategoryParentChain = async ({ catpromise }: { catpromise: Promise<{ data: Category[] }> }) => {
  const categories = await catpromise;

  return <SelectCatBypath cats={categories?.data} />
}
