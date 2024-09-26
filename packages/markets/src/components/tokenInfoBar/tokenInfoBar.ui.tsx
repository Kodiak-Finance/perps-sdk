import {
  TokenIcon,
  Flex,
  Text,
  cn,
  Divider,
  Tooltip,
} from "@orderly.network/ui";
import { UseTokenInfoBarScriptReturn } from "./tokenInfoBar.script";
import { FavoritesDropdownMenuWidget } from "../favoritesDropdownMenu";
import {
  ArrowLeftIcon,
  FavoritesIcon2,
  TriangleDownIcon,
  UnFavoritesIcon2,
} from "../../icons";
import { Decimal } from "@orderly.network/utils";
import { CSSProperties, ReactNode, useMemo } from "react";
import { DropDownMarketsWidget } from "../dropDownMarkets";
import { MarketsProviderProps } from "../marketsProvider";

export type Layout = "left" | "right";

export type TokenInfoBarProps = Pick<MarketsProviderProps, "onSymbolChange"> &
  UseTokenInfoBarScriptReturn & {
    className?: string;
    trailing?: ReactNode;
    height?: CSSProperties["height"];
  };

export const TokenInfoBar: React.FC<TokenInfoBarProps> = (props) => {
  const {
    symbol,
    isFavorite,
    favorite,
    data,
    quotoDp,
    openInterest,
    fundingRate,
    containerRef,
    leadingElementRef,
    tailingElementRef,
    leadingVisible,
    tailingVisible,
    onScoll,
    height,
  } = props;

  const favoriteIcon = (
    <FavoritesDropdownMenuWidget row={{ symbol }} favorite={favorite}>
      <Flex
        width={12}
        height={12}
        justify="center"
        itemAlign="center"
        className="oui-cursor-pointer oui-mr-1"
      >
        {isFavorite ? (
          <FavoritesIcon2 className="oui-w-3 oui-h-3 oui-text-[rgba(255,154,46,1)]" />
        ) : (
          <UnFavoritesIcon2 className="oui-w-3 oui-h-3 oui-text-base-contrast-36 hover:oui-text-[rgba(255,154,46,1)]" />
        )}
      </Flex>
    </FavoritesDropdownMenuWidget>
  );

  const symbolView = (
    <DropDownMarketsWidget
      contentClassName="oui-w-[429px] oui-h-[496px]"
      onSymbolChange={props.onSymbolChange}
    >
      <Flex gapX={1} className="oui-cursor-pointer">
        <TokenIcon symbol={symbol} className="oui-w-4 oui-h-4" />
        <Text.formatted
          className="oui-break-normal oui-whitespace-nowrap"
          rule="symbol"
          formatString="base-type"
          size="2xs"
          weight="semibold"
        >
          {symbol}
        </Text.formatted>
        <TriangleDownIcon className="oui-text-base-contrast-54" />
      </Flex>
    </DropDownMarketsWidget>
  );

  const price = (
    <Text.numeral dp={quotoDp || 2} currency="$">
      {data?.["24h_close"]}
    </Text.numeral>
  );

  const change = (
    <>
      <Text.numeral coloring rm={Decimal.ROUND_DOWN} showIdentifier>
        {data?.["24h_change"]!}
      </Text.numeral>
      <Text intensity={36}>/</Text>
      <Text.numeral
        rule="percentages"
        coloring
        rm={Decimal.ROUND_DOWN}
        showIdentifier
      >
        {data?.["change"]!}
      </Text.numeral>
    </>
  );

  const fundingRateView = useMemo(() => {
    if (data?.est_funding_rate === null) {
      return "--";
    }

    return (
      <div className="">
        <Text.numeral unit="%" dp={4} className="oui-text-[#FF9A2E]">
          {fundingRate.est_funding_rate!}
        </Text.numeral>
        <Text
          intensity={36}
          className="oui-tabular-nums"
        >{` in ${fundingRate.countDown}`}</Text>
      </div>
    );
  }, [fundingRate]);

  return (
    <Flex className={cn("oui-font-semibold", props.className)} height={height}>
      <Flex gapX={6} className="oui-flex-1 oui-overflow-hidden oui-h-full">
        <Flex gapX={1}>
          {favoriteIcon}
          {symbolView}
        </Flex>
        <Divider className="oui-h-[26px]" direction="vertical" intensity={8} />
        {price}
        <div className="oui-relative oui-overflow-hidden oui-h-full">
          <div
            ref={containerRef}
            className="oui-overflow-x-auto hide-scrollbar oui-h-full"
          >
            <Flex gapX={8} height="100%">
              <div ref={leadingElementRef}>
                <DataItem
                  label="24h Cha
                
                
                nge"
                  value={change}
                />
              </div>
              <DataItem
                label="Mark"
                value={<Text.numeral>{data?.["mark_price"]}</Text.numeral>}
                hint="Price for the computation of unrealized PnL and liquidation."
              />
              <DataItem
                label="Index"
                value={<Text.numeral>{data?.["index_price"]}</Text.numeral>}
                hint="Average of the last prices across other exchanges."
              />
              <DataItem
                label="24h volume"
                value={
                  <Text.numeral rule="price" dp={quotoDp}>
                    {data?.["24h_amount"]}
                  </Text.numeral>
                }
                hint="24 hour total trading volume on the Orderly Network."
              />
              <DataItem
                label="Pred. funding rate"
                value={fundingRateView}
                hint="Funding rates are payments between traders who are long and short. When positive, long positions pay short positions funding. When negative, short positions pay long positions."
              />
              <div ref={tailingElementRef}>
                <DataItem
                  label="Open interest"
                  value={
                    <>
                      <Text.numeral rule="price">{openInterest}</Text.numeral>
                      <Text intensity={36}>{` USDC`}</Text>
                    </>
                  }
                  hint="Total size of positions per side."
                />
              </div>
            </Flex>
          </div>
          <ScrollIndicator leading onClick={onScoll} visible={leadingVisible} />
          <ScrollIndicator tailing onClick={onScoll} visible={tailingVisible} />
        </div>
      </Flex>
      {props.trailing}
    </Flex>
  );
};

