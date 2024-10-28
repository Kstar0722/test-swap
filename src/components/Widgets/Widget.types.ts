'use client';

import { ChainId } from '@lifi/types';

import type { StarterVariantType } from '@/types/internal';
import type { ThemeModesSupported } from '@/types/settings';

export const refuelAllowChains: ChainId[] = [
  ChainId.ETH,
  ChainId.POL,
  ChainId.BSC,
  ChainId.DAI,
  ChainId.BLS,
  ChainId.FTM,
  ChainId.AVA,
  ChainId.ARB,
  ChainId.OPT,
  ChainId.BAS,
  ChainId.MAM,
  ChainId.RSK,
];

export const themeAllowChains: ChainId[] = [
  ChainId.ETH,
  ChainId.BAS,
  ChainId.OPT,
  ChainId.ARB,
  ChainId.AVA,
  ChainId.BSC,
];

export interface BlogWidgetProps {
  fromChain?: number;
  fromToken?: string;
  toChain?: number;
  toToken?: string;
  fromAmount?: string;
  allowChains?: string;
  activeThemeMode?: ThemeModesSupported;
}

export interface WidgetProps extends Omit<BlogWidgetProps, 'allowChains'> {
  allowChains?: number[];
  widgetIntegrator?: string;
  starterVariant: StarterVariantType;
  activeThemeMode?: ThemeModesSupported;
  isWelcomeScreenClosed?: boolean;
  activeTheme?: string;
}
