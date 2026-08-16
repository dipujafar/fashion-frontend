import { IUserWithExtra } from "@/app/(public)/shop/[productId]/_components/ProductDetails/ProductDetails";

export type TBlogsData = {
  _id: number;
  image: string;
  date: string;
  totalFeedback: number;
  description: string;
};

export type TUser = {
  _id: string;
  name: string;
  bio: string;
  type: string;
  image: string;
  coverImage: string;
  bestOn?: string;
};

export type TProduct = {
  _id: number;
  image: string;
  userImage: string;
  userType: string;
  title: string;
  price: number;
  rating: number;
  location: string;
  tag?: string;
  size: string;
  offers?: string;
};

export type TProductImage = {
  key: string;
  url: string;
  _id: string;
};

export type TProductDetails = {
  _id: number;
  image: TProductImage[];
  userImage: string;
  userType: string;
  title: string;
  price: string;
  originalPrice: string;
  discount: string;
  location: string;
  tags: string[];
  size: string;
  tag: string;
  charity: string;
  item_Number: string;
  category: string;
  condition: string;
  fabric: string;
  brands: string;
  color: string;
  care_Instruction: string;
};

export type TUserRoleData = {
  _id: number;
  image: string;
  title: string;
  description: string;
  link: string;
  role: string;
};

export interface TOfferProduct {
  id: string;
  itemNumber: string;
  productPrice: number;
  offerPrice: number;
  status: "Pending" | "Offer Accepted" | "Expired";
  timeRemaining?: string;
  images: string[];
}

export type TUserDetails = {
  _id: number;
  id: string;
  name: string;
  image: string;
  title: string;
  features: TUserDetailsFeature[];
};

export type TUserDetailsFeature = {
  _id: number;
  title: string;
  description: string[];
};

// ======================================== integration --> real data ========================================================
export interface IProductImage {
  id: string;
  url: string;
  key: string;
  productId: string;
}

export interface IBrand {
  id: string;
  name: string;
  order: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISize {
  id: string;
  title: string;
  order: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: string;
  name: string;
  parentId: string | null;
  sizeGuide: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ICondition = string;

export type ICareInstruction = string;

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPct: number;
  finalPrice: number;
  currency: string;
  brandId: string;
  sizeId: string;
  categoryId: string;
  catagory_hierarchy: ICategory[];
  condition: ICondition;
  tags: string[];
  meterials: string[];
  color: string;
  care_instructions: ICareInstruction[];
  allow_offer: boolean;
  return_window: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  images: IProductImage[];
  brand: IBrand;
  size: ISize;
  category: ICategory;
  _count: {
    favourites: number;
  };
  favourites: {
    id: string;
  }[];
  donation_percent: number,
  user: IUser;
  charities: ICharity[]
}

export interface ICartGroup {
  id: string,
  userId: string,
  sellerId: string,
  seller: IUserWithExtra,
  items: {
    id: string,
    productId: string,
    product: IProduct,
    extraDonation: number,
    extraDonationAnonymous: boolean,
    charities: {
      id: string,
      charityId: string,
      charity: IUser,
    }[]
  }[],
  createdAt: Date
  updatedAt: Date
}

export interface ICharity {
  "id": string,
  "isAnonymous": boolean,
  "productId": string,
  "charityId": string,
  "charity": IUser
  "createdAt": Date
}

export type UserRole =
  | "INDIVIDUAL_USER"
  | "CHARITABLE_ORGANIZATION"
  | "CHARITY_SHOP"
  | "ECO_FRIENDLY_STORE"
  | "CELEBRITY"
  | "AMBASSADOR"
  | "PROFESSIONAL_SELLER"
  | "ASSISTED_SELLER";

export interface IUserAuth {
  role: UserRole;
}

export interface IUser {
  id: string;
  fname: string;
  lname: string;
  email: string;
  userName: string;
  phone: string;
  description: string | null;
  bio: string | null;
  country: string;
  state: string;
  city: string;
  address: string;
  zip_code: string;
  instagram: string | null;
  facebook: string | null;
  twitter: string | null;
  tiktok: string | null;
  website: string | null;
  notification: boolean;
  fcmToken: string | null;
  mission: string | null;
  business_tags: string[];
  isOnline: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  auth: IUserAuth;
  avgRating: number;
  picture: { key: string, url: string } | null;
  followers: IFolow[]
  following: IFolow[]
  charityGalleries: { id: string, url: string, caption: string }[]
  vacationMode: boolean
}

export interface IQuesAns {
  id: string
  questioner: IUser
  question: string
  answer: string | null
  createdAt: Date
  answeredAt: Date | null
}

export interface IFolow {
  followerId: string,
  followingId: string
  follower: IUser
  following: IUser
}

export interface Addresses {
  buyingAddress: IBillingDetails | null,
  sellingAddress: IBillingDetails | null
}

export interface IBillingDetails {
  country: string,
  countryCode: string,
  full_name: string,
  address1: string,
  address2?: string,
  zip_code: string,
  state: string,
  city: string,

  email: string | null

  contact: string
}

export interface ILoggedInUser {
  exp: string;
  iat: string;
  role: UserRole;
  userId: string;
}

export interface IWishListData {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: IProduct;
}

export interface IMeta {
  total: number,
  totalPage: number,
  page: number,
  limit: number,
}

export interface ISelldonation {
  id: string,
  amount: number,
  percent: number,
  extra_money: number,
  isAnonymous: boolean,
  total_amount: number,
  status: string,
  createdAt: Date,
  orderItemId: string,
  charityId: string,
  charity: IUser,
  orderItem: {
    product: IProduct
  }
}

export interface IDirectDonation {
  id: string

