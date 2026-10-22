export interface CartItem {
  id: string; // unique item key: `${productId}`
  productId: string;
  slug?: string;
  name: string;
  price: number; // numeric price in USD e.g. 38.00
  priceFormatted: string; // "$38.00"
  image: string;
  quantity: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  subtotalFormatted: string;
  discount: number;
  discountFormatted: string;
  shipping: number;
  shippingFormatted: string;
  tax: number;
  taxFormatted: string;
  total: number;
  totalFormatted: string;
  freeShippingQualified: boolean;
  freeShippingProgress: number; // 0 to 100
  freeShippingRemaining: number;
}
