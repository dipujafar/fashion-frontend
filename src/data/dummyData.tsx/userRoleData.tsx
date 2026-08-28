import { UserRole } from "@/types";

export const userRoleData = [
  {
    _id: 1,
    image: "/userRoleImage1.png",
    title: "Individual User",
    description: "This is an account for individuals to BUY or SELL items",
    link: "/user-details#individual_user",
    slug: "individual-user",
    role: UserRole.INDIVIDUAL_USER,
  },
  {
    _id: 2,
    image: "/userRoleImage2.png",
    title: "Charitable Organization",
    description:
      "A space for nonprofits to raise funds through clothing sales.",
    link: "/user-details#charitable_organization",
    slug: "charitable-organization",
    role: UserRole.CHARITABLE_ORGANIZATION,
  },
  {
    _id: 3,
    image: "/userRoleImage3.png",
    title: "Charity Shop",
    description:
      "Sell donated clothing to support your cause and give back to the community.",
    link: "/user-details#charity_shop",
    slug: "charity-shop",
    role: UserRole.CHARITY_SHOP,
  },
  {
    _id: 4,
    image: "/userRoleImage4.png",
    title: "Eco-Friendly Store",
    description:
      "Promote sustainable fashion with pre-loved or upcycled clothing.",
    link: "/user-details#eco_friendly_store",
    slug: "eco-friendly-store",
    role: UserRole.ECO_FRIENDLY_STORE,
  },
  {
    _id: 5,
    image: "/userRoleImage5.png",
    title: "Celebrity",
    description:
      "Share your unique fashion finds and inspire others with your style.",
    link: "/user-details#celebrity",
    slug: "celebrity",
    role: UserRole.CELEBRITY,
  },
  {
    _id: 6,
    image: "/userRoleImage6.png",
    title: "Ambassador",
    description:
      "Represent a brand, promote products, and grow your fashion influence.",
    link: "/user-details#ambassador",
    slug: "ambassador",
    role: UserRole.AMBASSADOR,
  },
  {
    _id: 7,
    image: "/userRoleImage7.png",
    title: "Professional Seller",
    description:
      "A business-oriented account for scaling your online fashion store.",
    link: "/user-details#professional_seller",
    slug: "professional-seller",
    role: UserRole.PROFESSIONAL_SELLER,
  },
  // {
  //   _id: 8,
  //   image: "/userRoleImage8.png",
  //   title: "Assisted Seller",
  //   description:
  //     "Get support in managing your store while selling your fashion items.",
  //   link: "/assisted-seller/sign-up",
  //   slug: "assisted-seller",
  //   role: UserRole.ASISTED_SELLER,
  // },
];

export const roleOptions: Record<string, UserRole> = {
  "individual-user": UserRole.INDIVIDUAL_USER,
  "charitable-organization": UserRole.CHARITABLE_ORGANIZATION,
  "charity-shop": UserRole.CHARITY_SHOP,
  "eco-friendly-store": UserRole.ECO_FRIENDLY_STORE,
  "celebrity": UserRole.CELEBRITY,
  "ambassador": UserRole.AMBASSADOR,
  "professional-seller": UserRole.PROFESSIONAL_SELLER
}