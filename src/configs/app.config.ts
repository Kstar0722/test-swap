import { APP_ENV } from './env.config';

export const GOODLE_TOKEN_ADDRESS: { [key: number]: `0x${string}` } = {
  8453: APP_ENV.BAES_TOKEN_ADDRESS,
  84532: APP_ENV.BASE_SEPOLIA_TOKEN_ADDRESS,
};

export const STAKING_CONTRACT: { [key: number]: `0x${string}` } = {
  8453: APP_ENV.BASE_STAKING_ADDRESS,
  84532: APP_ENV.BASE_SEPOLIA_STAKING_ADDRESS,
};

export const UNISWAP_ROUTER_CONTRACT: { [key: number]: `0x${string}` } = {
  8453: APP_ENV.BASE_UNISWAP_ROUTER_ADDRESS,
  84532: APP_ENV.BASE_SEPOLIA_UNISWAP_ROUTER_ADDRESS,
};

export const UNISWAP_FACTORY_CONTRACT: { [key: number]: `0x${string}` } = {
  8453: '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
  84532: '0x0',
};

export const UNISWAP_QUOTE_CONTRACT: { [key: number]: `0x${string}` } = {
  8453: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
  84532: '0x0',
};

export const getGoodleTokenAddress = (chainId: number | undefined): `0x${string}` => {
  if (!chainId) {
    return '0x0';
  }

  return GOODLE_TOKEN_ADDRESS[chainId];
};

export const getStakingContractAddress = (chainId: number | undefined): `0x${string}` => {
  if (!chainId) {
    return '0x0';
  }

  return STAKING_CONTRACT[chainId];
};

export const getUniswapRouterContractAddress = (chainId: number | undefined): `0x${string}` => {
  if (!chainId) {
    return '0x0';
  }

  return UNISWAP_ROUTER_CONTRACT[chainId];
};

export const getUniswapFactoryContractAddress = (chainId: number | undefined): `0x${string}` => {
  if (!chainId) {
    return '0x0';
  }

  return UNISWAP_FACTORY_CONTRACT[chainId];
};

export const getUniswapQuoteContractAddress = (chainId: number | undefined): `0x${string}` => {
  if (!chainId) {
    return '0x0';
  }

  return UNISWAP_QUOTE_CONTRACT[chainId];
};

export const SOLANA_RPC_URL = `https://solana-mainnet.g.alchemy.com/v2/${APP_ENV.ALCHEMY_KEY}`;
