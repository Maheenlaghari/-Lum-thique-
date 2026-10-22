"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import {
  Lock,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Truck,
  Sparkles,
  Tag
} from "lucide-react";
import { CheckoutPayload, CheckoutResponse } from "../../types/checkout";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totals, clearCart, appliedPromo, applyPromo, removePromo } = useCart();

  // Customer Contact State
  const [email, setEmail] = useState("client@lumethique.com");
  const [phone, setPhone] = useState("+1 (555) 019-2834");
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  // Shipping Address State
  const [firstName, setFirstName] = useState("Elena");
  const [lastName, setLastName] = useState("Rostova");
  const [addressLine1, setAddressLine1] = useState("742 Evergreen Terrace");
  const [addressLine2, setAddressLine2] = useState("Suite 4B");
  const [city, setCity] = useState("New York");
  const [state, setState] = useState("NY");
  const [postalCode, setPostalCode] = useState("10021");
  const [country, setCountry] = useState("United States");

  // Shipping Method
  const [shippingMethodId, setShippingMethodId] = useState<"standard" | "express">("standard");

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple_pay">("card");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("889");
  const [cardName, setCardName] = useState("Elena Rostova");
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Compute final shipping cost based on selected method
  const shippingCost =
    shippingMethodId === "express"
      ? 15.0
      : totals.freeShippingQualified
      ? 0
      : 8.5;
  const finalTotal = Math.max(0, totals.subtotal - totals.discount + shippingCost + totals.tax);

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setPromoError(null);
    const result = applyPromo(promoInput);
    if (!result.success) {
      setPromoError(result.message);
    } else {
      setPromoInput("");
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage("Your bag is empty. Please add items before checking out.");
      return;
    }

    if (!email || !firstName || !lastName || !addressLine1 || !city || !postalCode) {
      setErrorMessage("Please complete all required contact and shipping fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: CheckoutPayload = {
        items,
        customer: {
          email,
          phone,
          firstName,
          lastName,
          marketingConsent: marketingOptIn
        },
        shippingAddress: {
          firstName,
          lastName,
          addressLine1,
          addressLine2,
          city,
          state,
          postalCode,
          country
        },
        shippingOption: {
          id: shippingMethodId,
          name:
            shippingMethodId === "express"
              ? "Priority White-Glove Courier"
              : "Standard Complimentary Delivery",
          estimatedDelivery: shippingMethodId === "express" ? "1-2 Business Days" : "3-5 Business Days",
          price: shippingCost,
          priceFormatted: shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`
        },
        payment: {
          method: paymentMethod,
          cardholderName: cardName,
          cardNumberMasked: cardNumber,
          cardExpiry,
          cardBrand: "Visa",
          billingSameAsShipping
        },
        promoCode: appliedPromo || undefined,
        discountAmount: totals.discount,
        subtotal: totals.subtotal,
        shippingCost: shippingCost,
        taxAmount: totals.tax,
        totalAmount: finalTotal,
        currency: "USD"
      };

      // Call Backend API
      const res = await fetch("/api/v1/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = (await res.json()) as CheckoutResponse;

      if (!res.ok || !data.success) {
        throw new Error(data.errorMessage || "Order checkout encountered an error.");
      }

      // Order Succeeded: Clear client cart and navigate to order confirmation
      clearCart();
      router.push(`/checkout/success?orderId=${data.orderId || "LUM-CONFIRMED"}`);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while placing your order. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-neutral-900">
      {/* Minimal Luxury Checkout Header */}
      <header className="border-b border-[#ecece8] bg-[#fbfbf9] py-5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Store</span>
          </Link>

          <Link href="/">
            <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
              Luméthique
            </h1>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">256-Bit SSL Encrypted</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-14">
        {items.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-20 bg-white p-8 rounded-3xl border border-[#ecece8] shadow-sm">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto mb-4">
              <Truck className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-xl font-normal tracking-tight text-neutral-950 mb-2">
              Your bag is currently empty
            </h2>
            <p className="text-xs text-neutral-500 mb-6">
              Add our botanical serums to your bag before proceeding to checkout.
            </p>
            <Link
              href="/shop"
              className="px-6 py-3.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#eb865a] transition-colors inline-block"
            >
              Explore Formulations
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Checkout Inputs Form */}
            <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-8">
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="font-semibold block mb-0.5">Checkout Notice</strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* 1. Contact Information */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ecece8] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-medium text-neutral-950">
                    1. Contact Information
                  </h2>
                  <span className="text-xs text-neutral-400 font-light">Step 1 of 4</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Email address for order confirmation & delivery updates *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Phone number (for shipment SMS tracking)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 text-xs text-neutral-600 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={marketingOptIn}
                      onChange={(e) => setMarketingOptIn(e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                    />
                    <span>Receive curated skincare journal notes and early formulation access</span>
                  </label>
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ecece8] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-medium text-neutral-950">
                    2. Shipping Address
                  </h2>
                  <span className="text-xs text-neutral-400 font-light">Step 2 of 4</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Country / Region *
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        First name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Last name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Street address *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="House number and street name"
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Apartment, suite, unit (optional)
                    </label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="Apartment, suite, unit, etc."
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        ZIP / Postal code *
                      </label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Shipping Method */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ecece8] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-medium text-neutral-950">
                    3. Delivery Method
                  </h2>
                  <span className="text-xs text-neutral-400 font-light">Step 3 of 4</span>
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setShippingMethodId("standard")}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      shippingMethodId === "standard"
                        ? "border-neutral-900 bg-white shadow-2xs"
                        : "border-[#ecece8] bg-[#fbfbf9] hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          shippingMethodId === "standard" ? "border-neutral-900" : "border-neutral-400"
                        }`}
                      >
                        {shippingMethodId === "standard" && (
                          <div className="w-2 h-2 rounded-full bg-neutral-900" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-medium text-neutral-950 block">
                          Standard Complimentary Delivery
                        </span>
                        <span className="text-[11px] text-neutral-500 font-light">
                          3-5 business days • Carbon neutral
                        </span>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900">
                      {totals.freeShippingQualified ? "FREE" : "$8.50"}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethodId("express")}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      shippingMethodId === "express"
                        ? "border-neutral-900 bg-white shadow-2xs"
                        : "border-[#ecece8] bg-[#fbfbf9] hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          shippingMethodId === "express" ? "border-neutral-900" : "border-neutral-400"
                        }`}
                      >
                        {shippingMethodId === "express" && (
                          <div className="w-2 h-2 rounded-full bg-neutral-900" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-medium text-neutral-950 block">
                          Priority White-Glove Courier
                        </span>
                        <span className="text-[11px] text-neutral-500 font-light">
                          1-2 business days • Temperature controlled
                        </span>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900">
                      $15.00
                    </span>
                  </label>
                </div>
              </div>

              {/* 4. Payment Details */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ecece8] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-medium text-neutral-950">
                    4. Secure Payment
                  </h2>
                  <span className="text-xs text-neutral-400 font-light">Step 4 of 4</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#f4f7f6] border border-neutral-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-4 h-4 text-neutral-800" />
                      <span className="text-xs font-semibold text-neutral-900">Credit / Debit Card</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-mono">
                      <span>VISA</span>
                      <span>MC</span>
                      <span>AMEX</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Card number *
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Expiry (MM/YY) *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Security code (CVC) *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Name on card *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2.5 text-xs text-neutral-600 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={billingSameAsShipping}
                      onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                    />
                    <span>Billing address is identical to shipping address</span>
                  </label>
                </div>
              </div>



              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 rounded-2xl bg-[#eb865a] hover:bg-[#de7544] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Secure Order...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>PLACE ORDER • ${finalTotal.toFixed(2)}</span>
                  </>
                )}
              </button>
            </form>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#ecece8] shadow-sm sticky top-8">
              <h2 className="text-base sm:text-lg font-medium text-neutral-950 mb-6 pb-4 border-b border-[#ecece8]">
                Order Summary ({totals.itemCount} items)
              </h2>

              {/* Items List */}
              <div className="divide-y divide-[#ecece8] max-h-[380px] overflow-y-auto pr-1 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#f4f4ee] border border-[#ecece8] flex-shrink-0 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-contain p-2"
                      />
                      <span className="absolute top-1 right-1 bg-neutral-900 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-mono">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm font-medium text-neutral-900 truncate">
                        {item.name}
                      </h3>
                      <span className="text-[11px] text-neutral-500 block">
                        {item.priceFormatted}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-neutral-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="mb-6 pt-2">
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2.5 text-xs text-emerald-800">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      Applied: <strong>{appliedPromo}</strong>
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-xs text-neutral-500 hover:text-black underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromoCode} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (LUMINA10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono uppercase placeholder:normal-case"
                    />
                    <button
                      type="submit"
                      disabled={!promoInput.trim()}
                      className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-neutral-900 hover:bg-[#eb865a] text-white transition-colors cursor-pointer disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>
                )}
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-2 text-xs text-neutral-600 border-t border-[#ecece8] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">{totals.subtotalFormatted}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Promotional Discount</span>
                    <span>{totals.discountFormatted}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-neutral-900">
                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-neutral-900">{totals.taxFormatted}</span>
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-[#ecece8] text-base font-semibold text-neutral-950">
                  <span>Total Due</span>
                  <span className="text-xl text-neutral-950 font-bold">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Reassurance Features */}
              <div className="mt-8 pt-6 border-t border-[#ecece8] space-y-3 text-xs text-neutral-500 font-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-800 flex-shrink-0" />
                  <span>30-Day Barrier Restoration Satisfaction Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-neutral-800 flex-shrink-0" />
                  <span>Delivered in frosted recyclable glass with zero plastic waste</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
