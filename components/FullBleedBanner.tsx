import React from "react";
import Image from "next/image";
import { BannerData } from "../types/site";

interface FullBleedBannerProps {
  data: BannerData;
}

export default function FullBleedBanner({ data }: FullBleedBannerProps) {
  return (
    <section className="w-full mt-12 sm:mt-20 overflow-hidden">
      <div className="relative w-full h-[55vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] min-h-[440px] sm:min-h-[580px] md:min-h-[700px] lg:min-h-[820px] bg-[#f2f2ee]">
        <Image
          src={data.image}
          alt={data.altText}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_90%] sm:object-[center_88%]"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    </section>
  );
}
