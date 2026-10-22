import React from "react";
import Link from "next/link";
import { FooterData } from "../types/site";

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  const getHref = (item: string) => {
    const lower = item.toLowerCase();
    if (lower === "home") return "/";
    if (lower === "shop") return "/shop";
    if (lower === "about us" || lower === "about") return "/about";
    if (lower === "contact") return "/contact";
    return "/shop";
  };

  return (
    <footer className="w-full bg-[#fbfbf9] pt-16 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#ecece8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
          <div className="lg:col-span-4 pr-0 lg:pr-8">
            <p className="text-base sm:text-lg text-neutral-800 leading-relaxed font-normal">
              {data.missionStatement}
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-4">
            {data.columns.map((col, idx) => (
              <div key={idx} className="flex flex-col gap-3 pt-3 border-t border-neutral-300">
                <h3 className="text-xs font-semibold text-neutral-900 tracking-wider">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {col.items.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={getHref(item)}
                        className="text-xs text-neutral-500 hover:text-black transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-[#ecece8] flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-xs text-xs text-neutral-500 font-normal">
            <p>{data.ecoNotice}</p>
          </div>

          <div className="w-full md:w-auto text-left md:text-right select-none">
            <Link href="/">
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-normal tracking-tight text-neutral-950 leading-none hover:opacity-95 transition-opacity">
                {data.brandName}
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
