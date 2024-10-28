import Moralis from 'moralis';

import { APP_ENV } from './env.config';

Moralis.start({ apiKey: APP_ENV.MORALIS_KEY });
export const getTokenBalanceList = async (
  address: `0x${string}` | undefined,
  chainId: number | undefined,
) => {
  try {
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: '0x' + chainId?.toString(16),
      address: address ? address : '',
    });
    return response.raw;
  } catch (error) {
    console.error(error);
  }
};
export const getTokenMetadata = async (tokenAddress: string, chainId: number) => {
  try {
    const response = await Moralis.EvmApi.token.getTokenMetadata({
      chain: '0x' + chainId?.toString(16),
      addresses: [tokenAddress],
    });
    return response.raw; // Get raw data
  } catch (error) {
    console.error(error);
  }
};
