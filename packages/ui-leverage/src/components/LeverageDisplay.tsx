import React from "react";
import { Flex, Text, Tooltip, cn } from "@kodiak-finance/orderly-ui";
import { Decimal } from "@kodiak-finance/orderly-utils";

export type LeverageDisplayProps = {
  selectedLeverage: number;
  effectiveLeverage: number;
  isConstrained: boolean;
  constraintMessage?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  showBothAlways?: boolean;
};

export const LeverageDisplay: React.FC<LeverageDisplayProps> = ({
  selectedLeverage,
  effectiveLeverage,
  isConstrained,
  constraintMessage,
  className,
  size = "md",
  label = "Cross",
  showBothAlways = false,
}) => {
  const displayLeverage = Math.min(selectedLeverage, effectiveLeverage);

  const sizeConfig = {
    sm: { text: "text-xs", badge: "oui-h-6" },
    md: { text: "text-sm", badge: "oui-h-8" },
    lg: { text: "text-base", badge: "oui-h-10" },
  };

  const config = sizeConfig[size];
  const formatLeverage = (value: number) =>
    Math.floor(new Decimal(value).toNumber());

  if (!isConstrained && !showBothAlways) {
    return (
      <Flex
        justify="center"
        itemAlign="center"
        gapX={1}
        className={cn(
          config.badge,
          "oui-rounded oui-border oui-border-line oui-bg-base-6",
          "oui-select-none oui-font-semibold oui-text-base-contrast-54",
          className,
        )}
      >
        <Text className={config.text}>{label}</Text>
        <Text.numeral className={config.text} dp={0} unit="X">
          {displayLeverage}
        </Text.numeral>
      </Flex>
    );
  }

  return (
    <Tooltip
      title={
        constraintMessage ||
        "Effective leverage is constrained by position size"
      }
      side="top"
    >
      <Flex
        justify="center"
        itemAlign="center"
        gapX={1}
        className={cn(
          config.badge,
          "oui-rounded oui-border",
          isConstrained
            ? "oui-border-orange-500 oui-bg-orange-500/10"
            : "oui-border-line oui-bg-base-6",
          "oui-select-none oui-font-semibold",
          isConstrained ? "oui-text-orange-400" : "oui-text-base-contrast-54",
          className,
        )}
      >
        <Text className={config.text}>{label}</Text>
        <Flex itemAlign="center" gapX={1} className={config.text}>
          <Text
            className={cn(isConstrained && "oui-line-through oui-opacity-50")}
          >
            <Text.numeral dp={0} unit="X">
              {formatLeverage(selectedLeverage)}
            </Text.numeral>
          </Text>

          {isConstrained && (
            <span className="oui-text-xs oui-opacity-70">→</span>
          )}

          <Text className={isConstrained ? "oui-font-bold" : ""}>
            <Text.numeral dp={0} unit="X">
              {formatLeverage(effectiveLeverage)}
            </Text.numeral>
          </Text>
        </Flex>

        {isConstrained && <span className="oui-text-sm oui-ml-1">⚠️</span>}
      </Flex>
    </Tooltip>
  );
};

export const SimpleLeverageDisplay: React.FC<
  Omit<
    LeverageDisplayProps,
    "isConstrained" | "constraintMessage" | "showBothAlways"
  >
> = (props) => {
  return (
    <LeverageDisplay {...props} isConstrained={false} showBothAlways={false} />
  );
};
