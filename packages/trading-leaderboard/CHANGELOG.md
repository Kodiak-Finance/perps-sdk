# @orderly.network/trading-leaderboard

## 2.8.10

### Patch Changes

- 2ffbf03: Fixed an issue where your trading volume and P&L weren't showing on your leaderboard row. Your trading stats now display accurately so you can see your real performance.
- Updated dependencies [2ffbf03]
  - @kodiak-finance/orderly-ui-connector@2.8.10
  - @kodiak-finance/orderly-hooks@2.8.10
  - @kodiak-finance/orderly-react-app@2.8.10
  - @kodiak-finance/orderly-i18n@2.8.10
  - @kodiak-finance/orderly-types@2.8.10
  - @kodiak-finance/orderly-ui@2.8.10
  - @kodiak-finance/orderly-utils@2.8.10

## 2.8.9

### Patch Changes

- fc6ceec: Simplified leaderboard implementation by removing format detection logic as the unified endpoint now returns consistent field names. Improved code quality with pure
- Updated dependencies [fc6ceec]
  - @kodiak-finance/orderly-ui-connector@2.8.9
  - @kodiak-finance/orderly-hooks@2.8.9
  - @kodiak-finance/orderly-react-app@2.8.9
  - @kodiak-finance/orderly-i18n@2.8.9
  - @kodiak-finance/orderly-types@2.8.9
  - @kodiak-finance/orderly-ui@2.8.9
  - @kodiak-finance/orderly-utils@2.8.9

## 2.8.8

### Patch Changes

- be147fa: Refactor leaderboard to use unified endpoint with automatic API format detection
- Updated dependencies [be147fa]
  - @kodiak-finance/orderly-ui-connector@2.8.8
  - @kodiak-finance/orderly-hooks@2.8.8
  - @kodiak-finance/orderly-react-app@2.8.8
  - @kodiak-finance/orderly-i18n@2.8.8
  - @kodiak-finance/orderly-types@2.8.8
  - @kodiak-finance/orderly-ui@2.8.8
  - @kodiak-finance/orderly-utils@2.8.8

## 2.8.7

### Patch Changes

- 9cdd7a9: Added custom announcements system with Campaign type support and configurable leaderboard time ranges. Brokers can now pass custom announcements that merge with API
- Updated dependencies [9cdd7a9]
  - @kodiak-finance/orderly-ui-connector@2.8.7
  - @kodiak-finance/orderly-hooks@2.8.7
  - @kodiak-finance/orderly-types@2.8.7
  - @kodiak-finance/orderly-i18n@2.8.7
  - @kodiak-finance/orderly-react-app@2.8.7
  - @kodiak-finance/orderly-ui@2.8.7
  - @kodiak-finance/orderly-utils@2.8.7

## 2.8.6

### Patch Changes

- ba9e214: fix: Display leaderboard points as whole numbers, fix network selector scrolling, improve Qty/Total box styling, and resolve WebSocket price catch-up lag
- Updated dependencies [ba9e214]
  - @kodiak-finance/orderly-ui-connector@2.8.6
  - @kodiak-finance/orderly-hooks@2.8.6
  - @kodiak-finance/orderly-i18n@2.8.6
  - @kodiak-finance/orderly-react-app@2.8.6
  - @kodiak-finance/orderly-types@2.8.6
  - @kodiak-finance/orderly-ui@2.8.6
  - @kodiak-finance/orderly-utils@2.8.6

## 2.8.5

### Patch Changes

- 3f0c08b: feat: Trading leaderboard points integration and SDK version display
- Updated dependencies [3f0c08b]
  - @kodiak-finance/orderly-ui-connector@2.8.5
  - @kodiak-finance/orderly-hooks@2.8.5
  - @kodiak-finance/orderly-i18n@2.8.5
  - @kodiak-finance/orderly-react-app@2.8.5
  - @kodiak-finance/orderly-types@2.8.5
  - @kodiak-finance/orderly-ui@2.8.5
  - @kodiak-finance/orderly-utils@2.8.5

