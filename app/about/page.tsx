import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { siteData } from "../../data/siteData";
import { ArrowRight, ShieldCheck, Sparkles, Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fbfbf9] text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header data={siteData.header} />

        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
              Our Heritage and Philosophy
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-neutral-950 mt-3 leading-[1.05]">
              Formulated for Biological Harmony
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-light mt-4 leading-relaxed">
              Luméthique was founded on a singular conviction: skincare should strengthen your natural cellular barrier, never strip or compromise its innate defense systems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 sm:mb-28">
            <div className="lg:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#f4f4ee] shadow-sm">
              <Image
                src="/assets/sec-3-2.png"
                alt="Woman applying Luméthique botanical formulation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center lg:pl-8">
              <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                Purity Meets Precision
              </span>
              <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-neutral-950 mt-2 mb-6">
                Pure Botanicals Guided by Clinical Standards
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed mb-6">
                Every elixir begins with cold extracted botanical actives and biocompatible lipids that echo the molecular architecture of human sebum. By introducing ingredients that your skin instinctively recognizes, our formulas absorb without friction, leaving a replenished and calm complexion.
              </p>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                We reject volatile fragrances, harsh surfactants, and synthetic silicones. What remains is a pure, concentrated concentration of phytonutrients designed for everyday radiance.
              </p>
            </div>
          </div>

          <section className="mb-20 sm:mb-28 pt-12 border-t border-[#ecece8]">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                Our Formulative Pillars
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-8 border border-[#ecece8] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#ede7f6] flex items-center justify-center text-neutral-800 mb-6">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-950 mb-2">
                    Barrier Centric Science
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    Formulations calibrated to a physiological pH of 5.5 to nurture healthy microflora and maintain cellular moisture retention.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-[#ecece8] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#e1f1f5] flex items-center justify-center text-neutral-800 mb-6">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-950 mb-2">
                    Eco Conscious Cultivation
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    Sustainably harvested botanicals sourced from ethical cooperatives with infinitely recyclable frosted glass packaging.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-[#ecece8] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#faebc3] flex items-center justify-center text-neutral-800 mb-6">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-950 mb-2">
                    Radical Transparency
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    Complete disclosure of every botanical extract, lipid fraction, and active percentage with full provenance tracking.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white p-8 sm:p-14 lg:p-16 flex flex-col items-center text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400">
              The Luméthique Experience
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight mt-3 mb-4 max-w-xl">
              Experience the Radiance of Balanced Skin
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 font-light max-w-md mb-8">
              Explore our full range of clean serums, soothing toners, and restorative cleansers.
            </p>
            <Link
              href="/shop"
              className="px-8 py-4 rounded-xl bg-white text-neutral-950 hover:bg-[#eb865a] hover:text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-2"
            >
              <span>EXPLORE THE SHOP</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
      </div>

      <Footer data={siteData.footer} />
    </div>
  );
}
