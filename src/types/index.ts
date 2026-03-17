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
  catagory_hierarchy: string[];
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
  user: IUser;
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
  picture: string | null;
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