type DataItemProps = {
  label: string;
  value: ReactNode;
  hint?: string;
};

const DataItem: React.FC<DataItemProps> = (props) => {
  return (
    <Flex direction="column" itemAlign="start">
      <Tooltip
        content={props.hint}
        className="oui-max-w-[240px] oui-bg-base-6"
        arrow={{ className: "oui-fill-base-6" }}
      >
        <Text
          size="2xs"
          intensity={36}
          className={cn(
            "oui-break-normal oui-whitespace-nowrap",
            props.hint &&
              "oui-cursor-pointer oui-border-b oui-border-dashed oui-border-base-contrast-36"
          )}
        >
          {props.label}
        </Text>
      </Tooltip>
      <Text
        size="2xs"
        intensity={98}
        className="oui-leading-[20px] oui-break-normal oui-whitespace-nowrap"
      >
        {props.value}
      </Text>
    </Flex>
  );
};

type ScrollIndicatorProps = {
  tailing?: boolean;
  leading?: boolean;
  visible?: boolean;
  onClick?: (direction: string) => void;
};

const ScrollIndicator: React.FC<ScrollIndicatorProps> = (props) => {
  const { visible, leading, tailing, onClick } = props;
  if (!visible) return null;

  return (
    <button
      onClick={() => {
        onClick?.(leading ? "left" : "right");
      }}
      style={{
        background:
          "linear-gradient(90deg, #07080A 0%, rgba(7, 8, 10, 0.60) 65%, rgba(7, 8, 10, 0.00) 100%)",
      }}
      className={cn(
        "oui-flex oui-items-center oui-w-[80px]",
        "oui-absolute oui-top-0 oui-bottom-0 oui-rounded-l",
        leading && "oui-left-0 oui-pl-1",
        tailing && "oui-right-0 oui-pr-1 oui-rotate-180"
      )}
    >
      <ArrowLeftIcon className="oui-text-base-contrast-54 hover:oui-text-base-contrast-80" />
    </button>
  );
};
