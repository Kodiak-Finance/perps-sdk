/**
 * SDK Version - BUMP THIS WHEN RELEASING
 * Keep in sync with root package.json version
 */
export const SDK_VERSION = "2.8.10";

export type ChangesetEntry = {
  date: string;
  title: string;
  summary: string;
  highlights: string[];
  packages: string[];
  type: "breaking" | "feature" | "bugfix" | "improvement";
};

export type Changesets = Record<string, ChangesetEntry>;

/**
 * Changesets - What's new in each version
 * ADD NEW ENTRIES WHEN BUMPING SDK_VERSION
 */
export const CHANGESETS: Changesets = {
  "2.8.10": {
    date: "2025-11-07",
    title: "Your trading metrics now display correctly on the leaderboard",
    summary:
      "Fixed an issue where your trading volume and P&L weren't showing on your leaderboard row. Your trading stats now display accurately so you can see your real performance.",
    highlights: [
      "Your trading volume now shows in your leaderboard row",
      "Realized P&L displays correctly for your account",
      "All your trading metrics are now visible and up to date",
      "Works smoothly across both the default and custom leaderboards",
    ],
    packages: ["kodiak-orderly-trading-leaderboard"],
    type: "bugfix",
  },
  "2.8.9": {
    date: "2025-11-07",
    title: "Leaderboard performance improvements",
    summary:
      "Made the leaderboard faster and more reliable. Your rankings now load quicker and metrics display more smoothly.",
    highlights: [
      "Leaderboard loads faster",
      "Smoother sorting and filtering experience",
      "More reliable data display",
      "Better handling of large leaderboards",
    ],
    packages: ["kodiak-orderly-trading-leaderboard"],
    type: "improvement",
  },
  "2.8.8": {
    date: "2025-11-07",
    title: "See your points and compete on the leaderboard",
    summary:
      "You can now compete by trading volume, profit/loss, or all-time points. Sort and compare your performance against other traders in real-time.",
    highlights: [
      "View all-time points earned on the leaderboard",
      "Sort by trading volume, P&L, or points",
      "See your rank for each metric",
      "Faster leaderboard loading",
    ],
    packages: ["kodiak-orderly-trading-leaderboard"],
    type: "feature",
  },
  "2.8.7": {
    date: "2025-11-05",
    title: "Custom leaderboard periods and broker announcements",
    summary:
      "Brokers can now show custom messages in announcement and set flexible date ranges for leaderboards. View any time period - daily, weekly, monthly, or custom ranges.",
    highlights: [
      "View leaderboards for any time period you want",
      "Brokers can display important announcements",
      "Change leaderboard dates without app updates",
      "Campaign-specific leaderboards with custom dates",
    ],
    packages: [
      "kodiak-orderly-react-app",
      "kodiak-orderly-ui-scaffold",
      "kodiak-orderly-i18n",
      "kodiak-orderly-trading-leaderboard",
    ],
    type: "feature",
  },
  "2.8.6": {
    date: "2025-11-04",
    title: "Faster app and smoother trading experience",
    summary:
      "Fixed performance issues and improved the user experience. Trading is now smoother and the app responds faster when you switch between screens.",
    highlights: [
      "Points display cleanly without decimals",
      "Withdraw form works smoothly with all networks",
      "Trading input fields handle decimals better",
      "Price data updates instantly when you return to the app",
      "Faster performance on slower connections",
    ],
    packages: [
      "kodiak-orderly-trading-leaderboard",
      "kodiak-orderly-ui-transfer",
      "kodiak-orderly-ui-order-entry",
      "kodiak-orderly-hooks",
    ],
    type: "improvement",
  },
  "2.8.5": {
    date: "2025-11-03",
    title: "Track your trading points on the leaderboard",
    summary:
      "Your all-time trading points are now displayed on the leaderboard. Compete based on the points you earn and see where you rank.",
    highlights: [
      "View your all-time points earned",
      "See points on desktop leaderboard",
      "Switch between Volume, P&L, and Points on mobile",
      "Compare your points against other traders",
    ],
    packages: [
      "kodiak-orderly-trading-leaderboard",
      "kodiak-orderly-ui-scaffold",
    ],
    type: "feature",
  },
  "2.8.4": {
    date: "2025-10-28",
    title: "Better mobile trading and Mac support",
    summary:
      "Trading on mobile is now easier and faster. Fixed issues on Mac and improved the overall experience across all devices.",
    highlights: [
      "Mobile: Right keyboard automatically appears for entering prices",
      "Mobile: Quick number entry for order sizes",
      "Mac: Fixed trackpad scrolling in dropdowns",
      "Know which trading pair you're canceling orders from",
      "Easier stop-loss and take-profit management on mobile",
    ],
    packages: [
      "kodiak-orderly-ui-transfer",
      "kodiak-orderly-ui-order-entry",
      "kodiak-orderly-ui-orders",
      "kodiak-orderly-ui-positions",
      "kodiak-orderly-ui-tpsl",
    ],
    type: "improvement",
  },
  "2.8.3": {
    date: "2025-10-20",
    title: "More reliable orders and connections",
    summary:
      "Fixed issues with order submission and improved network stability. Your orders now process reliably.",
    highlights: [
      "Orders submit without errors",
      "Connection stays stable during network changes",
      "Faster recovery from connection drops",
    ],
    packages: ["kodiak-orderly-core", "kodiak-orderly-net"],
    type: "bugfix",
  },
};

/**
 * Get changeset for a specific version
 * @param version - Version string (e.g., "2.8.3")
 * @returns ChangesetEntry or undefined if not found
 */
export function getChangesetForVersion(
  version: string = SDK_VERSION,
): ChangesetEntry | undefined {
  return CHANGESETS[version];
}

/**
 * Get the latest changeset
 * @returns ChangesetEntry for current SDK_VERSION
 */
export function getLatestChangeset(): ChangesetEntry | undefined {
  return getChangesetForVersion(SDK_VERSION);
}
