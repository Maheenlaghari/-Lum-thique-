"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check
} from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totals,
    appliedPromo,
    applyPromo,
    removePromo
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isSubmittingPromo, setIsSubmittingPromo] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setIsSubmittingPromo(true);
    setPromoError(null);
    const result = applyPromo(promoInput);
    if (!result.success) {
      setPromoError(result.message);
    } else {
      setPromoInput("");
    }
    setIsSubmittingPromo(false);
  };

  const handleProceedToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbfbf9] text-neutral-900 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#ecece8] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="text-base sm:text-lg font-medium tracking-tight text-neutral-950">
                Shopping Bag
              </h2>
              <span className="text-xs bg-neutral-900 text-white rounded-full px-2 py-0.5 font-mono">
                {totals.itemCount}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-neutral-200/60 text-neutral-500 hover:text-black transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#f4f4ef] px-6 py-3 border-b border-[#ecece8]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              {totals.freeShippingQualified ? (
                <span className="text-emerald-700 flex items-center gap-1.5 font-semibold">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  Complimentary Express Delivery unlocked!
                </span>
              ) : (
                <span className="text-neutral-700">
                  Add <strong className="text-neutral-950">${totals.freeShippingRemaining.toFixed(2)}</strong> for Free Delivery
                </span>
              )}
              <span className="text-[11px] text-neutral-500 font-mono">
                {totals.freeShippingProgress}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  totals.freeShippingQualified ? "bg-emerald-600" : "bg-[#eb865a]"
                }`}
                style={{ width: `${totals.freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#ecece8]">
            {items.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-medium text-neutral-900 mb-1">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mb-6">
                  Discover our pure botanical lipid serums and barrier restorative essentials.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="px-6 py-3 rounded-xl bg-neutral-900 text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#eb865a] transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const itemTotal = (item.price * item.quantity).toFixed(2);

                return (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    {/* Thumbnail Image */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#f4f4ee] border border-[#ecece8] flex-shrink-0 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain p-2"
                      />
                    </div>

                    {/* Details & Controls */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={item.slug ? `/product/${item.slug}` : "/shop"}
                            onClick={closeCart}
                            className="text-sm font-medium text-neutral-950 hover:text-neutral-700 transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>

                          <span className="text-[11px] text-neutral-500 block mt-0.5">
                            {item.priceFormatted}
                          </span>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Stepper & Price Row */}
                      <div className="flex items-center justify-between mt-3 pt-2">
                        {/* Stepper under item */}
                        <div className="flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-neutral-900 select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <div className="text-sm font-semibold text-neutral-950">
                            ${itemTotal}
                          </div>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-neutral-500 font-light block">
                              ${item.price.toFixed(2)} each
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Order Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#ecece8] shadow-lg">
              {/* Promo Code Input */}
              <div className="mb-4">
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs text-emerald-800">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      Promo applied: <strong>{appliedPromo}</strong>
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-xs text-neutral-500 hover:text-black underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. LUMINA10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 rounded-xl border border-neutral-200 bg-[#fbfbf9] focus:outline-none focus:ring-1 focus:ring-neutral-900 uppercase placeholder:normal-case font-mono"
                    />
                    <button
                      type="submit"
                      disabled={isSubmittingPromo || !promoInput.trim()}
                      className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-neutral-100 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>
                )}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 border-b border-[#ecece8] pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">{totals.subtotalFormatted}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-semibold">{totals.discountFormatted}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-neutral-900">{totals.shippingFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-neutral-900">{totals.taxFormatted}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#ecece8] text-sm font-semibold text-neutral-950">
                  <span>Total</span>
                  <span className="text-base text-neutral-950">{totals.totalFormatted}</span>
                </div>
              </div>


              {/* Checkout CTA Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 rounded-xl bg-[#eb865a] hover:bg-[#de7544] text-white text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>PROCEED TO CHECKOUT • {totals.totalFormatted}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Trust Badges */}
              <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-neutral-400 font-light">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-neutral-500" /> 256-Bit SSL
                </span>
                <span>•</span>
                <span>30-Day Guarantee</span>
                <span>•</span>
                <span>Cruelty-Free</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