## 2.8.4

### Patch Changes

- 86073bd: Enhanced mobile input experience with optimized keyboards, fixed Mac trackpad scrolling in dropdowns, and implemented changeset notification system.
- Updated dependencies [86073bd]
  - @kodiak-finance/orderly-hooks@2.8.4
  - @kodiak-finance/orderly-react-app@2.8.4
  - @kodiak-finance/orderly-ui@2.8.4
  - @kodiak-finance/orderly-i18n@2.8.4
  - @kodiak-finance/orderly-types@2.8.4
  - @kodiak-finance/orderly-ui-connector@2.8.4
  - @kodiak-finance/orderly-utils@2.8.4

## 2.8.3

### Patch Changes

- b60159d: Add symbol-scoped order cancellation and improve data freshness
- Updated dependencies [b60159d]
  - @kodiak-finance/orderly-hooks@2.8.3
  - @kodiak-finance/orderly-react-app@2.8.3
  - @kodiak-finance/orderly-ui@2.8.3
  - @kodiak-finance/orderly-i18n@2.8.3
  - @kodiak-finance/orderly-types@2.8.3
  - @kodiak-finance/orderly-ui-connector@2.8.3
  - @kodiak-finance/orderly-utils@2.8.3

## 2.8.2

### Patch Changes

- 0ed6b06: - Leaderboard: Change PnL label to "Realized PnL" throughout
- Updated dependencies [0ed6b06]
  - @kodiak-finance/orderly-react-app@2.8.2
  - @kodiak-finance/orderly-ui@2.8.2
  - @kodiak-finance/orderly-hooks@2.8.2
  - @kodiak-finance/orderly-i18n@2.8.2
  - @kodiak-finance/orderly-types@2.8.2
  - @kodiak-finance/orderly-ui-connector@2.8.2
  - @kodiak-finance/orderly-utils@2.8.2

## 2.8.1

### Patch Changes

- 4ac67e6: Fix TradingView chart not loading: separate EXCHANGE (API identifier) from EXCHANGE_DISPLAY (UI label)
- Updated dependencies [4ac67e6]
  - @kodiak-finance/orderly-react-app@2.8.1
  - @kodiak-finance/orderly-hooks@2.8.1
  - @kodiak-finance/orderly-i18n@2.8.1
  - @kodiak-finance/orderly-types@2.8.1
  - @kodiak-finance/orderly-ui-connector@2.8.1
  - @kodiak-finance/orderly-ui@2.8.1
  - @kodiak-finance/orderly-utils@2.8.1

## 2.8.0

### Minor Changes

- 7fb352e: - Add annualized funding rate display in funding rate tooltip

### Patch Changes

- Updated dependencies [7fb352e]
  - @kodiak-finance/orderly-i18n@2.8.0
  - @kodiak-finance/orderly-react-app@2.8.0
  - @kodiak-finance/orderly-hooks@2.8.0
  - @kodiak-finance/orderly-types@2.8.0
  - @kodiak-finance/orderly-ui@2.8.0
  - @kodiak-finance/orderly-ui-connector@2.8.0
  - @kodiak-finance/orderly-utils@2.8.0

## 2.7.4

### Patch Changes

- publish
- Updated dependencies
  - @kodiak-finance/orderly-react-app@2.7.4
  - @kodiak-finance/orderly-hooks@2.7.4
  - @kodiak-finance/orderly-i18n@2.7.4
  - @kodiak-finance/orderly-types@2.7.4
  - @kodiak-finance/orderly-ui@2.7.4
  - @kodiak-finance/orderly-ui-connector@2.7.4
  - @kodiak-finance/orderly-utils@2.7.4

## 2.7.3

### Patch Changes

