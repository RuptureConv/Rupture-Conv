"use client";

import { useEffect } from "react";
import type { AdFormat } from "@/lib/ads.config";
import { ADSENSE_CLIENT, getAdsenseSlot, isAdsenseReady } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  id: string;
  format: AdFormat;
  label: string;
  className?: string;
  minHeight: number;
  desktopOnly?: boolean;
  mobileOnly?: boolean;
};

export function AdSlot({
  id,
  format,
  label,
  className = "",
  minHeight,
  desktopOnly = false,
  mobileOnly = false
}: AdSlotProps) {
  const adsenseEnabled = isAdsenseReady();
  const adSlot = getAdsenseSlot(id);
  const shouldRenderAdsense = adsenseEnabled && Boolean(adSlot);
  const responsiveClass = desktopOnly
    ? "hidden lg:block"
    : mobileOnly
      ? "block lg:hidden"
      : "block";

  useEffect(() => {
    if (!shouldRenderAdsense || typeof window === "undefined") {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      console.log("Ad loaded:", id);
    } catch (error) {
      console.error("Adsense error", error);
    }
  }, [id, shouldRenderAdsense]);

  return (
    <aside
      aria-label={`${label} ${id}`}
      className={`${responsiveClass} ${className}`}
      id={id}
    >
      <div
        className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] p-3 text-center shadow-[0_12px_35px_rgba(6,27,58,0.04)]"
        data-ad-format={format}
        data-ad-slot-id={id}
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
        <div className={`${shouldRenderAdsense ? "pointer-events-none absolute inset-x-3 bottom-3 top-8" : "flex min-h-full w-full flex-1"} flex items-center justify-center rounded-xl border border-dashed border-[#D7E7E8] bg-white/80 px-4 py-6 text-xs font-semibold text-[#9AA8B6]`}>
          Publicité
        </div>
        {/*
          AdSense integration point. Set NEXT_PUBLIC_ENABLE_ADSENSE=true plus
          a real NEXT_PUBLIC_ADSENSE_CLIENT and slot IDs in production.
        */}
      </div>
    </aside>
  );
}
