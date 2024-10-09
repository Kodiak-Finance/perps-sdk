import { useCallback, useMemo } from "react";
import {
  Chain,
  ConnectedChain,
  useChains,
  useConfig,
  useWalletConnector,
} from "@orderly.network/hooks";
import { API, NetworkId } from "@orderly.network/types";
import { toast } from "@orderly.network/ui";
import { int2hex, praseChainIdToNumber } from "@orderly.network/utils";

export type CurrentChain = Pick<ConnectedChain, "namespace"> & {
  id: number;
  info?: Chain;
};

export function useChainSelect() {
  const networkId = useConfig("networkId") as NetworkId;

  const { connectedChain, settingChain, setChain } = useWalletConnector();

  const [chains, { findByChainId }] = useChains(networkId, {
    pick: "network_infos",
    filter: (chain: any) =>
      chain.network_infos?.bridge_enable || chain.network_infos?.bridgeless,
  });

  const currentChain = useMemo(() => {
    if (!connectedChain) return null;

    const chainId = praseChainIdToNumber(connectedChain.id);
    const chain = findByChainId(chainId);

    return {
      ...connectedChain,
      id: chainId,
      info: chain!,
    } as CurrentChain;
  }, [connectedChain, findByChainId]);

  const onChainChange = useCallback(
    async (chain: API.NetworkInfos) => {
      const chainInfo = findByChainId(chain.chain_id);

      if (
        !chainInfo ||
        chainInfo.network_infos?.chain_id === currentChain?.id
      ) {
        return Promise.resolve();
      }

      return setChain({
        chainId: int2hex(Number(chainInfo.network_infos?.chain_id)),
      })
        .then((switched) => {
          switched
            ? toast.success("Network switched")
            : toast.error("Switch chain failed");
        })
        .catch((error) => {
          toast.error(`Switch chain failed: ${error.message}`);
        });
    },
    [currentChain, setChain, findByChainId]
  );

  return {
    chains,
    currentChain,
    settingChain,
    onChainChange,
  };
}
