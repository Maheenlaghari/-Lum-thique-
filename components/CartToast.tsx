"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { Check, ShoppingBag } from "lucide-react";

export default function CartToast() {
  const { toastMessage, openCart } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200 border border-white/10">
      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
      </div>
      <span className="font-medium">{toastMessage}</span>
      <button
        onClick={openCart}
        className="ml-2 pl-3 border-l border-white/20 text-[11px] font-semibold text-[#eb865a] hover:text-white uppercase tracking-wider flex items-center gap-1 cursor-pointer"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        View Bag
      </button>
    </div>
  );
}
