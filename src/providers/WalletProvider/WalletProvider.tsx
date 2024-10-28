'use client';

import { QueryClientProvider } from '@tanstack/react-query';
// import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { type FC, type PropsWithChildren } from 'react';

import { queryClient } from '@/configs';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

import { EVMProvider } from './EVMProvider';
import { SolanaProvider } from './SolanaProvider';

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <SolanaProvider>
        <EVMProvider>{children}</EVMProvider>
      </SolanaProvider>
    </ReactQueryProvider>
  );
};
