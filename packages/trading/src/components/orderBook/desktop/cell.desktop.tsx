import { FC, useContext, useMemo } from "react";
import { getPrecisionByNumber } from "@orderly.network/utils";
import { OrderBookCellType } from "../types";
import { OrderBookContext, useOrderBookContext } from "../orderContext";
import { cn, parseNumber, Text } from "@orderly.network/ui";
import { CellBar, CellBarDirection } from "../cellBar";
import { BasicSymbolInfo } from "../../../types/types";

export interface DesktopOrderBookCellProps {
  background: string;
  maxQty: number;
  price: number;
  quantity: number;
  // size: number;
  count: number;
  accumulated: number;
  accumulatedAmount: number;
  type: OrderBookCellType;
  symbolInfo: BasicSymbolInfo;

  isHover: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const DesktopOrderBookCell: FC<DesktopOrderBookCellProps> = (props) => {
  const { cellHeight, showTotal, onItemClick, depth, pendingOrders } =
    useOrderBookContext();
  const { symbolInfo } = props;
  const { base_dp, quote_dp } = symbolInfo;

  const width = Number.isNaN(props.price)
    ? 0
    : (props.accumulated / props.count) * 100;

  const dp = useMemo(() => {
    return getPrecisionByNumber(depth || `${quote_dp}`);
  }, [depth, quote_dp]);

  const totalAmount = Number.isNaN(props.accumulated)
    ? "-"
    : props.accumulatedAmount?.toString();

  const isPendingOrder = useMemo(() => {
    const priceStr = parseNumber(props.price, { dp: dp, padding: true });

    const index = pendingOrders.findIndex(
      (item) => priceStr === parseNumber(item, { dp: dp, padding: true })
    );

    return index !== -1;
  }, [pendingOrders, props.price, depth]);

  return (
    <div
      className="oui-flex oui-flex-row oui-tabular-nums oui-justify-between oui-text-base-contrast-80 oui-text-3xs oui-relative oui-cursor-pointer"
      style={{ height: `${cellHeight}px` }}
      onClick={() => {
        if (Number.isNaN(props.price) || Number.isNaN(props.quantity)) return;
        onItemClick?.([props.price, props.quantity]);
      }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <div
        className={cn(
          "oui-basis-7/12 oui-flex oui-felx-row oui-items-center oui-mr-2",
          showTotal && "oui-basis-5/12"
        )}
      >
        <div
          className={cn(
            "oui-flex-1 oui-text-left",
            props.type === OrderBookCellType.ASK
              ? "oui-text-trade-loss"
              : "oui-text-trade-profit"
          )}
        >
          <Text.numeral dp={dp}>{props.price}</Text.numeral>
        </div>
        <div className="oui-flex-1 oui-text-right oui-text-base-contrast-80">
          <Text.numeral dp={base_dp}>{props.quantity}</Text.numeral>
        </div>
      </div>
      <div
        className={cn(
          "oui-basis-5/12 oui-flex oui-items-center oui-fex-row oui-overflow-hidden oui-relative",
          showTotal && "oui-basis-7/12"
        )}
      >
        <div
          className={cn(
            "oui-flex-1 oui-pr-6 oui-text-right",
            showTotal && "oui-pr-3"
          )}
        >
          <Text.numeral dp={base_dp} className="oui-z-10">
            {props.accumulated}
          </Text.numeral>
        </div>
        {showTotal && (
          <div className="oui-flex-1 oui-text-right oui-pr-3">
            <Text.numeral dp={2} className="oui-z-10">
              {totalAmount}
            </Text.numeral>
          </div>
        )}
        <CellBar
          width={width}
          direction={CellBarDirection.LEFT_TO_RIGHT}
          className={
            props.type === OrderBookCellType.ASK
              ? "oui-bg-trade-loss/10"
              : "oui-bg-trade-profit/10"
          }
        />
      </div>

      {isPendingOrder && (
        <div
          className={cn(
            "oui-absolute oui-rounded-full oui-left-[-8px] oui-h-[4px] oui-w-[4px] oui-pointer-events-none",
            props.type === OrderBookCellType.ASK && "oui-bg-trade-loss",
            props.type === OrderBookCellType.BID && "oui-bg-trade-profit"
          )}
          style={{ top: `${cellHeight / 2 - 2}px` }}
        />
      )}

      {props.isHover && (
        <div className="oui-absolute oui-bg-white oui-left-0 oui-right-0 oui-top-0 oui-bottom-0 oui-opacity-10"></div>
      )}
    </div>
  );
};
