import Container from "@/components/shared/Container";
import WishListContainer from "./_components/WishListContainer";
import { Suspense } from "react";
import { IMeta, IProduct } from "@/types";
import GetFavouriteProds from "@/lib/services/FavoriteProds";

export const metadata = {
  title: "WishList",
  description: "Your all favorite products are here",
}

export default function WishListPage() {
  const favPromise = GetFavouriteProds();
  return (
    <Container className='pt-3 md:pt-5'>

      <div className="flex items-end justify-between gap-3">
        <div>
          {/* <p className="mb-2 text-base font-medium text-primary">Your updates</p> */}
          <h1 className="text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Favourites</h1>
          <p className="mt-2 max-w-md text-pretty text-sm lg:text-base leading-6 text-gray-600">You will be notified when your favorite listings drop in price or are relisted.</p>
        </div>
      </div>

      <Suspense fallback={<div className="flex-center h-40 lg:h-60">
        <span className="loaderDark !w-10"> </span>
      </div>}>
        <FavouriteList favPromise={favPromise} />
      </Suspense>

    </Container>
  );
}

const FavouriteList = async ({ favPromise }: { favPromise: Promise<{ data: { data: { id: string, product: IProduct }[], meta: IMeta } }> }) => {

  const favoriteProds = await favPromise;

  const favoriteItems = favoriteProds?.data?.data;

  const initialMeta = favoriteProds?.data?.meta;

  return (
    <WishListContainer favoriteProds={favoriteItems} initialMeta={initialMeta} />
  );

}