- publish
- a8254c1: publish
- Updated dependencies
- Updated dependencies [a8254c1]
  - @orderly.network/react-app@2.7.3
  - @orderly.network/hooks@2.7.3
  - @orderly.network/i18n@2.7.3
  - @orderly.network/types@2.7.3
  - @orderly.network/ui@2.7.3
  - @orderly.network/ui-connector@2.7.3
  - @orderly.network/utils@2.7.3

## 2.7.3-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.7.3-alpha.0
  - @orderly.network/hooks@2.7.3-alpha.0
  - @orderly.network/i18n@2.7.3-alpha.0
  - @orderly.network/types@2.7.3-alpha.0
  - @orderly.network/ui@2.7.3-alpha.0
  - @orderly.network/ui-connector@2.7.3-alpha.0
  - @orderly.network/utils@2.7.3-alpha.0

## 2.7.2

### Patch Changes

- 360c563: publish
- publish
- Updated dependencies [360c563]
- Updated dependencies
  - @orderly.network/react-app@2.7.2
  - @orderly.network/hooks@2.7.2
  - @orderly.network/i18n@2.7.2
  - @orderly.network/types@2.7.2
  - @orderly.network/ui@2.7.2
  - @orderly.network/ui-connector@2.7.2
  - @orderly.network/utils@2.7.2

## 2.7.2-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.7.2-alpha.0
  - @orderly.network/hooks@2.7.2-alpha.0
  - @orderly.network/i18n@2.7.2-alpha.0
  - @orderly.network/types@2.7.2-alpha.0
  - @orderly.network/ui@2.7.2-alpha.0
  - @orderly.network/ui-connector@2.7.2-alpha.0
  - @orderly.network/utils@2.7.2-alpha.0

## 2.7.1

### Patch Changes

- publish
- bb587ea: publish
- Updated dependencies
- Updated dependencies [bb587ea]
  - @orderly.network/react-app@2.7.1
  - @orderly.network/hooks@2.7.1
  - @orderly.network/i18n@2.7.1
  - @orderly.network/types@2.7.1
  - @orderly.network/ui@2.7.1
  - @orderly.network/ui-connector@2.7.1
  - @orderly.network/utils@2.7.1

## 2.7.1-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.7.1-alpha.0
  - @orderly.network/hooks@2.7.1-alpha.0
  - @orderly.network/i18n@2.7.1-alpha.0
  - @orderly.network/types@2.7.1-alpha.0
  - @orderly.network/ui@2.7.1-alpha.0
  - @orderly.network/ui-connector@2.7.1-alpha.0
  - @orderly.network/utils@2.7.1-alpha.0

## 2.7.0

### Minor Changes

- publish
- 9b0dc27: publish

### Patch Changes

- Updated dependencies
- Updated dependencies [9b0dc27]
  - @orderly.network/react-app@2.7.0
  - @orderly.network/hooks@2.7.0
  - @orderly.network/i18n@2.7.0
  - @orderly.network/types@2.7.0
  - @orderly.network/ui@2.7.0
  - @orderly.network/ui-connector@2.7.0
  - @orderly.network/utils@2.7.0

## 2.7.0-alpha.0

### Minor Changes

- publish

### Patch Changes

- Updated dependencies
  - @orderly.network/react-app@2.7.0-alpha.0
  - @orderly.network/hooks@2.7.0-alpha.0
  - @orderly.network/i18n@2.7.0-alpha.0
  - @orderly.network/types@2.7.0-alpha.0
  - @orderly.network/ui@2.7.0-alpha.0
  - @orderly.network/ui-connector@2.7.0-alpha.0
  - @orderly.network/utils@2.7.0-alpha.0

## 2.6.3

### Patch Changes

- 05c00a2: publish
- publish
- Updated dependencies [05c00a2]
- Updated dependencies
  - @orderly.network/react-app@2.6.3
  - @orderly.network/hooks@2.6.3
  - @orderly.network/i18n@2.6.3
  - @orderly.network/types@2.6.3
  - @orderly.network/ui@2.6.3
  - @orderly.network/ui-connector@2.6.3
  - @orderly.network/utils@2.6.3

