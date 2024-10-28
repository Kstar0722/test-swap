'use client';

import { useSyncWagmiConfig } from '@lifi/wallet-management';
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultConfig,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { type FC, type PropsWithChildren, useRef } from 'react';
import { base, mainnet } from 'viem/chains';
import { Config, WagmiProvider, http } from 'wagmi';

import { APP_ENV } from '@/configs';
import { defaultCoinbaseConfig } from '@/configs/coinbase';
import { useChains } from '@/hooks/useChains';

import '@rainbow-me/rainbowkit/styles.css';

export const EVMProvider: FC<PropsWithChildren> = ({ children }) => {
  const wagmi = useRef<Config>();

  if (!wagmi.current) {
    wagmi.current = getDefaultConfig({
      // Your dApps chains
      chains: [mainnet, base],
      transports: {
        // RPC URL for each chain
        [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${APP_ENV.ALCHEMY_KEY}`),
        [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${APP_ENV.ALCHEMY_KEY}`),
      },

      // Required API Keys
      projectId: APP_ENV.WALLET_CONNECT_PROJECT_ID,

      // Required App Info
      appName: defaultCoinbaseConfig.appName,
      appIcon: defaultCoinbaseConfig.appLogoUrl ?? undefined,
      ssr: true,
    });
  }

  const { chains } = useChains();

  useSyncWagmiConfig(
    wagmi.current,
    connectorsForWallets(getDefaultWallets().wallets, {
      projectId: APP_ENV.WALLET_CONNECT_PROJECT_ID,
      appName: defaultCoinbaseConfig.appName,
      appIcon: defaultCoinbaseConfig.appLogoUrl ?? undefined,
    }),
    chains,
  );

  return (
    <WagmiProvider config={wagmi.current} reconnectOnMount={true}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </WagmiProvider>
  );
};
