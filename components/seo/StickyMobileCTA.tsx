"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function StickyMobileCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isSimulatorVisible, setIsSimulatorVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const simulator = document.getElementById("simulateur");
    if (!simulator) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsSimulatorVisible(entry.isIntersecting),
      { rootMargin: "-20% 0px -35% 0px", threshold: 0.05 }
    );
    observer.observe(simulator);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  if (pathname === "/salaire-brut-net" || !isVisible || isSimulatorVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:hidden">
      <Link
        className="mx-auto flex min-h-12 max-w-sm items-center justify-center rounded-full bg-[#061B3A] px-5 text-sm font-extrabold text-white shadow-[0_18px_50px_rgba(6,27,58,0.22)] ring-1 ring-white/30"
        href="/#simulateur"
      >
        Calculer mon indemnité
      </Link>
    </div>
  );
}