## 2.6.3-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.6.3-alpha.0
  - @orderly.network/hooks@2.6.3-alpha.0
  - @orderly.network/i18n@2.6.3-alpha.0
  - @orderly.network/types@2.6.3-alpha.0
  - @orderly.network/ui@2.6.3-alpha.0
  - @orderly.network/ui-connector@2.6.3-alpha.0
  - @orderly.network/utils@2.6.3-alpha.0

## 2.6.2

### Patch Changes

- publish
- 7f81015: publish
- 17613f1: publish
- ea9c8dc: publish
- 8afbe01: publish
- 45b6806: publish
- 2f90f1d: publish
- 12d3b9f: publish
- Updated dependencies
- Updated dependencies [7f81015]
- Updated dependencies [17613f1]
- Updated dependencies [ea9c8dc]
- Updated dependencies [8afbe01]
- Updated dependencies [45b6806]
- Updated dependencies [2f90f1d]
- Updated dependencies [12d3b9f]
  - @orderly.network/react-app@2.6.2
  - @orderly.network/hooks@2.6.2
  - @orderly.network/i18n@2.6.2
  - @orderly.network/types@2.6.2
  - @orderly.network/ui@2.6.2
  - @orderly.network/ui-connector@2.6.2
  - @orderly.network/utils@2.6.2

## 2.6.2-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.6.2-alpha.0
  - @orderly.network/hooks@2.6.2-alpha.0
  - @orderly.network/i18n@2.6.2-alpha.0
  - @orderly.network/types@2.6.2-alpha.0
  - @orderly.network/ui@2.6.2-alpha.0
  - @orderly.network/ui-connector@2.6.2-alpha.0
  - @orderly.network/utils@2.6.2-alpha.0

## 2.6.1

### Patch Changes

- 033ccf8: publish
- publish
- Updated dependencies [033ccf8]
- Updated dependencies
  - @orderly.network/react-app@2.6.1
  - @orderly.network/hooks@2.6.1
  - @orderly.network/i18n@2.6.1
  - @orderly.network/types@2.6.1
  - @orderly.network/ui@2.6.1
  - @orderly.network/ui-connector@2.6.1
  - @orderly.network/utils@2.6.1

## 2.6.1-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.6.1-alpha.0
  - @orderly.network/hooks@2.6.1-alpha.0
  - @orderly.network/i18n@2.6.1-alpha.0
  - @orderly.network/types@2.6.1-alpha.0
  - @orderly.network/ui@2.6.1-alpha.0
  - @orderly.network/ui-connector@2.6.1-alpha.0
  - @orderly.network/utils@2.6.1-alpha.0

## 2.6.0

### Minor Changes

- publish
- c4b5fbc: publish

### Patch Changes

- Updated dependencies
- Updated dependencies [c4b5fbc]
  - @orderly.network/react-app@2.6.0
  - @orderly.network/hooks@2.6.0
  - @orderly.network/i18n@2.6.0
  - @orderly.network/types@2.6.0
  - @orderly.network/ui@2.6.0
  - @orderly.network/ui-connector@2.6.0
  - @orderly.network/utils@2.6.0

## 2.6.0-alpha.0

### Minor Changes

- publish

### Patch Changes

- Updated dependencies
  - @orderly.network/react-app@2.6.0-alpha.0
  - @orderly.network/hooks@2.6.0-alpha.0
  - @orderly.network/i18n@2.6.0-alpha.0
  - @orderly.network/types@2.6.0-alpha.0
  - @orderly.network/ui@2.6.0-alpha.0
  - @orderly.network/ui-connector@2.6.0-alpha.0
  - @orderly.network/utils@2.6.0-alpha.0

## 2.5.3

### Patch Changes

