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

export interface IBillingDetails {
  country: string,
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

export interface IOrder {
  id: string,

  userId: string,
  user: IUser,

  billingDetails: IBillingDetails,
  sellerGroups: IsellerGroup[],
  createdAt: Date,
}

export interface IsellerGroup {
  id: string,
  orderId: string,
  order: IOrder,

  sellerId: string,
  seller: IUser,

  subtotal: number,

  status: OrderStatus,

  items: IOrderItem[]
}

export interface IOrderItem {
  id: string,
  productId: string,
  product: IProduct,
  quantity: number,
  unitPrice: number,
  totalPrice: number,
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}