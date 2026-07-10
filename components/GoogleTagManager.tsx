"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore
} from "react";
import {
  GTM_ID,
  isGoogleTagManagerReady,
  OPEN_ANALYTICS_CONSENT_EVENT
} from "@/lib/analytics";

const CONSENT_STORAGE_KEY = "ruptureconv_analytics_consent";

type AnalyticsConsent = "granted" | "denied";

let inMemoryConsent: AnalyticsConsent | null = null;

function readStoredConsent(): AnalyticsConsent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : inMemoryConsent;
  } catch {
    return inMemoryConsent;
  }
}

function saveConsent(value: AnalyticsConsent) {
  inMemoryConsent = value;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // The choice still applies for the current page if storage is unavailable.
  }

  window.dispatchEvent(new Event("ruptureconv:consent-change"));
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("ruptureconv:consent-change", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("ruptureconv:consent-change", onStoreChange);
  };
}

function clearGoogleAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();

    if (!name || (name !== "_ga" && !name.startsWith("_ga_"))) {
      continue;
    }

    document.cookie = name + "=; Max-Age=0; Path=/; SameSite=Lax";
    document.cookie =
      name + "=; Max-Age=0; Path=/; Domain=.rupture-conv.fr; SameSite=Lax";
  }
}

function GoogleTagManagerPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialPage = useRef(true);

  useEffect(() => {
    if (isInitialPage.current) {
      isInitialPage.current = false;
      return;
    }

    const queryString = searchParams.toString();
    const pagePath = queryString ? pathname + "?" + queryString : pathname;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "next_page_view",
      page_path: pagePath
    });
  }, [pathname, searchParams]);

  return null;
}

export function GoogleTagManager() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readStoredConsent,
    () => "denied"
  );
  const [isPanelForcedOpen, setIsPanelForcedOpen] = useState(false);
  const isPanelOpen = isPanelForcedOpen || consent === null;

  useEffect(() => {
    function openPanel() {
      setIsPanelForcedOpen(true);
    }

    window.addEventListener(OPEN_ANALYTICS_CONSENT_EVENT, openPanel);
    return () =>
      window.removeEventListener(OPEN_ANALYTICS_CONSENT_EVENT, openPanel);
  }, []);

  if (!isGoogleTagManagerReady()) {
    return null;
  }

  function grantConsent() {
    saveConsent("granted");
    window.dataLayer = window.dataLayer || [];
    setIsPanelForcedOpen(false);
  }

  function denyConsent() {
    const shouldReload = consent === "granted";
    saveConsent("denied");
    clearGoogleAnalyticsCookies();
    setIsPanelForcedOpen(false);

    if (shouldReload) {
      window.location.reload();
    }
  }

  const gtmSnippet =
    "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
    "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
    "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
    "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
    "})(window,document,'script','dataLayer','" +
    GTM_ID +
    "');";

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script
            dangerouslySetInnerHTML={{ __html: gtmSnippet }}
            id="google-tag-manager"
            strategy="afterInteractive"
          />
          <Suspense fallback={null}>
            <GoogleTagManagerPageView />
          </Suspense>
        </>
      ) : null}

      {isPanelOpen ? (
        <aside
          aria-label="Préférences de mesure d'audience"
          aria-live="polite"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-[#BFE8E3] bg-white p-5 shadow-[0_24px_80px_rgba(6,27,58,0.22)] sm:bottom-5 sm:p-6"
        >
          <p className="text-base font-black text-[#061B3A]">
            Mesure d&apos;audience
          </p>
          <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
            Google Analytics nous aide à comprendre quelles pages et quels outils
            sont utiles. Vous pouvez accepter ou refuser sans limiter l&apos;accès aux
            simulateurs.{" "}
            <Link
              className="font-bold text-[#168F86] underline"
              href="/politique-cookies"
            >
              Lire la politique cookies
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              className="min-h-11 rounded-full border border-[#B8C7CF] bg-white px-5 text-sm font-bold text-[#061B3A] transition hover:bg-[#F7FBFA] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
              onClick={denyConsent}
              type="button"
            >
              Refuser
            </button>
            <button
              className="min-h-11 rounded-full bg-[#168F86] px-5 text-sm font-bold text-white transition hover:bg-[#10756F] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
              onClick={grantConsent}
              type="button"
            >
              Accepter la mesure d&apos;audience
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
