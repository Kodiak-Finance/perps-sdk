import { useMemo } from "react";
import { account } from "@kodiak-finance/orderly-perp";
import { Decimal } from "@kodiak-finance/orderly-utils";
import { useAccountInfo } from "./appStore";
import { useMarkPrice } from "./useMarkPrice";
import { useMaxLeverage } from "./useMaxLeverage";
import { useSymbolsInfo } from "./useSymbolsInfo";

export type UseEffectiveLeverageInputs = {
  symbol: string;
  positionQty?: number;
  positionPrice?: number;
  orderQty?: number;
  orderPrice?: number;
  selectedLeverage?: number;
};

export type EffectiveLeverageResult = {
  selectedLeverage: number;
  effectiveLeverage: number;
  displayLeverage: number;
  imr: number;
  isConstrained: boolean;
  constraintMessage?: string;
};

/**
 * Calculates effective leverage based on position/order size and margin requirements.
 * Returns selected, effective, and display leverage values.
 *
 * Formula: EffectiveLeverage = 1 / IMR where IMR constrains based on notional size
 */
export const useEffectiveLeverage = (
  inputs: UseEffectiveLeverageInputs,
): EffectiveLeverageResult => {
  const {
    symbol,
    positionQty = 0,
    positionPrice,
    orderQty = 0,
    orderPrice,
    selectedLeverage: inputSelectedLeverage,
  } = inputs;

  const accountInfo = useAccountInfo();
  const symbolsInfo = useSymbolsInfo();
  const maxLeverage = useMaxLeverage(symbol);
  const markPriceData = useMarkPrice(symbol);
  const markPrice = markPriceData?.data ?? 0;

  return useMemo(() => {
    const effectivePositionPrice = positionPrice ?? markPrice;
    const effectiveOrderPrice = orderPrice ?? markPrice;

    const positionNotional = Math.abs(
      new Decimal(positionQty).mul(effectivePositionPrice).toNumber(),
    );
    const orderNotional = Math.abs(
      new Decimal(orderQty).mul(effectiveOrderPrice).toNumber(),
    );

    const symbolInfo = symbolsInfo[symbol];
    const baseIMR = symbolInfo("base_imr");
    const selectedLeverage = inputSelectedLeverage ?? maxLeverage;

    if (baseIMR === undefined || baseIMR === null) {
      return {
        selectedLeverage,
        effectiveLeverage: maxLeverage,
        displayLeverage: Math.min(selectedLeverage, maxLeverage),
        imr: 1 / maxLeverage,
        isConstrained: false,
        constraintMessage: undefined,
      };
    }

    const imrFactor = accountInfo?.imr_factor?.[symbol] ?? 0;

    const calculatedIMR = account.IMR({
      maxLeverage,
      baseIMR,
      IMR_Factor: imrFactor,
      positionNotional,
      ordersNotional: orderNotional,
      IMR_factor_power: 4 / 5,
    });

    const effectiveLeverage = 1 / calculatedIMR;
    const displayLeverage = Math.min(selectedLeverage, effectiveLeverage);
    const isConstrained = effectiveLeverage < selectedLeverage;

    let constraintMessage: string | undefined;
    if (isConstrained) {
      const totalNotional = new Decimal(positionNotional).add(orderNotional);
      constraintMessage = `For this position size ($${totalNotional.toFixed(
        2,
      )}), the maximum effective leverage is ${Math.floor(effectiveLeverage)}x`;
    }

    return {
      selectedLeverage,
      effectiveLeverage,
      displayLeverage,
      imr: calculatedIMR,
      isConstrained,
      constraintMessage,
    };
  }, [
    symbol,
    symbolsInfo,
    accountInfo,
    positionQty,
    positionPrice,
    orderQty,
    orderPrice,
    markPrice,
    inputSelectedLeverage,
    maxLeverage,
  ]);
};
