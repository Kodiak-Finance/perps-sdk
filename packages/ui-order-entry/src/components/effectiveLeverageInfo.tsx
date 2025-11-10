import React from "react";
import { EffectiveLeverageResult } from "@kodiak-finance/orderly-hooks";
import { Flex, Text, cn, Tooltip } from "@kodiak-finance/orderly-ui";
import { Decimal } from "@kodiak-finance/orderly-utils";

type EffectiveLeverageInfoProps = {
  result?: EffectiveLeverageResult;
  hasOrderQty?: boolean;
  className?: string;
};

export const EffectiveLeverageInfo: React.FC<EffectiveLeverageInfoProps> = ({
  result,
  hasOrderQty,
  className,
}) => {
  if (!result || !result.isConstrained || !hasOrderQty) {
    return null;
  }

  const { selectedLeverage, effectiveLeverage, constraintMessage } = result;

  const formatLev = (value: number) =>
    Math.floor(new Decimal(value).toNumber());

  return (
    <Tooltip
      title={
        constraintMessage ||
        "Effective leverage is constrained by position size"
      }
      side="top"
    >
      <Flex
        className={cn(
          "oui-rounded oui-border oui-border-orange-500/50 oui-bg-orange-500/10",
          "oui-px-3 oui-py-2",
          "oui-gap-x-2",
          className,
        )}
        itemAlign="center"
      >
        <span className="oui-text-orange-400 oui-text-sm">⚠️</span>
        <div className="oui-flex-1">
          <Text size="xs" intensity={80}>
            Selected:{" "}
            <span className="oui-font-semibold oui-line-through">
              {formatLev(selectedLeverage)}x
            </span>
            {" → "}
            Effective:{" "}
            <span className="oui-font-semibold oui-text-orange-400">
              {formatLev(effectiveLeverage)}x
            </span>
          </Text>
        </div>
      </Flex>
    </Tooltip>
  );
};
