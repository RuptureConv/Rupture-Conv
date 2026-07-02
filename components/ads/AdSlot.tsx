"use client";

import { useEffect, useRef, useState } from "react";
import {
  canLoadAds,
  canPreviewAdSlot,
  getAdsConfig,
  getValidAdSlot,
  type AdPlacement
} from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  placement: AdPlacement;
  className?: string;
  consentGranted?: boolean;
};

const minHeightByPlacement: Record<AdPlacement, number> = {
  guide_after_content: 110,
  article_bottom: 110
};

export function AdSlot({
  placement,
  className = "",
  consentGranted = false
}: AdSlotProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const config = getAdsConfig();
  const previewEnabled = canPreviewAdSlot(placement, config);
  const slotId = getValidAdSlot(placement, config);
  const adsEnabled = canLoadAds(config, consentGranted) && Boolean(slotId);
  const shouldRenderAdsense = adsEnabled && isVisible;
  const minHeight = minHeightByPlacement[placement];

  useEffect(() => {
    const node = containerRef.current;

    if (!node || previewEnabled || isVisible) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "420px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible, previewEnabled]);

  useEffect(() => {
    if (!shouldRenderAdsense || typeof window === "undefined") {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Un bloqueur peut interrompre l'initialisation sans affecter la page.
    }
  }, [shouldRenderAdsense]);

  if (!previewEnabled && !adsEnabled) {
    return null;
  }

  return (
    <aside
      aria-label="Publicité"
      className={className}
      data-ad-placement={placement}
      ref={containerRef}
    >
      <div
        className="flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] p-3 text-center"
        style={{ minHeight }}
      >
        <span className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#7C8996]">
          Publicité
        </span>

        {previewEnabled ? (
          <div className="flex w-full flex-1 items-center justify-center rounded-xl border border-dashed border-[#C9DADB] bg-white px-4 py-6 text-xs font-semibold text-[#7C8996]">
            Aperçu de l’emplacement publicitaire
          </div>
        ) : shouldRenderAdsense ? (
          <ins
            className="adsbygoogle block w-full"
            data-ad-client={config.clientId}
            data-ad-format="auto"
            data-ad-slot={slotId}
            data-full-width-responsive="true"
            style={{ display: "block", minHeight: Math.max(minHeight - 36, 60) }}
          />
        ) : null}
      </div>
    </aside>
  );
}
