import React from "react";
import Image from "next/image";
import { HeroCardItem } from "../types/site";
import { Asterisk } from "lucide-react";

interface HeroCardsProps {
  cards: HeroCardItem[];
}

export default function HeroCards({ cards }: HeroCardsProps) {
  const leftCard = cards[0];
  const rightCard = cards[1] || cards[0];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center justify-center">
        {leftCard && (
          <div className="relative flex items-center justify-center w-full">
            <div className="relative w-full max-w-[460px] aspect-[4/4.8] sm:aspect-[4/4.6]">
              <Image
                src={leftCard.image}
                alt={leftCard.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-bottom select-none"
                priority
              />

              <div className="absolute top-[8%] left-[8%] w-[80%] aspect-square border border-white/90 shadow-sm flex flex-col justify-between p-5 sm:p-7 backdrop-blur-[0.5px]">
                <div>
                  <span className="block text-white text-2xl sm:text-3xl font-light tracking-tight leading-tight drop-shadow-sm">
                    Facile
                  </span>
                  <span className="block text-white text-2xl sm:text-3xl font-light tracking-tight leading-tight drop-shadow-sm">
                    Skincare
                  </span>
                </div>

                <div>
                  <div className="w-full h-[1px] bg-white/70 mb-3"></div>
                  <div className="flex items-center justify-between text-white drop-shadow-sm">
                    <div>
                      <span className="block text-[10px] sm:text-[11px] font-light text-white/80 leading-none">
                        Type
                      </span>
                      <span className="block text-xs sm:text-sm font-medium leading-tight mt-1">
                        {leftCard.typeLabel}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] sm:text-[11px] font-light text-white/80 leading-none">
                        Used for
                      </span>
                      <span className="block text-xs sm:text-sm font-medium leading-tight mt-1">
                        {leftCard.idealForLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {rightCard && (
          <div className="relative flex items-center justify-center w-full">
            <div className="relative w-full max-w-[420px] rounded-2xl overflow-hidden border border-white/80 shadow-2xl bg-white">
              <div className="w-full bg-white px-4 py-2.5 flex items-center justify-between border-b border-neutral-100 z-10 relative">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                </div>
                {rightCard.windowBadge && (
                  <div className="flex items-center gap-1 text-[11px] font-medium text-neutral-600">
                    <Asterisk className="w-3.5 h-3.5 text-neutral-800 stroke-[2.5]" />
                    <span>{rightCard.windowBadge}</span>
                  </div>
                )}
              </div>

              <div className="relative w-full aspect-square overflow-hidden bg-[#ebebe8]">
                <Image
                  src={rightCard.image}
                  alt={rightCard.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />

                <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between z-10 pointer-events-none">
                  <div>
                    <span className="block text-white text-2xl sm:text-3xl font-light tracking-tight leading-tight drop-shadow-md">
                      Glow
                    </span>
                    <span className="block text-white text-2xl sm:text-3xl font-light tracking-tight leading-tight drop-shadow-md">
                      Haven
                    </span>
                    <span className="block text-white text-2xl sm:text-3xl font-light tracking-tight leading-tight drop-shadow-md">
                      Skincare
                    </span>
                  </div>

                  <div>
                    <div className="w-full h-[1px] bg-white/70 mb-3"></div>
                    <div className="flex items-center justify-between text-white drop-shadow-md">
                      <div>
                        <span className="block text-[10px] sm:text-[11px] font-light text-white/80 leading-none">
                          Type
                        </span>
                        <span className="block text-xs sm:text-sm font-medium leading-tight mt-1">
                          {rightCard.typeLabel}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] sm:text-[11px] font-light text-white/80 leading-none">
                          Used for
                        </span>
                        <span className="block text-xs sm:text-sm font-medium leading-tight mt-1">
                          {rightCard.idealForLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
