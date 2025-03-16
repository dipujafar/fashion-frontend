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