- 798c4eb: publish
- 64c5b75: publish
- publish
- Updated dependencies [798c4eb]
- Updated dependencies [64c5b75]
- Updated dependencies
  - @orderly.network/react-app@2.5.3
  - @orderly.network/hooks@2.5.3
  - @orderly.network/i18n@2.5.3
  - @orderly.network/types@2.5.3
  - @orderly.network/ui@2.5.3
  - @orderly.network/ui-connector@2.5.3
  - @orderly.network/utils@2.5.3

## 2.5.3-alpha.1

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.5.3-alpha.1
  - @orderly.network/hooks@2.5.3-alpha.1
  - @orderly.network/i18n@2.5.3-alpha.1
  - @orderly.network/types@2.5.3-alpha.1
  - @orderly.network/ui@2.5.3-alpha.1
  - @orderly.network/ui-connector@2.5.3-alpha.1
  - @orderly.network/utils@2.5.3-alpha.1

## 2.5.3-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.5.3-alpha.0
  - @orderly.network/hooks@2.5.3-alpha.0
  - @orderly.network/i18n@2.5.3-alpha.0
  - @orderly.network/types@2.5.3-alpha.0
  - @orderly.network/ui@2.5.3-alpha.0
  - @orderly.network/ui-connector@2.5.3-alpha.0
  - @orderly.network/utils@2.5.3-alpha.0

## 2.5.2

### Patch Changes

- 13daa3f: publish
- publish
- Updated dependencies [13daa3f]
- Updated dependencies
  - @orderly.network/react-app@2.5.2
  - @orderly.network/hooks@2.5.2
  - @orderly.network/i18n@2.5.2
  - @orderly.network/types@2.5.2
  - @orderly.network/ui@2.5.2
  - @orderly.network/ui-connector@2.5.2
  - @orderly.network/utils@2.5.2

## 2.5.2-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.5.2-alpha.0
  - @orderly.network/hooks@2.5.2-alpha.0
  - @orderly.network/i18n@2.5.2-alpha.0
  - @orderly.network/types@2.5.2-alpha.0
  - @orderly.network/ui@2.5.2-alpha.0
  - @orderly.network/ui-connector@2.5.2-alpha.0
  - @orderly.network/utils@2.5.2-alpha.0

## 2.5.1

### Patch Changes

- publish
- 5ad8a1b: publish
- Updated dependencies
- Updated dependencies [5ad8a1b]
  - @orderly.network/react-app@2.5.1
  - @orderly.network/hooks@2.5.1
  - @orderly.network/i18n@2.5.1
  - @orderly.network/types@2.5.1
  - @orderly.network/ui@2.5.1
  - @orderly.network/ui-connector@2.5.1
  - @orderly.network/utils@2.5.1

## 2.5.1-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.5.1-alpha.0
  - @orderly.network/hooks@2.5.1-alpha.0
  - @orderly.network/i18n@2.5.1-alpha.0
  - @orderly.network/types@2.5.1-alpha.0
  - @orderly.network/ui@2.5.1-alpha.0
  - @orderly.network/ui-connector@2.5.1-alpha.0
  - @orderly.network/utils@2.5.1-alpha.0

## 2.5.0

### Minor Changes

- 0e3a9ce: publish
- 86eeea2: publish
- publish

### Patch Changes

- 728895d: publish
- Updated dependencies [0e3a9ce]
- Updated dependencies [86eeea2]
- Updated dependencies [728895d]
- Updated dependencies
  - @orderly.network/react-app@2.5.0
  - @orderly.network/hooks@2.5.0
  - @orderly.network/i18n@2.5.0
  - @orderly.network/types@2.5.0
  - @orderly.network/ui@2.5.0
  - @orderly.network/ui-connector@2.5.0
  - @orderly.network/utils@2.5.0

## 2.5.0-alpha.2

### Minor Changes

- publish

### Patch Changes

