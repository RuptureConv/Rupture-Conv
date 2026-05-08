"use client";

/* eslint-disable @next/next/next-script-for-ga -- The project does not include @next/third-parties; this keeps Google's official GTM snippet at the top of <head>. */

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { GTM_ID, isGoogleTagManagerReady } from "@/lib/analytics";

function GoogleTagManagerPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isGoogleTagManagerReady()) {
      return;
    }

    const queryString = searchParams.toString();
    const pagePath = queryString ? `${pathname}?${queryString}` : pathname;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "next_page_view",
      page_path: pagePath
    });
  }, [pathname, searchParams]);

  return null;
}

export function GoogleTagManagerHead() {
  if (!isGoogleTagManagerReady()) {
    return null;
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`
      }}
    />
  );
}

export function GoogleTagManagerBody() {
  if (!isGoogleTagManagerReady()) {
    return null;
  }

  return (
    <>
      <noscript>
        <iframe
          height="0"
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
          width="0"
        />
      </noscript>
      <Suspense fallback={null}>
        <GoogleTagManagerPageView />
      </Suspense>
    </>
  );
}
