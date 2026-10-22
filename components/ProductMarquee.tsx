import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductSummary } from "../types/site";
import { useCart } from "../context/CartContext";

interface ProductMarqueeProps {
  products: ProductSummary[];
  onSelectProduct?: (product: ProductSummary) => void;
}

export default function ProductMarquee({
  products,
  onSelectProduct
}: ProductMarqueeProps) {
  const { addItem } = useCart();

  const handleAdd = (item: ProductSummary) => {
    if (onSelectProduct) {
      onSelectProduct(item);
    } else {
      const numPrice = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 38.0;
      addItem({
        productId: item.id,
        slug: item.slug || item.id,
        name: item.name,
        price: numPrice,
        priceFormatted: item.price,
        image: item.image
      });
    }
  };
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((item) => {
          const productHref = `/product/${item.slug || item.id}`;

          return (
            <Link
              key={item.id}
              href={productHref}
              className="group flex items-center gap-3.5 sm:gap-4 bg-white rounded-2xl p-4 border border-[#ecece8] shadow-xs hover:shadow-md hover:border-neutral-300 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 truncate group-hover:text-black transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-neutral-950 mt-1">
                  {item.price}
                </p>
                <span className="text-[11px] sm:text-xs text-neutral-400 capitalize mt-0.5 truncate">
                  {item.collection}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