- Updated dependencies
  - @orderly.network/react-app@2.5.0-alpha.2
  - @orderly.network/hooks@2.5.0-alpha.2
  - @orderly.network/i18n@2.5.0-alpha.2
  - @orderly.network/types@2.5.0-alpha.2
  - @orderly.network/ui@2.5.0-alpha.2
  - @orderly.network/ui-connector@2.5.0-alpha.2
  - @orderly.network/utils@2.5.0-alpha.2

## 2.5.0-alpha.1

### Minor Changes

- publish

### Patch Changes

- Updated dependencies
  - @orderly.network/react-app@2.5.0-alpha.1
  - @orderly.network/hooks@2.5.0-alpha.1
  - @orderly.network/i18n@2.5.0-alpha.1
  - @orderly.network/types@2.5.0-alpha.1
  - @orderly.network/ui@2.5.0-alpha.1
  - @orderly.network/ui-connector@2.5.0-alpha.1
  - @orderly.network/utils@2.5.0-alpha.1

## 2.4.2-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.4.2-alpha.0
  - @orderly.network/hooks@2.4.2-alpha.0
  - @orderly.network/i18n@2.4.2-alpha.0
  - @orderly.network/types@2.4.2-alpha.0
  - @orderly.network/ui@2.4.2-alpha.0
  - @orderly.network/ui-connector@2.4.2-alpha.0
  - @orderly.network/utils@2.4.2-alpha.0

## 2.4.1

### Patch Changes

- publish
- 5a220e0: publish
- Updated dependencies
- Updated dependencies [5a220e0]
  - @orderly.network/react-app@2.4.1
  - @orderly.network/hooks@2.4.1
  - @orderly.network/i18n@2.4.1
  - @orderly.network/types@2.4.1
  - @orderly.network/ui@2.4.1
  - @orderly.network/ui-connector@2.4.1
  - @orderly.network/utils@2.4.1

## 2.4.1-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.4.1-alpha.0
  - @orderly.network/hooks@2.4.1-alpha.0
  - @orderly.network/i18n@2.4.1-alpha.0
  - @orderly.network/types@2.4.1-alpha.0
  - @orderly.network/ui@2.4.1-alpha.0
  - @orderly.network/ui-connector@2.4.1-alpha.0
  - @orderly.network/utils@2.4.1-alpha.0

## 2.4.0

### Minor Changes

- decb695: publish
- publish

### Patch Changes

- Updated dependencies [decb695]
- Updated dependencies
  - @orderly.network/react-app@2.4.0
  - @orderly.network/hooks@2.4.0
  - @orderly.network/i18n@2.4.0
  - @orderly.network/types@2.4.0
  - @orderly.network/ui@2.4.0
  - @orderly.network/ui-connector@2.4.0
  - @orderly.network/utils@2.4.0

## 2.4.0-alpha.0

### Minor Changes

- publish

### Patch Changes

- Updated dependencies
  - @orderly.network/react-app@2.4.0-alpha.0
  - @orderly.network/hooks@2.4.0-alpha.0
  - @orderly.network/i18n@2.4.0-alpha.0
  - @orderly.network/types@2.4.0-alpha.0
  - @orderly.network/ui@2.4.0-alpha.0
  - @orderly.network/ui-connector@2.4.0-alpha.0
  - @orderly.network/utils@2.4.0-alpha.0

## 2.3.2

### Patch Changes

- 311e2a7: publish
- publish
- Updated dependencies [311e2a7]
- Updated dependencies
  - @orderly.network/react-app@2.3.2
  - @orderly.network/hooks@2.3.2
  - @orderly.network/i18n@2.3.2
  - @orderly.network/types@2.3.2
  - @orderly.network/ui@2.3.2
  - @orderly.network/ui-connector@2.3.2
  - @orderly.network/utils@2.3.2