  donorId: string | null
  donor: IUser | null

  charityId: string
  charity: IUser

  amount: number
  currency: string

  status: string

  transactionId: string
  paymentIntentId: string

  // anonymous donation
  isAnonymous: boolean

  // donor message
  message: string | null

  donatedAt: Date | null
}

export interface ITreeDonation {
  id: string

  treeCredit: number,
  createdAt: Date,
}

export interface ICourierServiceRates {
  total_charge: number,
  min_delivery_time: number,
  max_delivery_time: number,
  courier_service: { name: string, logo: string, id: string }
}[]

export type OrderSummeryType = { itemTotal: number, otherTotal: number, total: number, serviceFeeCost: number, treeGiftCost: number, authenticationCost: number, bundleDiscountPercent: number, bundleDiscountAmount: number, totalExtraDonation: number }

export interface IOrder {
  id: string,

  buyerId: string,
  buyer: IUser,

  itemsTotal: number,
  totalPrice: number,
  totalDeliveryCost: number,

  sellerTotal: number,
  sellerItemsTotal: number,

  items: IOrderItem[]

  status: OrderStatus
  currentShipTo: CurrentShipTo
  authStatus: OrderAuthStatus

  sellerId: string,
  seller: IUser,

  billingDetails: IBillingDetails,
  createdAt: Date,
}

export enum CurrentShipTo {
  AUTHENTICATION_CENTER = "AUTHENTICATION_CENTER",
  BUYER = "BUYER"
}

export enum OrderStatus {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum OrderAuthStatus {
  NOT_STARTED = "NOT_STARTED",
  ITEM_RECEIVED = "ITEM_RECEIVED",
  IN_PROGRESS = "IN_PROGRESS",
  RESPONDED = "RESPONDED",
}

export enum OrderAuthResult {
  NOT_PROCESSED = "NOT_PROCESSED",
  PASSED = "PASSED",
  FAILED = "FAILED"
}

export interface IOrderItem {
  id: string,
  productId: string,
  product: IProduct,
  quantity: number,
  unitPrice: number,
  totalPrice: number,
  isBuyerRequestCancel: boolean,
  authResult: OrderAuthResult,
  isCancelled: boolean,

  cancelledBy: CancelledBy
  cancelReason: CancelReason
  cancelReasonDetails: string | null
  // for attach photo or videos as reason
  cancelEvidence: { url: string, key: string }[]

}

export enum CancelledBy {
    SELLER = "SELLER",
    BUYER = "BUYER",
    SYSTEM = "SYSTEM"
}

// types.ts (or wherever OrderStatus is defined)

export enum CancelReason {
  CHANGED_MIND = "CHANGED_MIND",
  FOUND_BETTER_PRICE = "FOUND_BETTER_PRICE",
  ORDERED_BY_MISTAKE = "ORDERED_BY_MISTAKE",
  ITEM_NO_LONGER_NEEDED = "ITEM_NO_LONGER_NEEDED",
  DELIVERY_TOO_LONG = "DELIVERY_TOO_LONG",
  FOUND_BETTER_PRODUCT = "FOUND_BETTER_PRODUCT",
  WRONG_ITEM_SELECTED = "WRONG_ITEM_SELECTED",
  DUPLICATE_ORDER = "DUPLICATE_ORDER",
  SHIPPING_COST_TOO_HIGH = "SHIPPING_COST_TOO_HIGH",
  PAYMENT_ISSUE = "PAYMENT_ISSUE",
  SELLER_UNRESPONSIVE = "SELLER_UNRESPONSIVE",

  OUT_OF_STOCK = "OUT_OF_STOCK",
  UNABLE_TO_FULFILL_IN_TIME = "UNABLE_TO_FULFILL_IN_TIME",
  PRICING_ERROR = "PRICING_ERROR",
  BUYER_UNREACHABLE = "BUYER_UNREACHABLE",
  SUSPECTED_FRAUD = "SUSPECTED_FRAUD",
  SHIPPING_ADDRESS_ISSUE = "SHIPPING_ADDRESS_ISSUE",
  LISTING_ERROR = "LISTING_ERROR",
  BUYER_REQUESTED = "BUYER_REQUESTED",
  DAMAGED_INVENTORY = "DAMAGED_INVENTORY",
  PAYMENT_NOT_VERIFIED = "PAYMENT_NOT_VERIFIED",

  OTHER = "OTHER"
}

export enum SellerCancelReason {
  OUT_OF_STOCK = "OUT_OF_STOCK",
  UNABLE_TO_FULFILL_IN_TIME = "UNABLE_TO_FULFILL_IN_TIME",
  PRICING_ERROR = "PRICING_ERROR",
  BUYER_UNREACHABLE = "BUYER_UNREACHABLE",
  SUSPECTED_FRAUD = "SUSPECTED_FRAUD",
  SHIPPING_ADDRESS_ISSUE = "SHIPPING_ADDRESS_ISSUE",
  LISTING_ERROR = "LISTING_ERROR",
  BUYER_REQUESTED = "BUYER_REQUESTED",
  DAMAGED_INVENTORY = "DAMAGED_INVENTORY",
  PAYMENT_NOT_VERIFIED = "PAYMENT_NOT_VERIFIED",
  OTHER = "OTHER",
}