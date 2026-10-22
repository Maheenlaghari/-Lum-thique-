import React from "react";
import Image from "next/image";
import { SkincareTipsData } from "../types/site";

interface SkincareTipsProps {
  data: SkincareTipsData;
}

export default function SkincareTips({ data }: SkincareTipsProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Model Portrait with Direct Pill Metadata */}
        <div className="lg:col-span-6 relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#f4f4ee]">
          <Image
            src={data.portraitImage}
            alt="Glowing healthy skin portrait"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

          <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-wrap items-center justify-between gap-2 text-white text-[11px] sm:text-xs drop-shadow-md">
            {data.pills.map((pill, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className="text-white/80 font-light">{pill.label} /</span>
                <span className="font-medium text-white">{pill.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Centered Heading, Floating Product, and Bottom Reviews */}
        <div className="lg:col-span-6 flex flex-col justify-between py-2">
          <div className="text-center mb-6">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.05] whitespace-pre-line">
              {data.heading}
            </h2>
            <div className="mt-3 text-xs sm:text-sm text-neutral-500 font-light leading-snug">
              <span className="block">Follow me on Instagram</span>
              <a
                href={data.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-neutral-800 hover:text-black font-medium transition-colors"
              >
                {data.instagramHandle}
              </a>
            </div>
          </div>

          <div className="relative aspect-square max-w-[240px] sm:max-w-[280px] mx-auto my-4 sm:my-6 w-full flex items-center justify-center">
            <Image
              src={data.productImage}
              alt="Brighten vitamin serum"
              fill
              sizes="280px"
              className="object-contain hover:scale-105 transition-transform duration-500 drop-shadow-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#ecece8] text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-light">
            <p>{data.leftBlurb}</p>
            <p className="sm:text-right">{data.rightBlurb}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