## 2.3.2-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.3.2-alpha.0
  - @orderly.network/hooks@2.3.2-alpha.0
  - @orderly.network/i18n@2.3.2-alpha.0
  - @orderly.network/types@2.3.2-alpha.0
  - @orderly.network/ui@2.3.2-alpha.0
  - @orderly.network/ui-connector@2.3.2-alpha.0
  - @orderly.network/utils@2.3.2-alpha.0

## 2.3.1

### Patch Changes

- b2ca83a: publish
- publish
- Updated dependencies [b2ca83a]
- Updated dependencies
  - @orderly.network/react-app@2.3.1
  - @orderly.network/hooks@2.3.1
  - @orderly.network/i18n@2.3.1
  - @orderly.network/trading@2.3.1
  - @orderly.network/types@2.3.1
  - @orderly.network/ui@2.3.1
  - @orderly.network/ui-connector@2.3.1
  - @orderly.network/utils@2.3.1

## 2.3.1-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.3.1-alpha.0
  - @orderly.network/hooks@2.3.1-alpha.0
  - @orderly.network/i18n@2.3.1-alpha.0
  - @orderly.network/trading@2.3.1-alpha.0
  - @orderly.network/types@2.3.1-alpha.0
  - @orderly.network/ui@2.3.1-alpha.0
  - @orderly.network/ui-connector@2.3.1-alpha.0
  - @orderly.network/utils@2.3.1-alpha.0

## 2.3.0

### Minor Changes

- publish
- 4e5f109: publish

### Patch Changes

- Updated dependencies
- Updated dependencies [4e5f109]
  - @orderly.network/react-app@2.3.0
  - @orderly.network/hooks@2.3.0
  - @orderly.network/i18n@2.3.0
  - @orderly.network/trading@2.3.0
  - @orderly.network/types@2.3.0
  - @orderly.network/ui@2.3.0
  - @orderly.network/ui-connector@2.3.0
  - @orderly.network/utils@2.3.0

## 2.3.0-alpha.0

### Minor Changes

- publish

### Patch Changes

- Updated dependencies
  - @orderly.network/react-app@2.3.0-alpha.0
  - @orderly.network/hooks@2.3.0-alpha.0
  - @orderly.network/i18n@2.3.0-alpha.0
  - @orderly.network/trading@2.3.0-alpha.0
  - @orderly.network/types@2.3.0-alpha.0
  - @orderly.network/ui@2.3.0-alpha.0
  - @orderly.network/ui-connector@2.3.0-alpha.0
  - @orderly.network/utils@2.3.0-alpha.0

## 2.2.0

### Minor Changes

- e1badae: publish
- publish

### Patch Changes

- Updated dependencies [e1badae]
- Updated dependencies
  - @orderly.network/react-app@2.2.0
  - @orderly.network/hooks@2.2.0
  - @orderly.network/i18n@2.2.0
  - @orderly.network/trading@2.2.0
  - @orderly.network/types@2.2.0
  - @orderly.network/ui@2.2.0
  - @orderly.network/ui-connector@2.2.0
  - @orderly.network/utils@2.2.0

## 2.2.0-alpha.0

### Minor Changes

- publish

### Patch Changes

- Updated dependencies
  - @orderly.network/react-app@2.2.0-alpha.0
  - @orderly.network/hooks@2.2.0-alpha.0
  - @orderly.network/i18n@2.2.0-alpha.0
  - @orderly.network/trading@2.2.0-alpha.0
  - @orderly.network/types@2.2.0-alpha.0
  - @orderly.network/ui@2.2.0-alpha.0
  - @orderly.network/ui-connector@2.2.0-alpha.0
  - @orderly.network/utils@2.2.0-alpha.0

## 2.1.3

### Patch Changes

