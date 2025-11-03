/**
 * SDK Version - BUMP THIS WHEN RELEASING
 * Keep in sync with root package.json version
 */
export const SDK_VERSION = "2.8.5";

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
    packages: ["orderly-trading-leaderboard", "orderly-ui-scaffold"],
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
      "orderly-ui-transfer",
      "orderly-ui-order-entry",
      "orderly-ui-orders",
      "orderly-ui-positions",
      "orderly-ui-tpsl",
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
    packages: ["orderly-core", "orderly-net"],
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
