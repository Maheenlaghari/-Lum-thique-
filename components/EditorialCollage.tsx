import React from "react";
import Image from "next/image";
import { EditorialSectionData } from "../types/site";

interface EditorialCollageProps {
  data: EditorialSectionData;
}

export default function EditorialCollage({ data }: EditorialCollageProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
      {/* Header Row: Title & Right Guide Note */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-4">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-950">
          {data.title}
        </h2>
        <div className="max-w-xs text-xs text-neutral-500 font-normal leading-relaxed sm:text-right">
          <p>{data.guideNote}</p>
        </div>
      </div>

      {/* Horizontal Divider Line */}
      <div className="w-full h-[1px] bg-[#ecece8] mb-6 sm:mb-8" />

      {/* Description below line on the left */}
      <div className="max-w-md mb-10 sm:mb-14">
        <p className="text-xs sm:text-sm text-neutral-600 italic leading-relaxed font-light">
          {data.description}
        </p>
      </div>

      {/* Collage Grid: 4 equal columns, no horizontal gap (matches reference) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-0 gap-y-6 lg:gap-y-6 items-start">
        {/* Large Portrait: cols 1-2, row 1 */}
        <div className="relative col-span-2 aspect-[437/448] w-full overflow-hidden bg-[#f4f4ee] lg:col-start-1 lg:row-start-1">
          <Image
            src={data.largeImage}
            alt="Skin care routine showcase"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>

        {/* Top Right: Product in hand + caption, col 4, row 1 */}
        <div className="col-span-2 lg:col-span-1 lg:col-start-4 lg:row-start-1 flex flex-col w-full">
          <div className="relative aspect-[222/226] w-full overflow-hidden bg-[#f4f4ee]">
            <Image
              src={data.topSecondaryImage}
              alt="Product in hand"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-light mt-4 w-full text-left">
            &ldquo;{data.topSecondaryCaption}&rdquo;
          </p>
        </div>

        {/* Bottom Left Square: col 1, row 2 */}
        <div className="relative col-span-1 aspect-square w-full overflow-hidden bg-[#f4f4ee] lg:col-start-1 lg:row-start-2">
          <Image
            src={data.bottomSquareImage}
            alt="Skincare application"
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Bottom Right Wide: cols 3-4, row 2 */}
        <div className="col-span-2 grid grid-cols-2 w-full lg:col-start-3 lg:row-start-2">
          <div className="relative aspect-square w-full overflow-hidden bg-[#f4f4ee]">
            <Image
              src={data.bottomWideImageLeft}
              alt="Skincare application close-up"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative aspect-square w-full overflow-hidden bg-[#f4f4ee]">
            <Image
              src={data.bottomWideImage}
              alt="Skincare product presentation"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
