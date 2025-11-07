/**
 * SDK Version - BUMP THIS WHEN RELEASING
 * Keep in sync with root package.json version
 */
export const SDK_VERSION = "2.8.8";

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
  "2.8.8": {
    date: "2025-11-07",
    title: "Unified leaderboard endpoint and points sorting",
    summary:
      "Refactored leaderboard to use a single unified endpoint that returns both volume/pnl and points data. Supports both new unified format and fallback to legacy Orderly API with automatic field mapping.",
    highlights: [
      "New unified leaderboard endpoint support (single API call for all metrics)",
      "Automatic format detection for old (perp_volume, realized_pnl) and new (total_perp_volume, total_pnl) API formats",
      "Points sorting with graceful fallback to volume sort on unsupported APIs",
      "Conditional query parameters - only sends aggregateBy/broker_id for default Orderly endpoint",
      "Clean separation between query layer and response normalization",
      "Removed dual API fetching complexity",
    ],
    packages: ["kodiak-orderly-trading-leaderboard"],
    type: "feature",
  },
  "2.8.7": {
    date: "2025-11-05",
    title: "Custom announcements and leaderboard timeRange features",
    summary:
      "Added support for passing custom broker announcements as props that merge with API announcements, and enabled configurable default timeRange for leaderboard without requiring SDK version bumps.",
    highlights: [
      "New customAnnouncements prop on OrderlyAppProvider for broker-specific announcements",
      "Custom announcements merge with API announcements with higher priority display",
      "Added Campaign announcement type with UI styling and i18n support",
      "Leaderboard now supports configurable timeRange prop with 'now' keyword support for dynamic date ranges",
      "Default leaderboard view can be set via timeRange without SDK version changes",
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
    title: "UI improvements and WebSocket performance optimization",
    summary:
      "Fixed leaderboard points display, network selector scrolling, input box styling, and resolved WebSocket message queue lag on tab visibility",
    highlights: [
      "Leaderboard points now display as whole numbers instead of decimals",
      "Fixed network selector dropdown scrolling in withdraw form for all networks",
      "Improved Qty/Total input boxes with asymmetrical rounding design",
      "Resolved WebSocket price catch-up lag when returning to app from background",
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
    title: "Trading leaderboard points integration & SDK version display",
    summary:
      "Added points display to trading leaderboard with configurable API endpoint support and version display in footer",
    highlights: [
      "Points column on desktop leaderboard (when endpoint provided)",
      "Points tab on mobile leaderboard for toggling between Volume/PnL/Points metrics",
      "Configurable points API endpoint via pointsEndpoint prop",
      "Points data auto-loads when endpoint is provided, hides when empty",
      "SDK version (v2.8.5) now displayed in footer",
    ],
    packages: [
      "kodiak-orderly-trading-leaderboard",
      "kodiak-orderly-ui-scaffold",
    ],
    type: "feature",
  },
  "2.8.4": {
    date: "2025-10-28",
    title: "Mobile UX improvements & Mac trackpad fixes",
    summary:
      "Enhanced mobile input experience with optimized keyboards and fixed Mac trackpad scrolling in dropdowns",
    highlights: [
      "Mobile: Decimal keyboard for price/quantity inputs across trading interfaces",
      "Mobile: Numeric keyboard for whole number inputs (total orders)",
      "Mac: Fixed trackpad two-finger scrolling in network & account selection modals",
      "UX: Symbol context added to order cancellation confirmations",
      "Improved order editing experience on mobile",
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
    title: "Bug fixes and stability improvements",
    summary: "Various bug fixes and minor improvements",
    highlights: [
      "Fixed order submission validation",
      "Improved websocket reconnection handling",
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
