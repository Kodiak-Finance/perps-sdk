import React, {useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { Adapter, WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import {SolanaInitialProps} from "./types";
import {
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache, createDefaultWalletNotFoundHandler,
  SolanaMobileWalletAdapter
} from "@solana-mobile/wallet-adapter-mobile";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { getGlobalObject } from "@orderly.network/utils";

export default function InitSolana({ children, ...props }:SolanaInitialProps) {
  const network =props.network ?? WalletAdapterNetwork.Devnet;
  const endPoint = useMemo(() => {
    return props.endPoint ?? clusterApiUrl(network)
  }, [network]);

  const mobileWalletNotFoundHanlder = (adapter: SolanaMobileWalletAdapter) => {
    console.log('-- mobile wallet adapter', adapter);

    return Promise.reject('wallet not ready');
  }


  const handleSolanaError = (error: WalletError, adapter?: Adapter) => {
    console.log('-- solanan error', error);
    console.log('-- solana adapter', adapter);
  }

  const wallets =  useMemo(() => {
    let uri = '';
    if (typeof window !== "undefined") {
      const location= (getGlobalObject() as any).location;
      uri = `${location.protocol}//${location.host}`;
    }



    return props.wallets ?? [
      new PhantomWalletAdapter(),
      new SolanaMobileWalletAdapter({
        addressSelector: createDefaultAddressSelector(),
        appIdentity: {
          uri,
        },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        chain: network,
        onWalletNotFound: mobileWalletNotFoundHanlder,
      })
    ];
  }, [props.wallets, network]);

  return (
    <ConnectionProvider endpoint={endPoint}>
      <WalletProvider wallets={wallets} onError={props.onError ?? handleSolanaError}>
        <WalletModalProvider className='oui-pointer-events-auto'>

          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
