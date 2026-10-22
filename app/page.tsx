"use client";

import React from "react";
import Header from "../components/Header";
import HeroCards from "../components/HeroCards";
import ProductMarquee from "../components/ProductMarquee";
import NatureSection from "../components/NatureSection";
import BestSellers from "../components/BestSellers";
import EditorialCollage from "../components/EditorialCollage";
import SkincareTips from "../components/SkincareTips";
import ProductDetail from "../components/ProductDetail";
import FullBleedBanner from "../components/FullBleedBanner";
import Footer from "../components/Footer";
import { siteData } from "../data/siteData";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fbfbf9] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Header data={siteData.header} />

      <main className="w-full">
        <HeroCards cards={siteData.heroCards} />
        <ProductMarquee products={siteData.carouselProducts} />
        <NatureSection data={siteData.natureSection} />
        <BestSellers data={siteData.bestSellers} />
        <EditorialCollage data={siteData.editorial} />
        <SkincareTips data={siteData.skincareTips} />
        <ProductDetail data={siteData.singleProduct} />
        <FullBleedBanner data={siteData.banner} />
      </main>

      <Footer data={siteData.footer} />
    </div>
  );
}
