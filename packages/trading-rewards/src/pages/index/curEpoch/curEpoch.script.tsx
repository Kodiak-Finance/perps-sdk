import {
  CurrentEpochEstimate,
  EpochInfoType,
  useAccount,
  useCurEpochEstimate,
  useWalletConnector,
} from "@orderly.network/hooks";
import { useTradingRewardsContext } from "../provider";
import { useMemo } from "react";
import { AccountStatusEnum } from "@orderly.network/types";
import { useAppContext, useDataTap } from "@orderly.network/react-app";
import { RewardsTooltipProps } from "./rewardsTooltip";


export const useCurEpochScript = () => {
  const {
    epochList,
    curEpochEstimate: estimate,
    brokerId,
    brokerName,
  } = useTradingRewardsContext();
  const { wrongNetwork } = useAppContext();
  const { connect } = useWalletConnector();
  const { state } = useAccount();

  const hideData = useMemo(() => {
    return state.status <= AccountStatusEnum.SignedIn || wrongNetwork;
  }, [state, wrongNetwork]);

  const notConnected = useMemo(() => {
    return state.status <= AccountStatusEnum.SignedIn;
  }, [state]);

  const rewardsTooltip = useMemo((): RewardsTooltipProps | undefined => {
    if (typeof estimate === "undefined" || estimate === null) return undefined;
    const otherRewards = estimate.rows.reduce(
      (a, b) => (a + b.broker_id !== brokerId ? b.est_r_account : 0),
      0
    );
    const curRewards = Number(estimate.est_r_wallet) - otherRewards;
    return {
      brokerName,
      curRewards,
      otherRewards,
    };
  }, [brokerId, brokerName, estimate]);

  return {
    epochList,
    estimate,
    hideData,
    notConnected,
    connect,
    rewardsTooltip: hideData ? undefined : rewardsTooltip,
  };
};

export type CurEpochReturns = ReturnType<typeof useCurEpochScript>;
