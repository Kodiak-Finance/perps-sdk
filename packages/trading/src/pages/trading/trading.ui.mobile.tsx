import { FC } from "react";
import { TradingState } from "./trading.script";
import { TopTabWidget } from "../../components/mobile/topTab";
import { OrderBookAndEntryWidget } from "../../components/mobile/orderBookAndEntry";
import {
  MarketsSheetWidget,
  TokenInfoBarWidget,
} from "@orderly.network/markets";
import { Box, SimpleSheet } from "@orderly.network/ui";
import { SecondaryLogo } from "../../components/base/secondaryLogo";
import { DataListWidget } from "../../components/mobile/dataList";
import { BottomNavBarWidget } from "../../components/mobile/bottomNavBar";

export const MobileLayout: FC<TradingState> = (props) => {
  const onSymbol = () => {
    props.onOpenMarketsSheetChange(true);
  };

  const topBar = (
    <Box intensity={900} px={3} height={54}>
      <TokenInfoBarWidget
        symbol={props.symbol}
        trailing={<SecondaryLogo />}
        onSymbol={onSymbol}
      />
      <SimpleSheet
        open={props.openMarketsSheet}
        onOpenChange={props.onOpenMarketsSheetChange}
        classNames={{
          content: "oui-w-[280px] !oui-p-0 oui-rounded-bl-[40px]",
        }}
        contentProps={{ side: "left", closeable: false }}
      >
        <MarketsSheetWidget
          symbol={props.symbol}
          onSymbolChange={(symbol) => {
            console.log("onSymbolChange", symbol);
            props.onOpenMarketsSheetChange(false);
          }}
        />
      </SimpleSheet>
    </Box>
  );

  return (
    <div className="oui-grid oui-grid-rows-[auto,1fr,auto] oui-h-full oui-gap-1 oui-pb-[64px] oui-relative oui-bg-base-10">
      <header>{topBar}</header>

      <main className="oui-overflow-y-auto oui-hide-scrollbar oui-space-y-1">
        <TopTabWidget className="oui-mx-1 oui-bg-base-9 oui-rounded-xl" />
        <OrderBookAndEntryWidget />
        <DataListWidget
          symbol={props.symbol}
          className="oui-mx-1 oui-rounded-xl"
          sharePnLConfig={props.sharePnLConfig}
        />
      </main>

      <div className="oui-fixed oui-left-0 oui-right-0 oui-bottom-0">
        <BottomNavBarWidget />
      </div>
    </div>
  );
};
