"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SingleProductData } from "../types/site";
import { Star, Plus, Minus, Check } from "lucide-react";

import { useCart } from "../context/CartContext";

interface ProductDetailProps {
  data: SingleProductData;
  onAddToCart?: (productName: string, price: string) => void;
}

export default function ProductDetail({ data, onAddToCart }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState<string>(data.mainImage);
  const [openAccordion, setOpenAccordion] = useState<string>("desc");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? "" : id);
  };

  const handleAdd = () => {
    const numPrice = parseFloat(data.oneTimePrice.replace(/[^0-9.]/g, "")) || 38.0;

    addItem({
      productId: data.id,
      slug: data.id,
      name: data.name,
      price: numPrice,
      priceFormatted: data.oneTimePrice,
      image: selectedImage || data.mainImage || "/assets/product_1_nobg.png"
    });

    onAddToCart?.(data.name, data.oneTimePrice);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
          <div className="flex items-center gap-2 sm:gap-3">
            {data.thumbnails.map((thumb, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(thumb)}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 overflow-hidden border transition-all cursor-pointer bg-[#f6f6f2] ${
                  selectedImage === thumb
                    ? "border-neutral-900 scale-105"
                    : "border-neutral-200 opacity-75 hover:opacity-100"
                }`}
                aria-label={`Select angle view ${idx + 1}`}
              >
                <Image
                  src={thumb}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <div className="divide-y divide-[#ecece8] border-y border-[#ecece8] mt-4">
            {data.accordions.map((tab) => {
              const isOpen = openAccordion === tab.id;
              return (
                <div key={tab.id} className="py-3.5">
                  <button
                    onClick={() => toggleAccordion(tab.id)}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-neutral-900 group cursor-pointer"
                  >
                    <span>{tab.title}</span>
                    <span className="text-neutral-500 group-hover:text-black">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-2.5 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                      {tab.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Large Product Bottle Floating */}
        <div className="lg:col-span-4 flex items-center justify-center order-1 lg:order-2 min-h-[360px] sm:min-h-[460px]">
          <div className="relative w-full aspect-[3/4] max-w-[280px] sm:max-w-xs">
            <Image
              src={selectedImage}
              alt={data.name}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
              priority
            />
          </div>
        </div>

        {/* Right: Title, Rating, Summary, Bullets, Purchase Box, and ADD TO CART */}
        <div className="lg:col-span-4 flex flex-col gap-4 order-3">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950">
              {data.name}
            </h2>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-[#facc15]">
                {[...Array(data.ratingScore)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-current stroke-current"
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-500 font-medium">
                {data.reviewsCountText}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
            {data.summary}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-700 font-medium my-1">
            {data.bulletPoints.map((point, index) => (
              <span key={index} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900"></span>
                {point}
              </span>
            ))}
          </div>

          {/* Clean One-Time Purchase Radio Box */}
          <div className="border border-neutral-200 rounded-lg p-3.5 my-2 bg-white shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full border-2 border-neutral-900 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-neutral-900"></span>
                </span>
                <span className="text-xs sm:text-sm font-medium text-neutral-900">
                  One-time purchase
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-neutral-950">
                {data.oneTimePrice}
              </span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full mt-2 py-4 rounded-md bg-[#e84a27] hover:bg-[#d63d1c] text-white text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
          >
            {added ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <span>ADD TO CART</span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
