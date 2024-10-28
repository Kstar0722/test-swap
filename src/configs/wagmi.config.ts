'use client';

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const pivotalchain = {
  id: 16_481,
  name: 'Pivotal Sepolia',
  network: 'pivotal',
  nativeCurrency: {
    decimals: 18,
    name: 'Pivotal',
    symbol: 'PLUS',
  },
  rpcUrls: {
    public: { http: ['https://sepolia.pivotalprotocol.com'] },
    default: { http: ['https://sepolia.pivotalprotocol.com'] },
  },
  blockExplorers: {
    etherscan: {
      name: 'Blockscout',
      url: 'http://sepolia.pivotalscan.xyz',
    },
    default: {
      name: 'Blockscout',
      url: 'http://sepolia.pivotalscan.xyz',
    },
  },
} as any;
