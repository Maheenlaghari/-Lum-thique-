"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { siteData } from "../../data/siteData";
import { CatalogProduct } from "../../types/site";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { addItem } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const categories = ["All", "Serums", "Treatments", "Moisturizers"];

  const filteredProducts =
    selectedCategory === "All"
      ? siteData.allProducts
      : siteData.allProducts.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: CatalogProduct) => {
    const numPrice = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 38.0;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: numPrice,
      priceFormatted: product.price,
      image: product.image
    });
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedItems((prev) => ({ ...prev, [product.id]: false })), 1500);
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header data={siteData.header} />

        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="mb-10 text-center sm:text-left border-b border-[#ecece8] pb-8">
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
              Complete Collection
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-neutral-950 mt-2">
              Shop All Formulations
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-light mt-3 max-w-2xl">
              Targeted clinical solutions powered by botanical lipids, bioactive vitamins, and essential barrier nutrients.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "bg-white text-neutral-700 hover:bg-neutral-100 border border-[#ecece8]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
            {filteredProducts.map((product) => {
              const productHref = `/product/${product.slug}`;
              const isAdded = !!addedItems[product.id];

              return (
                <Link
                  key={product.id}
                  href={productHref}
                  className="group flex flex-col cursor-pointer bg-white"
                >
                  <div className="relative aspect-[232/265] w-full overflow-hidden">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white flex items-center justify-center text-neutral-800 hover:scale-105 transition-all cursor-pointer shadow-xs"
                      aria-label={`Add ${product.name} to bag`}
                    >
                      {isAdded ? (
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
            })}
          </div>
        </main>
      </div>

      <Footer data={siteData.footer} />
    </div>
  );
}
