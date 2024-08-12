import { useCallback, useEffect, useMemo } from "react";
import { useConfig, useLocalStorage } from "@orderly.network/hooks";
import { API, NetworkId } from "@orderly.network/types";
import { Decimal } from "@orderly.network/utils";
import { modal } from "@orderly.network/ui";
import { useAppContext } from "@orderly.network/react-app";
import {
  useActionType,
  useChainSelect,
  useDepositAction,
  useInputStatus,
  useToken,
} from "@orderly.network/ui-transfer";
import { useDeposit } from "../../woo/useDeposit";
import { useSwapEnquiry } from "../../hooks/useSwapEnquiry";
import { useNeedSwapAndCross } from "../../hooks/useNeedSwapAndCross";
import { useSwapFee } from "../../hooks/useSwapFee";
import { SwapDialog } from "../swap/swapDialog";
import { NetworkInfos, SwapMode, TokenInfo } from "../../types";

export type UseCrossDepositFormScriptReturn = ReturnType<
  typeof useCrossDepositFormScript
>;

export type UseCrossDepositFormScriptOptions = {
  onClose?: () => void;
};

export const useCrossDepositFormScript = (
  options: UseCrossDepositFormScriptOptions
) => {
  const [slippage, setSlippage] = useLocalStorage("ORDERLY_SLIPPAGE", 1);

  const config = useConfig();
  const brokerName = config.get("brokerName") || "";
  const networkId = config.get("networkId") as NetworkId;

  const { wrongNetwork } = useAppContext();

  const { chains, currentChain, settingChain, onChainChange } =
    useChainSelect();

  const tokensFilter = useCallback((chainInfo: API.Chain) => {
    return (
      chainInfo.token_infos.filter((token) => {
        if (chainInfo.network_infos.bridgeless && token.symbol === "USDC") {
          return true;
        }
        return !!(token as TokenInfo).swap_enable;
      }) ?? []
    );
  }, []);

  const { token, tokens, onTokenChange } = useToken({
    currentChain,
    tokensFilter,
  });

  const {
    dst,
    balance,
    allowance,
    depositFeeRevalidating,
    depositFee,
    quantity,
    setQuantity,
    approve,
    deposit,
    isNativeToken,
    balanceRevalidating,
    fetchBalance,
  } = useDeposit({
    address: token?.address,
    decimals: token?.decimals,
    srcChainId: currentChain?.id,
    srcToken: token?.symbol,
  });

  const maxQuantity = useMemo(
    () =>
      new Decimal(balance || 0)
        .todp(token?.precision ?? 2, Decimal.ROUND_DOWN)
        .toString(),
    [balance, token]
  );

  const { inputStatus, hintMessage } = useInputStatus({
    quantity,
    maxQuantity,
  });

  const { needSwap, needCrossSwap } = useNeedSwapAndCross({
    symbol: token?.symbol,
    srcChainId: currentChain?.id,
    dstChainId: dst?.chainId,
  });

  const {
    enquiry,
    transactionInfo,
    amount: swapAmount,
    querying: swapRevalidating,
    warningMessage,
    cleanTransactionInfo,
  } = useSwapEnquiry({
    quantity,
    dst,
    queryParams: {
      network: dst.network,
      srcToken: token?.address,
      srcNetwork: currentChain?.info?.network_infos?.shortName,
      dstToken: dst.address,
      crossChainRouteAddress: (
        currentChain?.info?.network_infos as NetworkInfos
      )?.woofi_dex_cross_chain_router,
      amount: new Decimal(quantity || 0)
        .mul(10 ** (token?.decimals || 0))
        .toString(),
      slippage,
    },
    needSwap,
    needCrossSwap,
  });

  const cleanData = () => {
    cleanTransactionInfo();
    setQuantity("");
  };

  const onSuccess = useCallback(() => {
    cleanData();
    options.onClose?.();
  }, [options.onClose]);

  const onSwapDeposit = useCallback(async () => {
    return enquiry()
      .then((transaction) => {
        const amountValue = needCrossSwap
          ? transaction.route_infos?.dst.amounts[1]
          : transaction.route_infos?.amounts[1];

        // @ts-ignore
        return modal.show(SwapDialog, {
          mode: needCrossSwap ? SwapMode.Cross : SwapMode.Single,
          src: {
            chain: currentChain?.id,
            token: token!.symbol,
            displayDecimals: (token as TokenInfo)!.woofi_dex_precision,
            amount: quantity,
            decimals: token!.decimals,
          },
          dst: {
            chain: dst.chainId,
            token: dst.symbol,
            displayDecimals: 2,
            amount: new Decimal(amountValue)
              .div(Math.pow(10, dst.decimals!))
              .toString(),
            decimals: dst.decimals,
          },
          chain: currentChain?.info?.network_infos,
          nativeToken: currentChain?.info.nativeToken,
          depositFee,
          transactionData: transaction,
          slippage,
          brokerName,
        });
      })
      .then((isSuccss) => {
        if (isSuccss) {
          cleanData();
        }
      })
      .catch((error) => {
        // toast.error(error?.message || "Error");
      });
  }, [quantity, needCrossSwap, dst, currentChain, slippage, depositFee]);

  const { submitting, onApprove, onDeposit } = useDepositAction({
    quantity,
    allowance,
    approve,
    deposit,
    enableCustomDeposit: needSwap || needCrossSwap,
    customDeposit: onSwapDeposit,
    onSuccess,
  });

  const loading = submitting || depositFeeRevalidating! || swapRevalidating;

  const disabled =
    !quantity ||
    Number(quantity) === 0 ||
    inputStatus === "error" ||
    depositFeeRevalidating! ||
    swapRevalidating;

  const swapPrice = useMemo(() => {
    if (needCrossSwap || needSwap) {
      return transactionInfo.price;
    }
    return 1;
  }, [transactionInfo]);

  const markPrice = useMemo(() => {
    if (needCrossSwap || needSwap) {
      return isNativeToken
        ? transactionInfo.markPrices.native_token
        : transactionInfo.markPrices.from_token;
    }

    return 1;
  }, [needSwap, needCrossSwap, isNativeToken, transactionInfo]);

  const amount = useMemo(() => {
    return new Decimal(quantity || 0).mul(markPrice).toNumber();
  }, [quantity, markPrice]);

  const swapQuantity = needSwap || needCrossSwap ? swapAmount : quantity;

  const actionType = useActionType({
    isNativeToken,
    allowance,
    quantity,
    maxQuantity,
  });

  const fee = useSwapFee({
    nativeToken: currentChain?.info?.nativeToken,
    isNativeToken,
    src: token,
    depositFee,
    transactionInfo,
    needSwap,
    needCrossSwap,
  });

  useEffect(() => {
    cleanData();
  }, [token, currentChain?.id]);

  return {
    token,
    tokens,
    onTokenChange,
    amount,
    quantity,
    maxQuantity,
    swapQuantity,
    onQuantityChange: setQuantity,
    hintMessage,
    inputStatus,
    chains,
    currentChain,
    settingChain,
    onChainChange,
    actionType,
    onDeposit,
    onApprove,
    fetchBalance,
    dst,
    wrongNetwork,
    balanceRevalidating,
    loading,
    disabled,
    networkId,
    slippage,
    onSlippageChange: setSlippage,
    needSwap,
    needCrossSwap,
    swapPrice,
    swapRevalidating,
    warningMessage,
    fee,
  };
};
