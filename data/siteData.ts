import { SiteContent } from "../types/site";

export const siteData: SiteContent = {
  header: {
    brandName: "Luméthique",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Shop", href: "/shop" },
      { label: "Contact", href: "/contact" }
    ],
    subtitleLeft: "In-depth reviews of popular skincare products.",
    subtitleRight: "Including pros, cons, and personal experiences."
  },
  heroCards: [
    {
      id: "facile_skincare",
      title: "Facile Skincare",
      image: "/assets/hero_left_cutout.png",
      topBadge: "Facile Skincare",
      typeLabel: "Cleanses",
      idealForLabel: "Female"
    },
    {
      id: "glow_haven",
      title: "Glow Haven Skincare",
      image: "/assets/hero-right.png",
      windowBadge: "Glow Haven",
      hasWindowDots: true,
      typeLabel: "Cleanses",
      idealForLabel: "Female"
    }
  ],
  carouselProducts: [
    {
      id: "acne_serum_marquee",
      name: "Acne Serum",
      price: "$38.00",
      collection: "fruity collection",
      image: "/assets/product_1_nobg.png",
      slug: "acne_serum"
    },
    {
      id: "anti_aging_marquee",
      name: "Anti-Aging Serum",
      price: "$44.99",
      collection: "fruity collection",
      image: "/assets/product_2_nobg.png",
      slug: "anti_aging_serum"
    },
    {
      id: "pigment_serum_marquee",
      name: "Pigment Serum",
      price: "$18.99",
      collection: "fruity collection",
      image: "/assets/product_3_nobg.png",
      slug: "pigment_serum"
    },
    {
      id: "hyaluronic_serum_marquee",
      name: "Hyaluronic Acid Serum",
      price: "$38.00",
      collection: "fruity collection",
      image: "/assets/product_4_nobg.png",
      slug: "hyaluronic_serum"
    }
  ],
  natureSection: {
    heading: "Inspired by\nNature Driven by Results",
    description: "At Glow Haven, we believe that glowing skin is more than just a beauty standard - it's a reflection of self-care, confidence, and well-being. Our mission is to offer skincare solutions that nourish your skin with the purest ingredients.",
    detailImage: "/assets/sect-3-1.png",
    lifestyleImage: "/assets/sec-3-2.png"
  },
  bestSellers: {
    heading: "Shop Our\nBest-Sellers",
    topProduct: {
      id: "best_seller_top",
      name: "Anti-Aging Serum",
      price: "$17.99",
      image: "/assets/product_5_nobg.png",
      bgClass: "bg-[#ece6f7]",
      slug: "anti_aging_serum"
    },
    bottomProducts: [
      {
        id: "best_seller_acne",
        name: "Acne Serum",
        price: "$17.99",
        image: "/assets/product_2_nobg.png",
        bgClass: "bg-[#e4f3f5]",
        slug: "acne_serum"
      },
      {
        id: "best_seller_pigment",
        name: "Pigment Serum",
        price: "$17.99",
        image: "/assets/product_3_nobg.png",
        bgClass: "bg-[#faebc3]",
        slug: "pigment_serum"
      },
      {
        id: "best_seller_hyaluronic",
        name: "Hyaluronic Acid Serum",
        price: "$17.99",
        image: "/assets/product_4_nobg.png",
        bgClass: "bg-[#fae3d9]",
        slug: "hyaluronic_serum"
      }
    ]
  },
  editorial: {
    title: "Skin Care 2024",
    description: "At Glow Haven, we believe that glowing skin is more than just a beauty standard - it's a reflection of self-care, confidence, and well-being. Our mission is to offer skincare solutions that nourish your skin with the purest ingredients.",
    guideNote: "Guides for different skin types (oily, dry, combination) and routines for morning and night.",
    largeImage: "/assets/sec-5-1.png",
    topSecondaryImage: "/assets/sec-5-3.png",
    topSecondaryCaption: "In-depth reviews of popular skincare products, including pros, cons, and personal experiences",
    bottomSquareImage: "/assets/sec-5-2.png",
    bottomWideImageLeft: "/assets/sec-6-1.png",
    bottomWideImage: "/assets/product-4.png"
  },
  skincareTips: {
    heading: "Seasonal\nSkincare Tips",
    instagramHandle: "@glow_haven",
    instagramUrl: "https://instagram.com/glow_haven",
    portraitImage: "/assets/hero-right.png",
    productImage: "/assets/product_3_nobg.png",
    pills: [
      { label: "Type", value: "Barrier Relief" },
      { label: "Age", value: "27" },
      { label: "Type", value: "Cleanses" },
      { label: "Ideal For", value: "Female" }
    ],
    leftBlurb: "Dive into our in-depth reviews of the latest skincare products. From serums to moisturizers",
    rightBlurb: "we breakdown the benefits, ingredients, and how they fit into your routine."
  },
  singleProduct: {
    id: "calming_serum",
    name: "Calming Serum",
    ratingScore: 5,
    reviewsCountText: "(2.5K Reviews)",
    summary: "Like a chill pill for stressed skin. Our concentrated blend of barrier repairing lipids helps skin stay nourished and prepared for anything.",
    bulletPoints: ["Smoothing", "Hydrating", "Renewing"],
    mainImage: "/assets/product_2_nobg.png",
    thumbnails: [
      "/assets/product_1_extra.png",
      "/assets/product_2_nobg.png",
      "/assets/product_1_nobg.png",
      "/assets/product_4_nobg.png"
    ],
    oneTimePrice: "$54.00",
    accordions: [
      {
        id: "desc",
        title: "Description",
        content: "Like a chill pill for stressed skin. Our concentrated blend of barrier repairing lipids helps skin stay nourished and prepared for anything. Phytosphingosine, known for kicking off bad for you bacteria, reduces inflammation and redness."
      },
      {
        id: "benefits",
        title: "Benefits",
        content: "Provides deep hydration, reinforces the natural skin barrier, and calms visible irritation. Suitable for reactive and acne prone skin types."
      },
      {
        id: "usage",
        title: "How to use",
        content: "Apply three to four drops morning and evening directly to clean skin before heavier moisturizers. Gently press until fully absorbed."
      },
      {
        id: "ingredients",
        title: "Key ingredients",
        content: "Phytosphingosine, Barrier Repairing Ceramides, Squalane, Hyaluronic Complex, and Botanical Calming Extracts."
      }
    ]
  },
  allProducts: [
    {
      id: "calming_serum",
      slug: "calming_serum",
      name: "Calming Serum",
      price: "$54.00",
      category: "Serums",
      image: "/assets/product_2_nobg.png",
      bgClass: "bg-[#e1f1f5]",
      ratingScore: 5,
      reviewsCountText: "(2.5K Reviews)",
      tagline: "Barrier repair concentrated soothing treatment",
      summary: "Like a chill pill for stressed skin. Our concentrated blend of barrier repairing lipids helps skin stay nourished and prepared for anything.",
      bulletPoints: ["Smoothing", "Hydrating", "Renewing"],
      thumbnails: [
        "/assets/product_1_extra.png",
        "/assets/product_2_nobg.png",
        "/assets/product_1_nobg.png",
        "/assets/product_4_nobg.png"
      ],
      oneTimePrice: "$54.00",
      accordions: [
        {
          id: "desc",
          title: "Description",
          content: "Like a chill pill for stressed skin. Our concentrated blend of barrier repairing lipids helps skin stay nourished and prepared for anything. Phytosphingosine, known for kicking off bad for you bacteria, reduces inflammation and redness."
        },
        {
          id: "benefits",
          title: "Benefits",
          content: "Provides deep hydration, reinforces the natural skin barrier, and calms visible irritation. Suitable for reactive and acne prone skin types."
        },
        {
          id: "usage",
          title: "How to use",
          content: "Apply three to four drops morning and evening directly to clean skin before heavier moisturizers. Gently press until fully absorbed."
        },
        {
          id: "ingredients",
          title: "Key ingredients",
          content: "Phytosphingosine, Barrier Repairing Ceramides, Squalane, Hyaluronic Complex, and Botanical Calming Extracts."
        }
      ]
    },
    {
      id: "anti_aging_serum",
      slug: "anti_aging_serum",
      name: "Anti Aging Serum",
      price: "$44.99",
      category: "Serums",
      image: "/assets/product_5_nobg.png",
      bgClass: "bg-[#ede7f6]",
      ratingScore: 5,
      reviewsCountText: "(1.8K Reviews)",
      tagline: "Firming peptide infusion for youthful elasticity",
      summary: "An ultra potent complex engineered to firm, smooth, and revitalise mature skin with essential bioactive botanicals.",
      bulletPoints: ["Firming", "Smoothing", "Radiance"],
      thumbnails: [
        "/assets/product_5_nobg.png",
        "/assets/product_2_nobg.png",
        "/assets/product_1_extra.png"
      ],
      oneTimePrice: "$44.99",
      accordions: [
        {
          id: "desc",
          title: "Description",
          content: "Stimulates structural renewal and improves resilience against environmental oxidative stress."
        },
        {
          id: "benefits",
          title: "Benefits",
          content: "Improves skin bounce, minimizes fine appearance, and delivers intense antioxidant support."
        },
        {
          id: "usage",
          title: "How to use",
          content: "Smooth gently across face and neck after cleansing and toning. Follow with hydrating cream."
        },
        {
          id: "ingredients",
          title: "Key ingredients",
          content: "Copper Peptides, Plant Stem Cells, Marine Collagen, and Resveratrol."
        }
      ]
    },
    {
      id: "acne_serum",
      slug: "acne_serum",
      name: "Acne Serum",
      price: "$38.00",
      category: "Treatments",
      image: "/assets/product_1_nobg.png",
      bgClass: "bg-[#ede7f6]",
      ratingScore: 5,
      reviewsCountText: "(3.1K Reviews)",
      tagline: "Gentle clarifying treatment for clear, calm pores",
      summary: "Non stripping salicylic and zinc formulation that unclogs congested pores while preserving the skin acid mantle.",
      bulletPoints: ["Clarifying", "Pore Refining", "Balancing"],
      thumbnails: [
        "/assets/product_1_nobg.png",
        "/assets/product_2_nobg.png",
        "/assets/product_1_extra.png"
      ],
      oneTimePrice: "$38.00",
      accordions: [
        {
          id: "desc",
          title: "Description",
          content: "Clears deep seated impurities without drying out the moisture matrix."
        },
        {
          id: "benefits",
          title: "Benefits",
          content: "Reduces blemishes, regulates sebum balance, and softens textured skin."
        },
        {
          id: "usage",
          title: "How to use",
          content: "Dispense two drops onto targeted breakout zones or sweep across entire face in the evening."
        },
        {
          id: "ingredients",
          title: "Key ingredients",
          content: "Salicylic Acid, Niacinamide, Zinc PCA, and Willow Bark Extract."
        }
      ]
    },
    {
      id: "pigment_serum",
      slug: "pigment_serum",
      name: "Pigment Serum",
      price: "$18.99",
      category: "Treatments",
      image: "/assets/product_3_nobg.png",
      bgClass: "bg-[#faebc3]",
      ratingScore: 5,
      reviewsCountText: "(1.4K Reviews)",
      tagline: "Brightening vitamin elixir for illuminated tone",
      summary: "Stabilized Vitamin C formula that fades discoloration and evens tone for luminous natural clarity.",
      bulletPoints: ["Brightening", "Even Tone", "Defense"],
      thumbnails: [
        "/assets/product_3_nobg.png",
        "/assets/product_2_nobg.png",
        "/assets/product_4_nobg.png"
      ],
      oneTimePrice: "$18.99",
      accordions: [
        {
          id: "desc",
          title: "Description",
          content: "Targets hyperpigmentation and sun spots while imparting a dewy glow."
        },
        {
          id: "benefits",
          title: "Benefits",
          content: "Fades dark marks, boosts collagen synthesis, and protects against photo damage."
        },
        {
          id: "usage",
          title: "How to use",
          content: "Apply each morning before sunscreen for optimal free radical neutralization."
        },
        {
          id: "ingredients",
          title: "Key ingredients",
          content: "Ethyl Ascorbic Acid, Ferulic Acid, Licorice Root, and Alpha Arbutin."
        }
      ]
    },
    {
      id: "hyaluronic_serum",
      slug: "hyaluronic_serum",
      name: "Hyaluronic Acid Serum",
      price: "$38.00",
      category: "Moisturizers",
      image: "/assets/product_4_nobg.png",
      bgClass: "bg-[#fbe6dd]",
      ratingScore: 5,
      reviewsCountText: "(2.9K Reviews)",
      tagline: "Multi molecular deep hydration serum",
      summary: "Penetrates multiple dermal layers to bind water molecules and plump dehydrated skin visibly.",
      bulletPoints: ["Plumping", "Moisture Lock", "Smoothing"],
      thumbnails: [
        "/assets/product_4_nobg.png",
        "/assets/product_2_nobg.png",
        "/assets/product_1_extra.png"
      ],
      oneTimePrice: "$38.00",
      accordions: [
        {
          id: "desc",
          title: "Description",
          content: "Combines five molecular weights of hyaluronic acid to maximize surface and deep dermal hydration."
        },
        {
          id: "benefits",
          title: "Benefits",
          content: "Restores elasticity, plumps fine creases, and prevents trans epidermal water loss."
        },
        {
          id: "usage",
          title: "How to use",
          content: "Apply to damp skin immediately after misting or washing to lock in hydration."
        },
        {
          id: "ingredients",
          title: "Key ingredients",
          content: "Five Molecular Hyaluronic Complex, Snow Mushroom, Glycerin, and Panthenol."
        }
      ]
    }
  ],
  banner: {
    image: "/assets/sec-8-main.png",
    altText: "Luméthique Luxury Skincare Glow"
  },
  footer: {
    missionStatement: "Don't let misinformation steer you wrong. We separate fact from fiction to help you understand what really works for your skin.",
    columns: [
      {
        title: "About Us",
        items: ["Home", "Shop", "About us", "Journal", "Careers"]
      },
      {
        title: "Social Media",
        items: ["Facebook", "Twitter", "LinkedIn", "Instagram", "Threads"]
      },
      {
        title: "BOUTIQUE",
        items: ["Providers", "First Timers", "Careers", "Recycle"]
      },
      {
        title: "Information",
        items: ["About us", "Retailers", "Wholesale", "Faq", "Contact"]
      },
      {
        title: "Quick Link",
        items: ["Terms of Service", "Privacy Policy", "Shipping + Returns", "Cookie Preferences", "Student Discount"]
      },
      {
        title: "Contact Info",
        items: ["Australian Capital Territory", "Australia 2601", "contact@egrounde.co", "(812) 527 0320"]
      }
    ],
    ecoNotice: "Tips for eco friendly skincare",
    brandName: "Luméthique"
  }
};
