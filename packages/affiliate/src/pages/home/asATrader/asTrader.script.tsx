import {
  RefferalAPI as API,
  useAccount,
  useCheckReferralCode,
  useMutation,
} from "@orderly.network/hooks";
import { TabTypes, useReferralContext } from "../../../hooks";
import { MockData } from "../../../utils/mockData";
import { AccountStatusEnum } from "@orderly.network/types";
import { useAppContext } from "@orderly.network/react-app";
import { useState } from "react";
import { toast } from "@orderly.network/ui";

export const useAsTraderScript = () => {
  const {
    isTrader,
    referralInfo,
    setShowHome,
    bindReferralCodeState,
    setTab,
    mutate,
    wrongNetwork,
  } = useReferralContext();

  const { state } = useAccount();
  const isSignIn = state.status === AccountStatusEnum.EnableTrading;
  const onEnterTraderPage = () => {
    setTab(TabTypes.trader);
    setShowHome(false);
  };
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);

  const {
    isExist,
    error: checkCodeError,
    isLoading,
  } = useCheckReferralCode(code);
  const hide = () => {
    setOpen(false);
  };

  const [bindCode, { error, isMutating }] = useMutation(
    "/v1/referral/bind",
    "POST"
  );

  const onClickConfirm = async () => {
    try {
      await bindCode({ referral_code: code });
      toast.success("Referral code bound");
      mutate();
      if (bindReferralCodeState) {
        bindReferralCodeState(true, null, hide, { tab: 1 });
      } else {
        hide();
      }
    } catch (e: any) {
      let errorText = `${e}`;
      if ("message" in e) {
        errorText = e.message;
      }

      if ("referral code not exist" === errorText) {
        errorText = "This referral code does not exist";
      }

      if (bindReferralCodeState) {
        toast.error(errorText);
        bindReferralCodeState(false, e, hide, {});
      } else {
        toast.error(errorText);
      }
    }
  };

  return {
    isSignIn,
    isTrader,
    isLoading,
    referralInfo,
    // isTrader: true,
    // isLoading: false,
    // referralInfo: MockData.referralInfo,
    onEnterTraderPage,
    code,
    setCode,
    open,
    setOpen,
    onClickConfirm,
    isExist,
    wrongNetwork,
  };
};

export type AsTraderReturns = ReturnType<typeof useAsTraderScript>;
