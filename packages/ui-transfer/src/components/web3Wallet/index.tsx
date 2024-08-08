import { FC, useMemo } from "react";
import { Flex, Text, WalletIcon } from "@orderly.network/ui";
import { useWalletConnector } from "@orderly.network/hooks";
import { formatAddress } from "../../utils";

export const Web3Wallet: FC = () => {
  const { wallet } = useWalletConnector();

  const { walletName, address } = useMemo(
    () => ({
      walletName: wallet?.label,
      address: formatAddress(wallet?.accounts?.[0].address),
    }),
    [wallet]
  );

  return (
    <Flex justify="between">
      <Text size="sm">Your Web3 Wallet</Text>

      <Flex gapX={1}>
        <WalletIcon size={'xs'} name={walletName} />
        <Text size="sm" intensity={54}>
          {address}
        </Text>
      </Flex>
    </Flex>
  );
};
