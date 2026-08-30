import { IChatUser, IMeta, IProduct, IUser } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      providesTags: (result) => {
        const items = result?.data?.data ?? result ?? [];
        return [
          ...items.map(({ id }: { id: string }) => ({
            type: tagTypes.product,
            id,
          })),
          { type: tagTypes.product, id: "LIST" },
        ];
      },
    }),

    getProductList: builder.mutation<{ data: { data: IProduct[], meta: IMeta } }, {}>({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params,
      }),
    }),
    getProductStats: builder.query<{
      data: {
        "_count": {
          "favourites": number,
          "cartItems": number,
          "offerItems": number
        }
      }
    }, { productId: string }>({
      query: ({ productId }) => ({
        url: `/products/stats/${productId}`,
        method: "GET"
      }),
    }),

    productsGetByMember: builder.mutation<{ data: { data: IProduct[], meta: IMeta } }, { userName: string, params: {} }>({
      query: ({ params, userName }) => ({
        url: `/products/member/${userName}`,
        method: "GET",
        params,
      }),
    }),

    productsByIds: builder.query<{
      data: {
        products: IProduct[],
        seller: IUser,
        totalPrice: number,
        chat : IChatUser
      }
    }, { ids: string }>({
      query: ({ ids }) => ({
        url: `/products/by-ids/${ids}`,
        method: "GET",
      }),
    }),

  }),
});

export const { useCreateProductMutation, useGetProductsQuery, useProductsGetByMemberMutation, useGetProductListMutation, useGetProductStatsQuery, useProductsByIdsQuery } = productApi;
