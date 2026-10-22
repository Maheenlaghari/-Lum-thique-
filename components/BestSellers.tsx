"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BestSellersData, BestSellerProduct } from "../types/site";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

interface BestSellersProps {
  data: BestSellersData;
  onAddToCart?: (productName: string, price: string) => void;
}

export default function BestSellers({ data, onAddToCart }: BestSellersProps) {
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});
  const { addItem } = useCart();

  const handleToggle = (e: React.MouseEvent, product: BestSellerProduct) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedItems((prev) => ({
      ...prev,
      [product.id]: !prev[product.id]
    }));

    const numPrice = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 17.99;
    addItem({
      productId: product.id,
      slug: product.slug || product.id,
      name: product.name,
      price: numPrice,
      priceFormatted: product.price,
      image: product.image
    });

    onAddToCart?.(product.name, product.price);
  };

  const renderCard = (product: BestSellerProduct, className: string = "") => {
    const isSaved = !!savedItems[product.id];
    const productHref = `/product/${product.slug || product.id}`;

    return (
      <Link
        key={product.id}
        href={productHref}
        className={`group flex flex-col cursor-pointer ${product.bgClass} ${className}`}
      >
        <div className="relative aspect-[232/265] w-full overflow-hidden">
          <button
            onClick={(e) => handleToggle(e, product)}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white flex items-center justify-center text-neutral-800 hover:scale-105 transition-all cursor-pointer"
            aria-label={`Add ${product.name} to bag`}
          >
            {isSaved ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
            )}
          </button>

          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Divider + label inside the card */}
        <div className="mx-2 border-t border-black/10 flex items-center justify-between py-2.5 px-0.5 text-neutral-900">
          <span className="text-xs font-normal tracking-tight">{product.name}</span>
          <span className="text-xs font-normal">{product.price}</span>
        </div>
      </Link>
    );
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6 lg:gap-y-0 items-end">
        {/* Row 1: heading (cols 3-4, right aligned) */}
        <div className="col-span-2 lg:col-start-3 lg:row-start-1 flex flex-col justify-center text-left lg:text-right lg:self-center order-first lg:order-none">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 leading-[0.95] whitespace-pre-line">
            {data.heading}
          </h2>
        </div>

        {/* Row 1: top card in col 2 */}
        {renderCard(data.topProduct, "col-span-1 lg:col-start-2 lg:row-start-1")}

        {/* Row 2: cards in cols 1, 3, 4 */}
        {data.bottomProducts.map((prod, i) =>
          renderCard(
            prod,
            `col-span-1 lg:row-start-2 ${
              ["lg:col-start-1", "lg:col-start-3", "lg:col-start-4"][i] ?? ""
            }`
          )
        )}
      </div>
    </section>
  );
}
