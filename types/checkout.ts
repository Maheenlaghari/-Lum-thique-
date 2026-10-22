import { CartItem } from "./cart";

export interface CustomerInfo {
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  marketingConsent?: boolean;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  estimatedDelivery: string;
  price: number;
  priceFormatted: string;
}

export interface PaymentDetails {
  method: "card" | "apple_pay" | "google_pay";
  cardholderName?: string;
  cardNumberMasked?: string;
  cardExpiry?: string;
  cardBrand?: string;
  // If integrating with Stripe/Adyen, client would pass clientSecret or paymentMethodId:
  paymentMethodId?: string;
  billingSameAsShipping?: boolean;
  billingAddress?: ShippingAddress;
}

export interface CheckoutPayload {
  items: CartItem[];
  customer: CustomerInfo;
  shippingAddress: ShippingAddress;
  shippingOption: ShippingOption;
  payment: PaymentDetails;
  promoCode?: string;
  discountAmount?: number;
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
}

export interface CheckoutResponse {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  status: "confirmed" | "pending_payment" | "failed";
  receiptUrl?: string;
  estimatedDeliveryDate?: string;
  totalCharged?: number;
  totalChargedFormatted?: string;
  errorMessage?: string;
}
