export type AdFormat =
  | "leaderboard"
  | "responsive-horizontal"
  | "sidebar-rectangle"
  | "medium-rectangle"
  | "footer-banner";

export type AdSlotConfig = {
  id: string;
  label: string;
  format: AdFormat;
  minHeight: number;
  desktopOnly?: boolean;
  mobileOnly?: boolean;
};

export const adSlots = {
  topLeaderboard: {
    id: "ad-top-leaderboard",
    label: "Publicité",
    format: "leaderboard",
    minHeight: 90
  },
  beforeSimulator: {
    id: "ad-before-simulator",
    label: "Publicité",
    format: "responsive-horizontal",
    minHeight: 120
  },
  simulatorSidebar: {
    id: "ad-simulator-sidebar",
    label: "Publicité",
    format: "sidebar-rectangle",
    minHeight: 600,
    desktopOnly: true
  },
  contentRectangle: {
    id: "ad-content-rectangle",
    label: "Publicité",
    format: "medium-rectangle",
    minHeight: 250
  },
  afterResult: {
    id: "ad-after-result",
    label: "Publicité",
    format: "responsive-horizontal",
    minHeight: 120
  },
  footerBanner: {
    id: "ad-footer-banner",
    label: "Publicité",
    format: "footer-banner",
    minHeight: 100
  }
} satisfies Record<string, AdSlotConfig>;
