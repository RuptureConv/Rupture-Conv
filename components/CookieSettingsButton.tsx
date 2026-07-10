"use client";

import { OPEN_ANALYTICS_CONSENT_EVENT } from "@/lib/analytics";

export function CookieSettingsButton() {
  function openConsentPanel() {
    window.dispatchEvent(new Event(OPEN_ANALYTICS_CONSENT_EVENT));
  }

  return (
    <button
      className="font-semibold hover:text-[#22AFA3]"
      onClick={openConsentPanel}
      type="button"
    >
      Gérer les cookies
    </button>
  );
}
