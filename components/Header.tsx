"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeaderData } from "../types/site";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  data: HeaderData;
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Header({ data, cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totals, openCart } = useCart();

  const activeCount = typeof cartCount === "number" ? cartCount : totals.itemCount;
  const handleOpen = onOpenCart || openCart;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full bg-[#fbfbf9] transition-all">
      {/* Effortlessly Minimal Sticky Navbar */}
      <div
        className={`sticky top-0 z-40 w-full transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
          isScrolled
            ? "bg-[#fbfbf9]/80 backdrop-blur-md border-b border-[#ecece8]/80 py-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            : "bg-[#fbfbf9] border-b border-[#ecece8] pt-6 pb-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 sm:gap-8">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col justify-center items-start gap-1.5 w-6 h-6 group cursor-pointer focus:outline-none lg:hidden"
              aria-label="Toggle Navigation Menu"
            >
              <span className="w-5 h-[1.5px] bg-neutral-900 transition-all group-hover:w-4"></span>
              <span className="w-5 h-[1.5px] bg-neutral-900 transition-all group-hover:w-5"></span>
            </button>

            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-tight text-neutral-700">
              {data.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-black transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Minimal Brand Name on Mobile when scrolled */}
          <Link
            href="/"
            className={`lg:hidden font-medium text-lg tracking-tight text-neutral-950 transition-opacity duration-300 ${
              isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {data.brandName}
          </Link>

          <div className="flex items-center gap-5 sm:gap-6">
            {/* Minimal Brand Name on Desktop when scrolled */}
            <Link
              href="/"
              className={`hidden lg:inline-block font-normal text-base tracking-tight text-neutral-950 transition-opacity duration-300 hover:opacity-75 ${
                isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {data.brandName}
            </Link>

            <button
              onClick={handleOpen}
              className="flex items-center gap-2 text-sm font-medium text-neutral-800 hover:text-black cursor-pointer px-3.5 py-1.5 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              <span className="text-xs bg-neutral-900 text-white rounded-full w-4 h-4 flex items-center justify-center font-mono">
                {activeCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Title & Subtitle Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-6 sm:my-10 flex justify-end text-right select-none overflow-hidden">
          <Link href="/" className="inline-block">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-normal tracking-tight text-neutral-950 leading-none hover:opacity-95 transition-opacity">
              {data.brandName}
            </h1>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-neutral-500 font-normal tracking-normal pt-2 pb-4 gap-2 border-t border-[#f0f0eb]">
          <p className="max-w-xs">{data.subtitleLeft}</p>
          <p className="max-w-xs sm:text-right">{data.subtitleRight}</p>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-start lg:hidden">
          <div className="w-80 max-w-[85vw] bg-[#fbfbf9] h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#ecece8]">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-medium text-xl tracking-tight text-neutral-900 hover:opacity-80 transition-opacity"
                >
                  {data.brandName}
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-neutral-500 hover:text-black cursor-pointer"
                  aria-label="Close Navigation Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-5 text-base font-medium text-neutral-800">
                {data.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-black transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="text-xs text-neutral-400 pt-6 border-t border-[#ecece8]">
              {data.brandName} Luxury Skincare Collection
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
