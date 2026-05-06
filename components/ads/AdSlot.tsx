"use client";

import { useEffect, useRef, useState } from "react";
import { ADSENSE_CLIENT, getAdsenseSlot, isAdsenseReady } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export type AdPosition = "top" | "after-content" | "mid" | "bottom";
export type AdFormat = "horizontal" | "rectangle";

type AdSlotProps = {
  position: AdPosition;
  format: AdFormat;
  className?: string;
  desktopOnly?: boolean;
  mobileOnly?: boolean;
};

const slotIdByPosition: Record<AdPosition, string> = {
  top: "ad-seo-top",
  "after-content": "ad-seo-after-content",
  mid: "ad-seo-mid",
  bottom: "ad-seo-bottom"
};

const heightByFormat: Record<AdFormat, number> = {
  horizontal: 110,
  rectangle: 250
};

export function AdSlot({
  position,
  format,
  className = "",
  desktopOnly = false,
  mobileOnly = false
}: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(position === "top");
  const adsenseEnabled = isAdsenseReady();
  const id = slotIdByPosition[position];
  const adSlot = getAdsenseSlot(id);
  const shouldRenderAdsense = adsenseEnabled && Boolean(adSlot) && isVisible;
  const minHeight = heightByFormat[format];
  const responsiveClass = desktopOnly
    ? "hidden lg:block"
    : mobileOnly
      ? "block lg:hidden"
      : "block";
  const label = position === "top" ? "Publicité" : "Annonce";

  useEffect(() => {
    const node = containerRef.current;

    if (!node || isVisible || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "420px 0px"
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!shouldRenderAdsense || typeof window === "undefined") {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or preview environments may reject the push; the reserved
      // slot still prevents layout shift.
    }
  }, [shouldRenderAdsense]);

  return (
    <aside
      aria-label={`${label} ${position}`}
      className={`${responsiveClass} ${className}`}
      data-ad-position={position}
      ref={containerRef}
    >
      <div
        className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] p-3 text-center shadow-[0_12px_35px_rgba(6,27,58,0.04)]"
        data-ad-format={format}
        style={{ minHeight }}
      >
        <span className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#9AA8B6]">
          {label}
        </span>

        {shouldRenderAdsense ? (
          <ins
            className="adsbygoogle relative z-10 block w-full"
            data-ad-client={ADSENSE_CLIENT}
            data-ad-format="auto"
            data-ad-slot={adSlot}
            data-full-width-responsive="true"
            style={{ display: "block", minHeight: Math.max(minHeight - 36, 60) }}
          />
        ) : null}

        <div
          className={`${shouldRenderAdsense ? "pointer-events-none absolute inset-x-3 bottom-3 top-8" : "flex min-h-full w-full flex-1"} flex items-center justify-center rounded-xl border border-dashed border-[#D7E7E8] bg-white/80 px-4 py-6 text-xs font-semibold text-[#9AA8B6]`}
        >
          Publicité
        </div>
      </div>
    </aside>
  );
}
