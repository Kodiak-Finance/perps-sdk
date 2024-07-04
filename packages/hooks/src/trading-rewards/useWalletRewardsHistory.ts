import { TWType } from "./types";
import { useAccount } from "../useAccount";
import { useQuery } from "../useQuery";

export type WalletRewardsItem = {
  epoch_id: number;
  wallet_epoch_avg_staked: number;
  epoch_token: string;
  max_reward_amount: number;
  reward_status: string;
  r_wallet: number;
};

export type WalletRewards = {
  wallet_lifetime_trading_rewards_order: number;
  wallet_lifetime_trading_rewards_escrow: number;
  rows: WalletRewardsItem[];
};

export type WalletRewardsHisotryReturns = [
  WalletRewards | undefined,
  {
    refresh: () => void;
    error?: any;
  }
];

export const useWalletRewardsHistory = (type: TWType): WalletRewardsHisotryReturns => {
  const { account } = useAccount();

  const address = account.address;
  const isNotSupportChain = false;

  const path =
    type === TWType.normal
      ? `/v1/public/trading_rewards/wallet_rewards_history?address=${address}`
      : `/v1/public/market_making_rewards/group_rewards_history?address=${address}`;

  const {
    data,
    mutate: refresh,
    error,
  } = useQuery(address !== undefined ? path : "", {
    formatter: (res) => {
      return {
        wallet_lifetime_trading_rewards_order:
          res?.group_lifetime_mm_rewards_order ||
          res?.wallet_lifetime_trading_rewards_order ||
          0,
        wallet_lifetime_trading_rewards_escrow:
          res?.group_lifetime_mm_rewards_escrow ||
          res?.wallet_lifetime_trading_rewards_escrow ||
          0,
        rows: (res?.rows || []).map((item: any) => ({
          ...item,
          r_wallet: item?.total_reward || item?.r_wallet,
        })),
      } as WalletRewards;
    },
  });
  return [data, { refresh, error }];
};
