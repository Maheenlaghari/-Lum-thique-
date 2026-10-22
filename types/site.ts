export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderData {
  brandName: string;
  links: NavLink[];
  subtitleLeft: string;
  subtitleRight: string;
}

export interface HeroCardItem {
  id: string;
  title: string;
  image: string;
  topBadge?: string;
  windowBadge?: string;
  hasWindowDots?: boolean;
  typeLabel: string;
  idealForLabel: string;
}

export interface ProductSummary {
  id: string;
  name: string;
  price: string;
  collection: string;
  image: string;
  slug?: string;
}

export interface NatureSectionData {
  heading: string;
  description: string;
  detailImage: string;
  lifestyleImage: string;
}

export interface BestSellerProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  bgClass: string;
  slug?: string;
}

export interface BestSellersData {
  heading: string;
  topProduct: BestSellerProduct;
  bottomProducts: BestSellerProduct[];
}

export interface EditorialItem {
  id: string;
  image: string;
  caption?: string;
}

export interface EditorialSectionData {
  title: string;
  description: string;
  guideNote: string;
  largeImage: string;
  topSecondaryImage: string;
  topSecondaryCaption: string;
  bottomSquareImage: string;
  bottomWideImageLeft: string;
  bottomWideImage: string;
}

export interface MetadataPill {
  label: string;
  value: string;
}

export interface SkincareTipsData {
  heading: string;
  instagramHandle: string;
  instagramUrl: string;
  portraitImage: string;
  productImage: string;
  pills: MetadataPill[];
  leftBlurb: string;
  rightBlurb: string;
}

export interface AccordionTab {
  id: string;
  title: string;
  content: string;
}

export interface SingleProductData {
  id: string;
  name: string;
  ratingScore: number;
  reviewsCountText: string;
  summary: string;
  bulletPoints: string[];
  mainImage: string;
  thumbnails: string[];
  oneTimePrice: string;
  accordions: AccordionTab[];
}

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  price: string;
  category: string;
  image: string;
  bgClass: string;
  ratingScore: number;
  reviewsCountText: string;
  tagline: string;
  summary: string;
  bulletPoints: string[];
  thumbnails: string[];
  oneTimePrice: string;
  accordions: AccordionTab[];
}

export interface BannerData {
  image: string;
  altText: string;
}

export interface FooterColumn {
  title: string;
  items: string[];
}

export interface FooterData {
  missionStatement: string;
  columns: FooterColumn[];
  ecoNotice: string;
  brandName: string;
}

export interface SiteContent {
  header: HeaderData;
  heroCards: HeroCardItem[];
  carouselProducts: ProductSummary[];
  natureSection: NatureSectionData;
  bestSellers: BestSellersData;
  editorial: EditorialSectionData;
  skincareTips: SkincareTipsData;
  singleProduct: SingleProductData;
  allProducts: CatalogProduct[];
  banner: BannerData;
  footer: FooterData;
}
