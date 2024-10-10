import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { PNL_Values, PnLMode } from "./useBuilder.script";
import { useLocalStorage } from "@orderly.network/hooks";
import { cn, Flex, Text } from "@orderly.network/ui";

type TipType = "ROI" | "PnL" | "Error";

export type PnlInputContextState = {
  mode: PnLMode;
  setMode: (mode: PnLMode) => void;
  tipsEle: ReactNode | null;
};

export const PnlInputContext = createContext<PnlInputContextState>(
  {} as PnlInputContextState
);

export const usePnlInputContext = () => {
  return useContext(PnlInputContext);
};

export const PnlInputProvider = (
  props: PropsWithChildren<{ values: PNL_Values; type: "TP" | "SL" }>
) => {
  const { type, values } = props;
  const [mode, setMode] = useLocalStorage<PnLMode>(
    "TP/SL_Mode",
    PnLMode.PERCENTAGE
  );

  const tipsEle = useMemo(() => {
    if (!values.PnL) return null;
    return (
      <Flex>
        <span className={"oui-text-xs oui-text-base-contrast-54"}>
          {`Est.${mode === PnLMode.PnL ? "ROI" : "PNL"}:`}
        </span>
        {mode === PnLMode.PnL ? (
          <Text.numeral
            rule={"percentages"}
            className={cn(
              "oui-text-xs oui-ml-1",
              type === "TP" ? "oui-text-trade-profit" : "oui-text-trade-loss"
            )}
          >
            {values.ROI}
          </Text.numeral>
        ) : (
          <Text.numeral
            rule={"price"}
            className={cn(
              "oui-text-xs oui-ml-1",
              type === "TP" ? "oui-text-trade-profit" : "oui-text-trade-loss"
            )}
          >
            {values.PnL}
          </Text.numeral>
        )}
      </Flex>
    );
  }, [mode, props.values.PnL]);

  return (
    <PnlInputContext.Provider
      value={{
        mode,
        setMode,
        tipsEle,
      }}
    >
      {props.children}
    </PnlInputContext.Provider>
  );
};
