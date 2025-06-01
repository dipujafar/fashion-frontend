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