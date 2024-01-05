export const hex2int = (chainId: string): number => parseInt(chainId);
export const int2hex = (chainId: number): string => `0x${chainId.toString(16)}`;
export const praseChainId = (chainId: string | number): number => {
  if (typeof chainId === "string") return hex2int(chainId);
  return chainId;
};

export const praseChainIdToNumber = (chainId: string | number): number => {
  if (
    typeof chainId === "string" &&
    chainId.startsWith("0x") &&
    /^[a-f0-9]+$/iu.test(chainId.slice(2))
  )
    return hex2int(chainId);
  return chainId as number;
};
