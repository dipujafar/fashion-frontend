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
