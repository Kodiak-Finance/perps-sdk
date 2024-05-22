import type { EIP1193Provider } from '@web3-onboard/common'
import { createContext, useContext } from "react";

export type ConnectedChain = {
  id: number | string;
};
export type WalletAccount = {
  address: string;
  // ens: Ens | null;
  // uns: Uns | null;
  // balance: Balances | null;
  // secondaryTokens?: SecondaryTokenBalances[] | null;
};
export interface WalletState {
  label: string;
  icon: string;
  provider: EIP1193Provider;
  accounts: WalletAccount[];
  chains: ConnectedChain[];
  instance?: unknown;
}

export interface WalletConnectorContextState {
  connect: () => Promise<WalletState[]>;
  disconnect: (options: any) => Promise<any[]>;
  connecting: boolean;
  setChain: (options: { chainId: string | number }) => Promise<any>;
  chains: any[];
  // switchChain: (options: { chainId: string }) => Promise<any>;
  wallet: WalletState;
  connectedChain: ConnectedChain | null;

  settingChain: boolean;
}

export const WalletConnectorContext =
  createContext<WalletConnectorContextState>({} as WalletConnectorContextState);

export const useWalletConnector = () => {
  return useContext(WalletConnectorContext);
};
