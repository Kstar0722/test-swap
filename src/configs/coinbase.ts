import type { CoinbaseWalletParameters } from 'wagmi/connectors';

import { siteName } from '@/const/metadata';

export const defaultCoinbaseConfig: CoinbaseWalletParameters = {
  appName: siteName,
  appLogoUrl: 'https://staging.goodleswap.com/images/pngs/dog.png',
};
