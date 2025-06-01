import UserDetailsCard from "@/components/shared/Cards/UserDetailsCard";
import React from "react";

const userDetailsData = [
  {
    _id: 1,
    id: "individual_user",
    name: "Individual User",
    image: "/individual_user_image.png",
    title:
      "An individual user is a buyer or a seller on the platform. They can engage in purchasing items, selling products, or donating to charity.",
    features: [
      {
        _id: 1,
        title: "Profile Management",
        description: [
          "Create and manage personal profiles (e.g., name, email, contact details).",
          "Set shipping information and preferences.",
        ],
      },
      {
        _id: 2,
        title: "Purchasing Items",
        description: [
          "Browse and purchase items listed by sellers.",
          "Select charities they want to donate to at checkout.",
        ],
      },
      {
        _id: 3,
        title: "Donations",
        description: [
          "Donate to charity (either via product purchases or direct donations through the platform).",
          "Track the total amount donated and receive receipts for tax purposes.",
        ],
      },
      {
        _id: 4,
        title: "Sale of Items",
        description: [
          "List personal items for sale.",
          "Choose a percentage of the sale to donate to charity.",
        ],
      },
      {
        _id: 5,
        title: "Wishlist and Favorites",
        description: ["Save products they like for later."],
      },
      {
        _id: 6,
        title: "Order Tracking",
        description: [
          "View the status of purchased items (shipped, pending, etc.).",
        ],
      },
    ],
  },
  {
    _id: 2,
    id: "charitable_organization",
    name: "Charitable Organization",
    image: "/charitable_organization_image2.png",
    title:
      "A charitable organization is a non-profit entity that benefits from donations made through the platform. Charities are approved and managed by the platform admin.",
    features: [
      {
        _id: 1,
        title: "Charity Profile",
        description: [
          "Create and manage a profile with information about their mission, goals, and contact details.",
        ],
      },
      {
        _id: 2,
        title: "Donation Tracking",
        description: [
          "Track donations received through the platform.",
          "View detailed reports on donations (total amount, donor information, etc.).",
        ],
      },
      {
        _id: 3,
        title: "Withdraw Funds",
        description: [
          "Withdraw the funds donated by users or sellers on the platform.",
        ],
      },
      {
        _id: 4,
        title: "Communication with Donors",
        description: [
          "Send thank-you messages to donors (subject to platform rules).",
        ],
      },
      {
        _id: 5,
        title: "Visibility and Exposure",
        description: [
          "Featured on the platform’s charity section, allowing buyers and sellers to select them as donation recipients.",
        ],
      },
      {
        _id: 6,
        title: "Charity Impact Updates",
        description: [
          "Provide updates on how donations are being used, improving donor transparency.",
        ],
      },
    ],
  },
  {
    _id: 3,
    id: "charity_store",
    name: "Charity Store",
    image: "/charity_store_image.png",
    title:
      "A charity store is a special store where a charity organization lists products for sale, either donated items or products made to raise funds for their cause.",
    features: [
      {
        _id: 1,
        title: "Store Management",
        description: [
          "Create and manage a charity store profile with information about their cause, mission, and fundraising goals.",
        ],
      },
      {
        _id: 2,
        title: "Product Listings",
        description: [
          "List products for sale, where all the proceeds from sales go directly to the charity",
        ],
      },
      {
        _id: 3,
        title: "Fundraising",
        description: [
          "Display fundraising goals and track total funds raised through the store.",
        ],
      },
      {
        _id: 4,
        title: "Donation Tracking",
        description: [
          "Track how much has been raised by each item and overall from all listings.",
        ],
      },
      {
        _id: 5,
        title: "Charity Badge",
        description: [
          "Display a 'Charity Store' badge to inform users that the store is for charitable purposes.",
        ],
      },
      {
        _id: 6,
        title: "Donation Transparency",
        description: [
          "Users can see how much of the product's price is being donated, improving trust in the platform.",
        ],
      },
    ],
  },
  {
    _id: 4,
    id: "celebrity",
    name: "Celebrity",
    image: "/celebrity_image.png",
    title:
      "Celebrities or influencers on the platform are recognized individuals who use their social media presence to promote products or the platform itself. They have a large following and are often endorsed to help drive engagement and sales.",
    features: [
      {
        _id: 1,
        title: "Profile Management",
        description: [
          "Create a public profile that includes their social media links, follower count, and any promotions they are involved in.",
        ],
      },
      {
        _id: 2,
        title: "Promotions",
        description: [
          "Promote products and services from sellers, either for a commission or as part of an ongoing partnership.",
        ],
      },
      {
        _id: 3,
        title: "Verified Badge",
        description: [
          "Receive a “Verified Influencer” or 'Verified Celebrity' badge to show authenticity.",
        ],
      },
      {
        _id: 4,
        title: "Collaborations with Brands",
        description: [
          "Partner with sellers and brands to feature their products on social media and drive traffic to the platform.",
        ],
      },
      {
        _id: 5,
        title: "Commission Earnings",
        description: [
          "Earn commissions or rewards based on products sold or traffic driven to the platform.",
        ],
      },
      {
        _id: 6,
        title: "Special Features",
        description: [
          "Access to promotional tools and insights about products they are promoting.",
        ],
      },
    ],
  },
  {
    _id: 5,
    id: "ambassador",
    name: "Ambassador",
    image: "/ambassador_image.png",
    title:
      "Ambassadors are individuals who represent the platform or a specific brand and help promote products by engaging their audience on social media.",
    features: [
      {
        _id: 1,
        title: "Promotional Tools",
        description: [
          "Access to promotional materials, discount codes, and referral links to share with their followers.",
        ],
      },
      {
        _id: 2,
        title: "Earn Commissions",
        description: [
          "Receive commissions on sales made through their promotional efforts, either as a percentage or fixed amount.",
        ],
      },
      {
        _id: 3,
        title: "Brand Recognition",
        description: [
          "Gain visibility on the platform with a 'Verified Ambassador' badge to enhance trust.",
        ],
      },
      {
        _id: 4,
        title: "Engagement Metrics",
        description: [
          "Access to insights and analytics on how their promotions are performing (e.g., clicks, sales, traffic).",
        ],
      },
      {
        _id: 5,
        title: "Profile Management",
        description: [
          "Manage their personal ambassador profile, including social media links and campaigns.",
        ],
      },
    ],
  },
  {
    _id: 6,
    id: "professional_seller",
    name: "Professional Seller",
    image: "/professional_image.png",
    title:
      "A professional seller is a business or brand that lists products for sale on the platform. They typically have higher-volume sales than individual sellers and may offer a wide range of products.",
    features: [
      {
        _id: 1,
        title: "Business Profile Management",
        description: [
          "Set up and manage a business profile with company details, business registration number, and certifications.",
        ],
      },
      {
        _id: 2,
        title: "Bulk Listings",
        description: [
          "List multiple products at once, with advanced features like bulk price updates, inventory tracking, and discount management.",
        ],
      },
      {
        _id: 3,
        title: "Advanced Analytics",
        description: [
          "Access detailed sales, traffic, and donation reports for their products.",
        ],
      },
      {
        _id: 4,
        title: "Branding & Customization",
        description: [
          "Customize their storefront with logos, banners, and business-related content.",
        ],
      },
      {
        _id: 5,
        title: "Promotions & Discounts",
        description: [
          "Create sales campaigns, discount codes, or bundle offers to attract more buyers.",
        ],
      },
      {
        _id: 6,
        title: "Subscription Plans",
        description: [
          "May have to subscribe to a paid plan with additional features like priority customer support, increased visibility, or enhanced analytics.",
        ],
      },
    ],
  },
  {
    _id: 7,
    id: "eco_friendly_store",
    name: "Eco-Friendly Store",
    image: "/eco_friendly_image.png",
    title:
      "Eco-friendly stores are sellers offering products that prioritize sustainability, ethical sourcing, and environmental responsibility. These stores sell items made from eco-conscious materials or designed to reduce environmental impact.",
    features: [
      {
        _id: 1,
        title: "Eco-Friendly Products",
        description: [
          "Sell products made from recycled materials, organic goods, or designed to minimize waste.",
        ],
      },
      {
        _id: 2,
        title: "Store Profile Management",
        description: [
          "Create a business profile that highlights the store’s commitment to sustainability, including certifications and product sourcing.",
        ],
      },
      {
        _id: 3,
        title: "Certifications",
        description: [
          "Upload and showcase eco-friendly certifications like organic, cruelty-free, or fair trade.",
        ],
      },
      {
        _id: 4,
        title: "Donation Options",
        description: [
          "Option to donate a percentage of sales to environmental causes or charities.",
        ],
      },
      {
        _id: 5,
        title: "Product Visibility",
        description: [
          " Eco-friendly stores receive increased visibility through the platform’s eco-conscious marketing and promotions.",
        ],
      },
      {
        _id: 6,
        title: "Sustainable Branding",
        description: [
          "Products are marketed as sustainable and ethical, helping to attract environmentally-conscious customers.",
        ],
      },
    ],
  },
  {
    _id: 8,
    id: "assisted_seller",
    name: "Assisted Seller",
    image: "/assisted_seller_image.png",
    title:
      "Assisted sellers are individuals or businesses who choose to send their products to the platform’s warehouse for listing. The platform manages the listing, photography, and product management.",
    features: [
      {
        _id: 1,
        title: "Shipping to Platform",
        description: [
          "Ship items directly to the platform’s warehouse for listing.",
        ],
      },
      {
        _id: 2,
        title: "Limited Control Over Listing",
        description: [
          "Assisted sellers provide product details, but the platform handles the actual listing (e.g., taking photos, setting descriptions, and categorizing).",
        ],
      },
      {
        _id: 3,
        title: "Charity Donations",
        description: [
          "Assisted sellers can choose which charities to donate a percentage of the sale to, and buyers can select which charity to support.",
        ],
      },
      {
        _id: 4,
        title: "Track Sales & Donations",
        description: [
          "Assisted sellers can track how much their items have sold for and how much has been donated to charities.",
        ],
      },
      {
        _id: 5,
        title: "Earnings & Payments",
        description: [
          "Earnings are processed by the platform, and the seller receives payments after platform fees and charity donations are deducted.",
        ],
      },
      {
        _id: 6,
        title: "Visibility & Marketing",
        description: [
          "Items are marketed by the platform, and the seller gets visibility across the platform’s audience, without having to handle the logistics of product listings.",
        ],
      },
    ],
  },
];

const UserDetailsContainer = () => {
  return (
    <div className="md:space-y-10 space-y-7">
      {userDetailsData.map((data) => (
        <UserDetailsCard
          key={data._id}
          data={data}
          className={data._id % 2 === 0 ? "lg:flex-row-reverse" : ""}
        />
      ))}
    </div>
  );
};

export default UserDetailsContainer;
