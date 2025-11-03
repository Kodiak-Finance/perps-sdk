import { createElement } from "react";
import { SDK_VERSION } from "@kodiak-finance/orderly-react-app";
import type { FooterProps } from "@kodiak-finance/orderly-ui-scaffold";

export const footerConfig: FooterProps = {
  telegramUrl: "https://orderly.network",
  discordUrl: "https://discord.com/invite/orderlynetwork",
  twitterUrl: "https://twitter.com/OrderlyNetwork",
  trailing: createElement(
    "span",
    { className: "oui-text-[10px] oui-text-white/54" },
    `v${SDK_VERSION}`,
  ),
};
