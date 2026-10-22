import { NextRequest, NextResponse } from "next/server";
import { CheckoutPayload, CheckoutResponse } from "../../../../types/checkout";

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as CheckoutPayload;

    // 1. Validation
    if (!payload.items || payload.items.length === 0) {
      return NextResponse.json<CheckoutResponse>(
        {
          success: false,
          status: "failed",
          errorMessage: "Cannot process checkout: shopping bag is empty."
        },
        { status: 400 }
      );
    }

    if (!payload.customer?.email) {
      return NextResponse.json<CheckoutResponse>(
        {
          success: false,
          status: "failed",
          errorMessage: "Customer email address is required."
        },
        { status: 400 }
      );
    }

    if (!payload.shippingAddress?.addressLine1) {
      return NextResponse.json<CheckoutResponse>(
        {
          success: false,
          status: "failed",
          errorMessage: "Shipping address line is required."
        },
        { status: 400 }
      );
    }

    // 2. Generate Order Identifiers
    const orderNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `LUM-${orderNum}`;

    // Estimated delivery calculation (3-5 business days)
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 4);
    const estimatedDeliveryDate = estimatedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    // 3. Return backend-ready response
    // (Here you can seamlessly connect Stripe PaymentIntent, PayPal, Adyen, or Shopify Storefront API)
    const responseData: CheckoutResponse = {
      success: true,
      orderId: orderId,
      orderNumber: orderId,
      status: "confirmed",
      receiptUrl: `/checkout/success?orderId=${orderId}`,
      estimatedDeliveryDate: estimatedDeliveryDate,
      totalCharged: payload.totalAmount,
      totalChargedFormatted: `$${payload.totalAmount.toFixed(2)}`
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json<CheckoutResponse>(
      {
        success: false,
        status: "failed",
        errorMessage:
          error instanceof Error
            ? error.message
            : "An unexpected server error occurred during checkout processing."
      },
      { status: 500 }
    );
  }
}
