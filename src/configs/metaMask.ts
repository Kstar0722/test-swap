import type { MetaMaskParameters } from 'wagmi/connectors';

import { siteName } from '@/const/metadata';

export const defaultMetaMaskConfig: MetaMaskParameters = {
  dappMetadata: {
    name: siteName,
    url: process.env.NEXT_SITE_URL,
    iconUrl: 'https://staging.goodleswap.com/images/pngs/dog.png',
  },
};
