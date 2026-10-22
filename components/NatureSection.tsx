import React from "react";
import Image from "next/image";
import { NatureSectionData } from "../types/site";

interface NatureSectionProps {
  data: NatureSectionData;
}

export default function NatureSection({ data }: NatureSectionProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
      <div className="mb-12 sm:mb-16">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-950 leading-[1.05] whitespace-pre-line">
          {data.heading}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        {/* Left Column: Dropper Detail Image + Mission Statement */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div className="relative aspect-square max-w-[260px] sm:max-w-[300px] overflow-hidden bg-[#f4f4ee] mb-8 sm:mb-12">
            <Image
              src={data.detailImage}
              alt="Skincare serum application"
              fill
              sizes="(max-width: 640px) 100vw, 30vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 italic leading-relaxed font-light max-w-sm pb-2">
            {data.description}
          </p>
        </div>

        {/* Right Column: Large Lifestyle Portrait */}
        <div className="lg:col-span-7 relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#f4f4ee]">
          <Image
            src={data.lifestyleImage}
            alt="Skincare radiance results"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}
