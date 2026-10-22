"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { CatalogProduct, HeaderData, FooterData } from "../../../types/site";
import { Star, Plus, Minus, Check, ArrowRight } from "lucide-react";
import { useCart } from "../../../context/CartContext";

interface ProductViewClientProps {
  product: CatalogProduct;
  relatedProducts: CatalogProduct[];
  headerData: HeaderData;
  footerData: FooterData;
}

export default function ProductViewClient({
  product,
  relatedProducts,
  headerData,
  footerData
}: ProductViewClientProps) {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [openAccordion, setOpenAccordion] = useState<string>("desc");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? "" : id);
  };

  const handleAdd = () => {
    const numPrice = parseFloat(product.oneTimePrice.replace(/[^0-9.]/g, "")) || 38.0;

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: numPrice,
      priceFormatted: product.oneTimePrice,
      image: selectedImage || product.image
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header data={headerData} />

        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-8 sm:mb-12 font-medium">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-black transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
              <div className="flex items-center gap-3">
                {product.thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(thumb)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#f6f6f2] ${
                      selectedImage === thumb
                        ? "border-neutral-900 scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"
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
                {product.accordions.map((tab) => {
                  const isOpen = openAccordion === tab.id;
                  return (
                    <div key={tab.id} className="py-4">
                      <button
                        onClick={() => toggleAccordion(tab.id)}
                        className="w-full flex items-center justify-between text-left text-sm font-semibold text-neutral-900 group cursor-pointer"
                      >
                        <span>{tab.title}</span>
                        <span className="text-neutral-500 group-hover:text-black">
                          {isOpen ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                          {tab.content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center order-1 lg:order-2 bg-[#f4f7f6]/50 rounded-3xl p-6 min-h-[360px] sm:min-h-[460px]">
              <div className="relative w-full aspect-[3/4] max-w-xs">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  priority
                />
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-5 order-3">
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                  {product.category}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 mt-1">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-[#facc15]">
                    {[...Array(product.ratingScore)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current stroke-current"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">
                    {product.reviewsCountText}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                {product.summary}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-700 font-medium">
                {product.bulletPoints.map((point, index) => (
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
                    {product.oneTimePrice}
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

          <section className="mt-20 pt-16 border-t border-[#ecece8]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                  Recommended Pairings
                </span>
                <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950 mt-1">
                  Complete Your Routine
                </h3>
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex items-center gap-1 text-xs font-semibold text-neutral-800 hover:text-black transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((rel) => (
                <Link
                  key={rel.id}
                  href={`/product/${rel.slug}`}
                  className="group bg-white rounded-2xl p-5 border border-[#ecece8] shadow-2xs hover:shadow-md transition-all duration-300"
                >
                  <div
                    className={`relative w-full aspect-square rounded-xl overflow-hidden ${rel.bgClass} flex items-center justify-center mb-4`}
                  >
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      sizes="220px"
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-neutral-950 truncate group-hover:text-neutral-700 transition-colors">
                    {rel.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="text-neutral-500 font-light">{rel.category}</span>
                    <span className="font-semibold text-neutral-900">{rel.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer data={footerData} />
    </div>
  );
}