- publish
- 5ba2a31a8: publish
- Updated dependencies
- Updated dependencies [5ba2a31a8]
  - @orderly.network/react-app@2.1.3
  - @orderly.network/hooks@2.1.3
  - @orderly.network/i18n@2.1.3
  - @orderly.network/trading@2.1.3
  - @orderly.network/types@2.1.3
  - @orderly.network/ui@2.1.3
  - @orderly.network/ui-connector@2.1.3
  - @orderly.network/utils@2.1.3

## 2.1.3-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.1.3-alpha.0
  - @orderly.network/hooks@2.1.3-alpha.0
  - @orderly.network/i18n@2.1.3-alpha.0
  - @orderly.network/trading@2.1.3-alpha.0
  - @orderly.network/types@2.1.3-alpha.0
  - @orderly.network/ui@2.1.3-alpha.0
  - @orderly.network/ui-connector@2.1.3-alpha.0
  - @orderly.network/utils@2.1.3-alpha.0

## 2.1.2

### Patch Changes

- publish
- 7874fa6dd: publish
- Updated dependencies
- Updated dependencies [7874fa6dd]
  - @orderly.network/react-app@2.1.2
  - @orderly.network/hooks@2.1.2
  - @orderly.network/i18n@2.1.2
  - @orderly.network/trading@2.1.2
  - @orderly.network/types@2.1.2
  - @orderly.network/ui@2.1.2
  - @orderly.network/ui-connector@2.1.2
  - @orderly.network/utils@2.1.2

## 2.1.2-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.1.2-alpha.0
  - @orderly.network/hooks@2.1.2-alpha.0
  - @orderly.network/i18n@2.1.2-alpha.0
  - @orderly.network/trading@2.1.2-alpha.0
  - @orderly.network/types@2.1.2-alpha.0
  - @orderly.network/ui@2.1.2-alpha.0
  - @orderly.network/ui-connector@2.1.2-alpha.0
  - @orderly.network/utils@2.1.2-alpha.0

## 2.1.1

### Patch Changes

- publish
- 0b52044b6: publish
- Updated dependencies
- Updated dependencies [0b52044b6]
  - @orderly.network/react-app@2.1.1
  - @orderly.network/hooks@2.1.1
  - @orderly.network/i18n@2.1.1
  - @orderly.network/trading@2.1.1
  - @orderly.network/types@2.1.1
  - @orderly.network/ui@2.1.1
  - @orderly.network/ui-connector@2.1.1
  - @orderly.network/utils@2.1.1

## 2.1.1-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.1.1-alpha.0
  - @orderly.network/hooks@2.1.1-alpha.0
  - @orderly.network/i18n@2.1.1-alpha.0
  - @orderly.network/trading@2.1.1-alpha.0
  - @orderly.network/types@2.1.1-alpha.0
  - @orderly.network/ui@2.1.1-alpha.0
  - @orderly.network/ui-connector@2.1.1-alpha.0
  - @orderly.network/utils@2.1.1-alpha.0

## 2.1.0

### Minor Changes

- publish

### Patch Changes

- ba163f4ce: publish
- Updated dependencies [ba163f4ce]
- Updated dependencies
  - @orderly.network/react-app@2.1.0
  - @orderly.network/hooks@2.1.0
  - @orderly.network/i18n@2.1.0
  - @orderly.network/trading@2.1.0
  - @orderly.network/types@2.1.0
  - @orderly.network/ui@2.1.0
  - @orderly.network/ui-connector@2.1.0
  - @orderly.network/utils@2.1.0

## 2.0.8-alpha.0

### Patch Changes

- publish
- Updated dependencies
  - @orderly.network/react-app@2.0.8-alpha.0
  - @orderly.network/hooks@2.0.8-alpha.0
  - @orderly.network/i18n@2.0.8-alpha.0
  - @orderly.network/trading@2.0.8-alpha.0
  - @orderly.network/types@2.0.8-alpha.0
  - @orderly.network/ui@2.0.8-alpha.0
  - @orderly.network/ui-connector@2.0.8-alpha.0
  - @orderly.network/utils@2.0.8-alpha.0
