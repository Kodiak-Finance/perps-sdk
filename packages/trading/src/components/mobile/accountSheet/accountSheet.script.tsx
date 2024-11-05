import {
  TWType,
  useAccount,
  useConfig,
  useCurEpochEstimate,
  useEpochInfo,
  useMutation,
  useReferralInfo,
  useWalletConnector,
} from "@orderly.network/hooks";
import { AccountStatusEnum, ChainNamespace } from "@orderly.network/types";
import { modal, toast, useModal } from "@orderly.network/ui";
import { isTestnet } from "@orderly.network/utils";
import { useMemo } from "react";
import { ReferralPropsV2, TradingRewardsProps } from "../../../types/types";

export const useAccountSheetScript = (
  props: ReferralPropsV2 & TradingRewardsProps
) => {
  const { account, state } = useAccount();
  const accountId = account.accountId;
  const address = account.address;
  const chainId = account.chainId;
  const { hide } = useModal();

  const config = useConfig();

  const { connectedChain, disconnect, namespace } = useWalletConnector();
  const showGetTestUSDC = useMemo(() => {
    const chainId = connectedChain?.id;
    if (chainId === undefined) {
      return false;
    }

    return (
      state.status === AccountStatusEnum.EnableTrading &&
      // @ts-ignore
      isTestnet(parseInt(chainId))
    );
  }, [state.status, connectedChain]);

  const operatorUrl = useMemo(() => {
    const operatorUrlObj = config.get("operatorUrl");
    if (typeof operatorUrlObj === "object") {
      if (namespace === ChainNamespace.solana) {
        return operatorUrlObj["solana"];
      } else {
        return operatorUrlObj["evm"];
      }
    }
    throw Error(
      "Operator url should be Object, need solana and evm operator url"
    );
  }, [namespace, config]);

  const onCopyAddress = () => {
    navigator.clipboard.writeText(address ?? "");
    toast.success("Copy success");
  };

  const {
    affiliateCommission30D,
    traderCommission30D,
    isAffiliate,
    isTrader,
    onClickReferral,
  } = useReferral(props.onClickReferral);

  const { curEpochId, estRewards, onClickTradingRewards } = useTradingRewards(
    props.onClickTradingRewards
  );

  const onDisconnect = async () => {
    await disconnect({
      label: state.connectWallet?.name,
    });
    await account.disconnect();
    hide();
  };
  const [getTestUSDC, { isMutating: gettingTestUSDC }] = useMutation(
    `${operatorUrl}/v1/faucet/usdc`
  );
  const onGetTestUSDC = () => {
    if (state.status < AccountStatusEnum.EnableTrading) {
      // return modal.show(WalletConnectSheet, {
      //   status: state.status,
      // });
      return;
    }

    const message = `${
      namespace === ChainNamespace.solana ? '100' :'1,000'
    } USDC will be added to your balance. Please note this may take up to 3 minutes. Please check back later.`;

    return getTestUSDC({
      chain_id: account.walletAdapter?.chainId.toString(),
      user_address: state.address,
      broker_id: config.get("brokerId"),
    }).then(
      (res: any) => {
        if (res.success) {
          return modal.alert({
            title: "Get test USDC",
            message,
            onOk: () => {
              return Promise.resolve(true);
            },
          });
        }
        res.message && toast.error(res.message);
        // return Promise.reject(res);
      },
      (error: Error) => {
        toast.error(error.message);
      }
    );
  };
  return {
    accountId,
    address,
    chainId,
    onCopyAddress,

    affiliateCommission30D,
    onClickReferral,
    isAffiliate,
    isTrader,
    traderCommission30D,

    curEpochId,
    onClickTradingRewards,
    estRewards,

    onDisconnect,
    showGetTestUSDC,
    onGetTestUSDC,
    gettingTestUSDC,
  };
};

const useReferral = (_onClickReferral?: () => void) => {
  const { data, isLoading, isAffiliate, isTrader } = useReferralInfo();
  const affiliateCommission30D = useMemo(() => {
    if (isAffiliate) {
      return data?.referrer_info["30d_referrer_rebate"];
    }
    return undefined;
  }, [data]);
  const traderCommission30D = useMemo(() => {
    if (isTrader) {
      return data?.referee_info["30d_referee_rebate"];
    }
    return undefined;
  }, [data]);

  const onClickReferral = () => {
    _onClickReferral?.();
  };

  return {
    onClickReferral,
    affiliateCommission30D,
    traderCommission30D,
    isAffiliate,
    isTrader,

    // WARNING: test data
    // affiliateCommission30D: 1234.43,
    // traderCommission30D:44343.33,
    // isAffiliate: true,
    // isTrader: true,
  };
};

const useTradingRewards = (_onClick?: () => void) => {
  const [curEpochEstimate] = useCurEpochEstimate(TWType.normal);
  const [list, curEpoch] = useEpochInfo(TWType.normal);
  const curEpochId = useMemo(() => {
    return curEpoch.curEpochInfo?.epoch_id ?? "--";
  }, [curEpoch]);

  const estRewards = useMemo(() => {
    if (typeof curEpochEstimate?.est_r_wallet === "undefined") {
      return "--";
    }
    return curEpochEstimate?.est_r_wallet;
  }, [curEpochEstimate]);

  const onClickTradingRewards = () => {
    _onClick?.();
  };

  return {
    curEpochId,
    estRewards,
    onClickTradingRewards,
  };
};

export type AccountSheetState = ReturnType<typeof useAccountSheetScript>;
