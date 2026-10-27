import { baseApi } from "./baseApi";

export interface ICharityStats {
  totalRaised: string | number;
  totalDonor: number;
  balance: number | string;
}

export interface ICharityShopStats extends ICharityStats {
  totalSellsAmount: number;
  totalClothDonationRaised: number;
}

export interface ISellerStats {
  totalSellsAmount: number | string;
  balance: number | string;
}

export interface ICharityDonationChartItem {
  month: string;
  sellDonationAmount: number;
  directDonationAmount: number;
}

export interface ICharityShopDonationChartItem extends ICharityDonationChartItem {
  clothDonationCount: number;
}

export interface ISellsChartItem {
  month: string;
  totalSellsAmount: number;
}

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCharityStats: builder.query<
      { message: string; data: ICharityStats },
      void
    >({
      query: () => ({
        url: "/dashboard/charity-stats",
        method: "GET",
      }),
    }),

    getCharityDonationChart: builder.query<
      { message: string; data: ICharityDonationChartItem[] },
      { JoinYear?: number | string } | void
    >({
      query: (params) => ({
        url: "/dashboard/charity-donation-chart",
        method: "GET",
        params: params || undefined,
      }),
    }),

    getCharityShopStats: builder.query<
      { message: string; data: ICharityShopStats },
      void
    >({
      query: () => ({
        url: "/dashboard/charity-shop-stats",
        method: "GET",
      }),
    }),

    getCharityShopDonationChart: builder.query<
      { message: string; data: ICharityShopDonationChartItem[] },
      { JoinYear?: number | string } | void
    >({
      query: (params) => ({
        url: "/dashboard/charity-shop-donation-chart",
        method: "GET",
        params: params || undefined,
      }),
    }),

    getSellerStats: builder.query<
      { message: string; data: ISellerStats },
      void
    >({
      query: () => ({
        url: "/dashboard/seller-stats",
        method: "GET",
      }),
    }),

    getSellsChart: builder.query<
      { message: string; data: ISellsChartItem[] },
      { JoinYear?: number | string } | void
    >({
      query: (params) => ({
        url: "/dashboard/sells-chart",
        method: "GET",
        params: params || undefined,
      }),
    }),
  }),
});

export const {
  useGetCharityStatsQuery,
  useGetCharityDonationChartQuery,
  useGetCharityShopStatsQuery,
  useGetCharityShopDonationChartQuery,
  useGetSellerStatsQuery,
  useGetSellsChartQuery,
} = dashboardApi;
