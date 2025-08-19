import {
  Grid3X3,
  Shirt,
  ShoppingBag,
  Sparkles,
  Footprints,
  Gem,
  PartyPopper,
  Watch,
  LandPlot,
  Telescope,
} from "lucide-react";

export const navigationData = {
  NewIn: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "featured",
        defaultActive: true,
        name: "Featured",
        icon: Sparkles,
        categories: [
          {
            items: [
              "All",
              "Trending Now",
              "Just Landed",
              "This Week",
              "Back in Stock",
            ],
          },
          {
            items: [
              "Most Viewed",
              "Releases Today",
              "Only a Few Left",
              "Back in Trend",
              "Early Access",
            ],
          },
        ],
      },
      {
        id: "shopByCategory",
        name: "Shop by Category",
        icon: ShoppingBag,
        categories: [
          {
            items: [
              "Clothing",
              "Shoes",
              "Bags",
              "Accessories",
              "Beauty & Grooming",
            ],
          },
          {
            items: [
              "Watches",
              "Jewellery",
              "Activewear",
              "Loungewear",
              "Outerwear",
            ],
          },
        ],
      },
    ],
  },
  Designers: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "designerTypes",
        name: "Designer Types",
        defaultActive: true,
        icon: Gem,
        categories: [
          {
            items: [
              "All",
              "Luxury",
              "Emerging",
              "Sustainable",
              "Cult Favorites",
            ],
          },
          {
            items: [
              "Streetwear",
              "Minimalist",
              "Heritage",
              "Avant-garde",
              "Seasonal Icons",
            ],
          },
        ],
      },
      {
        id: "byItem",
        name: "Shop by Item",
        icon: Shirt,
        categories: [
          {
            items: ["Clothing", "Shoes", "Bags", "Accessories", "Watches"],
          },
          {
            items: ["Jewellery", "Beauty", "Fragrance", "Eyewear", "Scarves"],
          },
        ],
      },
    ],
  },
  Women: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "clothing",
        name: "Clothing",
        defaultActive: true,
        icon: Shirt,
        categories: [
          {
            title: "All",
            items: [
              "All",
              "Jumpers & sweaters",
              "Dresses",
              "Tops & T-shirts",
              "Pants & leggings",
              "Jumpsuits & rompers",
              "Lingerie & nightwear",
              "Activewear",
              "Other clothing",
            ],
          },
          {
            title: "Outerwear",
            items: [
              "Outerwear",
              "Suits & blazers",
              "Skirts",
              "Jeans",
              "Shorts & cropped pants",
              "Swimwear",
              "Maternity clothes",
              "Costumes & special outfits",
            ],
          },
        ],
      },
      {
        id: "shoes",
        name: "Shoes",
        icon: Footprints,
        categories: [
          {
            items: [
              "All",
              "Boat shoes, loafers & moccasins",
              "Clogs & mules",
              "Flip-flops & slides",
              "Lace-up shoes",
              "Sandals",
              "Sport shoes",
            ],
          },
          {
            items: [
              "Ballerinas",
              "Boots",
              "Espadrilles",
              "Heels",
              "Mary Janes & T-bar shoes",
              "Slippers",
              "Sneakers",
            ],
          },
        ],
      },
      {
        id: "bags",
        name: "Bags",
        icon: ShoppingBag,
        categories: [
          {
            items: [
              "All",
              "Beach bags",
              "Bucket bags",
              "Clutches",
              "Gym bags",
              "Hobo bags",
              "Luggage & suitcases",
              "Satchels & messenger bags",
              "Tote bags",
              "Wristlets",
            ],
          },
          {
            items: [
              "Backpacks",
              "Briefcases",
              "Fanny packs",
              "Garment bags",
              "Handbags",
              "Holdalls & duffel bags",
              "Makeup bags",
              "Shoulder bags",
              "Wallets",
            ],
          },
        ],
      },
      {
        id: "accessories",
        name: "Accessories",
        icon: Gem,
        categories: [
          {
            items: [
              "All",
              "Belts",
              "Hair accessories",
              "Hats & caps",
              "Keyrings",
              "Sunglasses",
              "Watches",
            ],
          },
          {
            items: [
              "Bandanas & headscarves",
              "Gloves",
              "Handkerchiefs",
              "Jewelry",
              "Scarves & shawls",
              "Umbrellas",
              "Other accessories",
            ],
          },
        ],
      },
      {
        id: "beauty",
        name: "Beauty",
        icon: Sparkles,
        categories: [
          {
            items: ["All", "Perfume", "Beauty tools", "Nail care", "Hair care"],
          },
          {
            items: [
              "Makeup",
              "Facial care",
              "Hand care",
              "Body care",
              "Other beauty items",
            ],
          },
        ],
      },
    ],
  },
  Men: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "clothing",
        name: "Clothing",
        defaultActive: true,
        icon: Shirt,
        categories: [
          {
            title: "All",
            items: [
              "All",
              "Outerwear",
              "Suits & blazers",
              "Pants",
              "Socks & underwear",
              "Swimwear",
              "Costumes & special outfits",
            ],
          },
          {
            title: "Outerwear",
            items: [
              "Jeans",
              "Tops & T-shirts",
              "Sweaters & sweatshirts",
              "Shorts",
              "Sleepwear",
              "Activewear",
              "Other men's clothing",
            ],
          },
        ],
      },
      {
        id: "shoes",
        name: "Shoes",
        icon: Footprints,
        categories: [
          {
            items: [
              "All",
              "Boots",
              "Espadrilles",
              "Formal shoes",
              "Slippers",
              "Sneakers",
            ],
          },
          {
            items: [
              "Boat shoes, loafers & moccasins",
              "Clogs & mules",
              "Flip-flops & slides",
              "Sandals",
              "Sport shoes",
            ],
          },
        ],
      },
      {
        id: "accessories",
        name: "Accessories",
        icon: Gem,
        categories: [
          {
            items: [
              "All",
              "Bandanas & headscarves",
              "Suspenders",
              "Handkerchiefs",
              "Jewelry",
              "Scarves & shawls",
              "Ties & bow ties",
              "Other accessories",
            ],
          },
          {
            items: [
              "Bags & backpacks",
              "Belts",
              "Gloves",
              "Hats & caps",
              "Pocket squares",
              "Sunglasses",
              "Watches",
            ],
          },
        ],
      },
      {
        id: "grooming",
        name: "Grooming",
        icon: Sparkles,
        categories: [
          {
            items: [
              "All",
              "Tools & accessories",
              "Body care",
              "Aftershave & cologne",
              "Grooming kits",
            ],
          },
          {
            items: [
              "Facial care",
              "Hair care",
              "Hand & nail care",
              "Makeup",
              "Other grooming items",
            ],
          },
        ],
      },
    ],
  },
  WeLove: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "popularNow",
        name: "Popular Now",
        defaultActive: true,
        icon: Sparkles,
        categories: [
          {
            items: [
              "Customer Picks",
              "Top Rated",
              "Back in Stock",
              "New Favorites",
              "Must-Haves",
            ],
          },
          {
            items: [
              "As Seen on Social",
              "Celebrity Picks",
              "Style Influencers",
              "Seasonal Trends",
              "Buzzworthy Finds",
            ],
          },
        ],
      },
      {
        id: "styleEdits",
        name: "Style Edits",
        icon: Shirt,
        categories: [
          {
            items: [
              "Festival Fits",
              "Vacation Vibes",
              "Luxury Looks",
              "Minimal Musts",
              "Retro Revival",
            ],
          },
          {
            items: [
              "Workwear Edit",
              "Weekend Wear",
              "Statement Pieces",
              "Understated Chic",
              "Transitional Pieces",
            ],
          },
        ],
      },
    ],
  },
  Vintage: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "vintageClothing",
        name: "Clothing",
        defaultActive: true,
        icon: Shirt,
        categories: [
          {
            items: [
              "Vintage Dresses",
              "Retro Jackets",
              "Old School Denim",
              "Printed Shirts",
              "80s & 90s Tees",
            ],
          },
          {
            items: [
              "Corduroy Pants",
              "Vintage Skirts",
              "Statement Suits",
              "Vintage Knitwear",
              "Overalls & Jumpsuits",
            ],
          },
        ],
      },
      {
        id: "vintageAccessories",
        name: "Accessories",
        icon: Gem,
        categories: [
          {
            items: [
              "Vintage Bags",
              "Classic Watches",
              "Antique Jewellery",
              "Brooches",
              "Hair Combs",
            ],
          },
          {
            items: [
              "Retro Sunglasses",
              "Silk Scarves",
              "Coin Purses",
              "Gloves",
              "Pocket Squares",
            ],
          },
        ],
      },
    ],
  },
  Bags: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "styles",
        name: "Bag Styles",
        defaultActive: true,
        icon: ShoppingBag,
        categories: [
          {
            items: [
              "Tote Bags",
              "Crossbody",
              "Mini Bags",
              "Bucket Bags",
              "Satchels",
            ],
          },
          {
            items: [
              "Clutches",
              "Shoulder Bags",
              "Top Handle Bags",
              "Backpacks",
              "Messenger Bags",
            ],
          },
        ],
      },
      {
        id: "useCases",
        name: "Occasions",
        icon: PartyPopper,
        categories: [
          {
            items: ["Work", "Travel", "Evening", "Sport", "Everyday"],
          },
          {
            items: ["Luxury", "Vintage", "Designer", "Minimalist", "Statement"],
          },
        ],
      },
    ],
  },
  "Watches&Jewellery": {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "jewellery",
        name: "Jewellery",
        defaultActive: true,
        icon: Gem,
        categories: [
          {
            items: ["Necklaces", "Earrings", "Rings", "Bracelets", "Brooches"],
          },
          {
            items: ["Charms", "Anklets", "Cuffs", "Chokers", "Body Jewellery"],
          },
        ],
      },
      {
        id: "watches",
        name: "Watches",
        icon: Watch,
        categories: [
          {
            items: [
              "Smartwatches",
              "Luxury Watches",
              "Chronographs",
              "Minimalist",
              "Vintage Styles",
            ],
          },
          {
            items: [
              "Leather Strap",
              "Metal Strap",
              "Sport Watches",
              "Automatic",
              "Digital Watches",
            ],
          },
        ],
      },
    ],
  },
  Children: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "kidsClothing",
        name: "Clothing",
        defaultActive: true,
        icon: Shirt,
        categories: [
          {
            items: ["Tops", "Bottoms", "Dresses", "Outerwear", "Sleepwear"],
          },
          {
            items: [
              "Sets & Bundles",
              "Activewear",
              "Swimwear",
              "Rainwear",
              "Special Occasion",
            ],
          },
        ],
      },
      {
        id: "kidsAccessories",
        name: "Shoes & Accessories",
        icon: Footprints,
        categories: [
          {
            items: ["Sneakers", "Sandals", "Boots", "School Shoes", "Slippers"],
          },
          {
            items: ["Hats", "Backpacks", "Gloves", "Scarves", "Toys & Gifts"],
          },
        ],
      },
    ],
  },
  ExpressDelivery: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "expressProducts",
        name: "Fast Delivery",
        defaultActive: true,
        icon: Sparkles,
        categories: [
          {
            items: ["Clothing", "Shoes", "Bags", "Accessories", "Beauty"],
          },
          {
            items: [
              "Watches",
              "Jewellery",
              "Grooming",
              "Kidswear",
              "Gift Items",
            ],
          },
        ],
      },
      {
        id: "deliveryRegions",
        name: "By Region",
        icon: LandPlot,
        categories: [
          {
            items: [
              "US Express",
              "EU Express",
              "UK Express",
              "Asia Express",
              "Global Fast",
            ],
          },
          {
            items: [
              "Same Day",
              "Next Day",
              "2-Day Delivery",
              "Weekend Delivery",
              "Holiday Express",
            ],
          },
        ],
      },
    ],
  },
  DirectShipping: {
    subcategories: [
      {
        id: "all",
        name: "All",
        icon: Grid3X3,
        categories: [],
      },
      {
        id: "shippingSource",
        name: "Ships From",
        defaultActive: true,
        icon: Gem,
        categories: [
          {
            items: [
              "From Brand",
              "From Partner",
              "From Warehouse",
              "Local Dispatch",
              "Direct Import",
            ],
          },
          {
            items: [
              "Designer Store",
              "Outlet",
              "Marketplace Vendor",
              "Fulfilled by Us",
              "Fulfilled by Seller",
            ],
          },
        ],
      },
      {
        id: "shippingBenefits",
        name: "Shipping Perks",
        icon: Telescope,
        categories: [
          {
            items: [
              "Duty-Free",
              "Tracked",
              "Fast Dispatch",
              "Free Shipping",
              "Easy Returns",
            ],
          },
          {
            items: [
              "No Customs Fees",
              "Eco Packaging",
              "Multiple Warehouses",
              "Express Available",
              "Local Returns",
            ],
          },
        ],
      },
    ],
  },
};
