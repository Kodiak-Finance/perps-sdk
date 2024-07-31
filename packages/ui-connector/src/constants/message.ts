export type alertMessages = {
  connectWallet?: string;
  switchChain?: string;
  enableTrading?: string;
  signin?: string;
};

export const LABELS = {
  connectWallet: "Connect wallet",
  switchChain: "Wrong network",
  enableTrading: "Enable trading",
  signin: "Sigin",
};

export const DESCRIPTIONS: alertMessages = {
  connectWallet: "Please Connect wallet before starting to trade",
  switchChain: "Please switch to a supported network to continue",
  enableTrading: "Please Enable trading before starting to trade",
  signin: "Please sign in before starting to trade",
};
