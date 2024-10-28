export type Token = {
  chainId: number;
  address: `0x${string}`;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  balance?: number;
  extensions?: {
    bridgeInfo: {
      [chainId: number]: {
        tokenAddress: `0x${string}`;
      };
    };
  };
};
