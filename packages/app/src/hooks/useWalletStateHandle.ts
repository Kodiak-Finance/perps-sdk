import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  OrderlyContext,
  useAccount,
  useChains,
  useKeyStore,
  useWalletConnector,
} from "@orderly.network/hooks";
import {
  parseChainIdToNumber,
  praseChainIdToNumber,
  windowGuard,
} from "@orderly.network/utils";
import { AccountStatusEnum } from "@orderly.network/types";
import type { WalletState } from "@orderly.network/hooks";

const WALLET_KEY = "orderly:wallet-info";

export const useWalletStateHandle = (options: {
  // onChainChanged?: (chainId: number, isTestnet: boolean) => void;
}) => {
  const {
    wallet: connectedWallet,
    connect,
    connectedChain,
  } = useWalletConnector();

  // console.log("🔗 wallet state handle", connectedWallet);

  const isManualConnect = useRef<boolean>(false);

  const { account } = useAccount();
  const keyStore = useKeyStore();
  const { networkId } = useContext<any>(OrderlyContext);
  const [chains, { checkChainSupport }] = useChains();

  const [unsupported, setUnsupported] = useState(false);

  // current connected wallet address
  const currentWalletAddress = useMemo<string | undefined>(() => {
    return connectedWallet?.accounts?.[0]?.address;
  }, [connectedWallet]);

  // current connected chain id
  const currentChainId = useMemo<number | undefined>(() => {
    const id = connectedWallet?.chains?.[0]?.id;
    if (typeof id === "undefined") return id;
    return parseChainIdToNumber(id);
  }, [connectedWallet]);

  useEffect(() => {
    if (!connectedChain) return;

    let isSupported = checkChainSupport(
      connectedChain.id,
      networkId
      // networkId === "testnet" ? chains.testnet : chains.mainnet
    );

    setUnsupported(!isSupported);
  }, [connectedChain?.id, chains]);

  useEffect(() => {
    // if (unsupported) return;

    windowGuard(() => {
      const localAddress = keyStore.getAddress();
      const walletInfo = JSON.parse(localStorage.getItem(WALLET_KEY) ?? "{}");

      /**
       * if locale address is exist, restore account state
       */
      if (
        localAddress &&
        account.address !== localAddress &&
        walletInfo.label
      ) {
        connect({
          autoSelect: {
            //FIXED: MetaMask
            // label: "MetaMask",
            label: walletInfo.label,
            disableModals: true,
          },
        }).then(
          (res) => {
            console.log("silent connect wallet successes", res);
          },
          (error) => console.log("connect error", error)
        );
      }
    });
  }, [connectedWallet, account.address]);

  /**
   * handle wallet connection
   */
  useEffect(() => {
    // console.log("🔗 wallet state changed", connectedWallet);
    //
    if (unsupported || !connectedChain) return;
    if (isManualConnect.current) return;

    // updateAccount(currentWalletAddress!, connectedWallet!, currentChainId!);
    /**
     * switch account
     */
    if (!!currentWalletAddress && currentWalletAddress !== account.address) {
      account.setAddress(currentWalletAddress, {
        provider: connectedWallet?.provider,
        chain: {
          id: currentChainId!,
        },
        wallet: {
          name: connectedWallet.label,
        },
      });

      // save wallet connector info to local storage
      windowGuard(() => {
        localStorage.setItem(
          WALLET_KEY,
          JSON.stringify({
            label: connectedWallet.label,
          })
        );
      });
    }

    /**
     * switch chainId
     */
    if (currentChainId !== account.chainId) {
      account.switchChainId(currentChainId!);

      // emit chain changed event
      // options.onChainChanged?.(currentChainId!, isTestnet(networkId));
    }
  }, [
    connectedWallet,
    connectedChain,
    currentWalletAddress,
    currentChainId,
    account.address,
    account.chainId,
    unsupported,
  ]);

  // console.log("🔗 wallet state handle", connectedWallet);

  /**
   * User manually connects to wallet
   */
  const connectWallet = async (): Promise<{
    wallet?: WalletState;
    status?: AccountStatusEnum;
    wrongNetwork?: boolean;
  } | null> => {
    isManualConnect.current = true;
    // const walletState = await connect();

    return connect()
      .then(async (walletState) => {
        if (
          Array.isArray(walletState) &&
          walletState.length > 0 &&
          walletState[0] &&
          walletState[0].accounts.length > 0
        ) {
          const wallet = walletState[0];
          const chainId = praseChainIdToNumber(wallet.chains[0].id);

          if (!checkChainSupport(chainId, networkId)) {
            return {
              wrongNetwork: true,
            };
          }

          //
          if (!account) {
            throw new Error("account is not initialized");
          }
          // console.info("🤝 connect wallet", wallet);
          // account.address = wallet.accounts[0].address;
          const status = await account.setAddress(wallet.accounts[0].address, {
            provider: wallet.provider,
            chain: {
              id: praseChainIdToNumber(wallet.chains[0].id),
            },
            wallet: {
              name: wallet.label,
            },
            // label: ,
          });

          return { wallet, status, wrongNetwork: false };
        }

        return null;
      })
      .finally(() => {
        isManualConnect.current = false;
      });
  };

  return {
    connectWallet,
    wrongNetwork: unsupported,
  };
};
