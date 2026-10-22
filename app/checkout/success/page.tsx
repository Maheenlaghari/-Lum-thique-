"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  ShieldCheck,
  Mail,
  Home
} from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "LUM-948210";

  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-20 px-4 sm:px-6">
      {/* Celebration Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2]" />
        </div>
        <span className="text-xs font-semibold tracking-widest uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          Payment & Order Confirmed
        </span>
        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-950 mt-4 mb-3">
          Thank you for choosing Luméthique
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 font-light max-w-lg mx-auto leading-relaxed">
          Your botanical formulations have entered preparation in our climate-controlled laboratory.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#ecece8] shadow-sm mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#ecece8] gap-4">
          <div>
            <span className="text-xs text-neutral-400 block font-light">Order Reference</span>
            <span className="text-xl sm:text-2xl font-mono font-semibold text-neutral-950">
              {orderId}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500 bg-[#f4f7f6] px-4 py-2 rounded-xl">
            <Mail className="w-4 h-4 text-neutral-700" />
            <span>Confirmation dispatched to your email</span>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 flex-shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-neutral-950 block">
                Estimated Delivery
              </span>
              <span className="text-xs text-neutral-600 font-light block mt-0.5">
                3–5 business days via Carbon-Neutral Courier
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-neutral-950 block">
                Guarantee & Support
              </span>
              <span className="text-xs text-neutral-600 font-light block mt-0.5">
                30-day barrier satisfaction promise with complimentary returns
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Notice & Guarantee */}
        <div className="bg-[#f4f7f6] border border-[#ecece8] rounded-2xl p-5 mt-4 flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-neutral-900">
              Complimentary White-Glove Packaging
            </h3>
            <p className="text-xs text-neutral-600 font-light mt-0.5">
              Each bottle is hand-inspected, wrapped in recyclable linen paper, and sealed with our botanic seal.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900 text-white hover:bg-[#eb865a] text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>

        <Link
          href="/shop"
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-[#ecece8] text-neutral-800 hover:bg-neutral-100 text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
        >
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#fbfbf9] text-neutral-900">
      <header className="border-b border-[#ecece8] bg-[#fbfbf9] py-5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
              Luméthique
            </h1>
          </Link>
          <span className="text-xs text-neutral-500 font-light">Order Confirmation</span>
        </div>
      </header>

      <Suspense fallback={<div className="p-12 text-center text-sm">Loading order receipt...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
