'use client';

import { ChainId, ChainType, EVM } from '@lifi/sdk';
import type { WidgetConfig, WidgetFeeConfig } from '@lifi/widget';
import { HiddenUI, LiFiWidget } from '@lifi/widget';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { getWalletClient, switchChain } from '@wagmi/core';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/configs/tokens';
import { publicRPCList } from 'src/const/rpcList';
import { ThemesMap } from 'src/const/themesMap';
import { TrackingAction, TrackingCategory, TrackingEventParameter } from 'src/const/trackingKeys';
import { useMemelist } from 'src/hooks/useMemelist';
import { useUserTracking } from 'src/hooks/userTracking';
import { useActiveTabStore } from 'src/stores/activeTab';
import { useConfig } from 'wagmi';

import { ClientOnly } from '@/components/ClientOnly';
import { MultisigWalletHeaderAlert } from '@/components/MultisigWalletHeaderAlert';
import { TabsMap } from '@/const/tabsMap';
import { useMultisig } from '@/hooks/useMultisig';
import { useSettingsStore } from '@/stores/settings';
import type { LanguageKey } from '@/types/i18n';

import { WidgetWrapper } from '.';
import type { WidgetProps } from './Widget.types';
import { refuelAllowChains, themeAllowChains } from './Widget.types';
import { WidgetSkeleton } from './WidgetSkeleton';
import { useWidgetTheme } from './useWidgetTheme';

export function Widget({
  starterVariant,
  fromChain,
  fromToken,
  toChain,
  toToken,
  fromAmount,
  allowChains,
  widgetIntegrator,
  isWelcomeScreenClosed,
  activeTheme,
}: WidgetProps) {
  const widgetTheme = useWidgetTheme();
  const { openConnectModal } = useConnectModal();
  const { setVisible: openSolanaModal } = useWalletModal();
  const configTheme = useSettingsStore((state) => state.configTheme);
  const { i18n } = useTranslation();
  const { trackEvent } = useUserTracking();
  const wagmiConfig = useConfig();
  const { isMultisigSigner, getMultisigWidgetConfig } = useMultisig();
  const { multisigWidget, multisigSdkConfig } = getMultisigWidgetConfig();
  const { activeTab } = useActiveTabStore();
  const partnerName = configTheme?.uid ?? 'default';
  const { tokens: memeListTokens } = useMemelist({
    enabled: partnerName === ThemesMap.Memecoins,
  });

  const searchParams = useSearchParams();

  const isGasVariant = activeTab === TabsMap.Refuel.index;
  const allowedChainsByVariant = useMemo(
    () =>
      starterVariant === TabsMap.Refuel.variant
        ? refuelAllowChains
        : partnerName === ThemesMap.Memecoins
          ? themeAllowChains
          : [],
    [starterVariant, partnerName],
  );

  const integratorStringByType = useMemo(() => {
    if (widgetIntegrator) {
      return widgetIntegrator;
    }
    if (isGasVariant) {
      return process.env.NEXT_PUBLIC_WIDGET_INTEGRATOR_REFUEL;
    }

    return process.env.NEXT_PUBLIC_WIDGET_INTEGRATOR;
  }, [widgetIntegrator, isGasVariant]) as string;

  // load environment config
  const config: WidgetConfig = useMemo((): WidgetConfig => {
    let rpcUrls = {};
    try {
      rpcUrls = {
        ...JSON.parse(process.env.NEXT_PUBLIC_CUSTOM_RPCS),
        ...publicRPCList,
      };
    } catch (e) {
      if (process.env.DEV) {
        console.warn('Parsing custom rpcs failed', e);
      }
    }

    const formParameters: Record<string, number | string | undefined> = {
      fromChain: fromChain,
      fromToken: fromToken,
      toChain: toChain,
      toToken: toToken,
      fromAmount: fromAmount,
    };

    for (const key in formParameters) {
      if (!formParameters[key]) {
        delete formParameters[key];
      }
    }

    if (memeListTokens) {
      tokens.allow.concat(memeListTokens);
    }
    const _vcComponent = ({ route }: any) => {
      return (
        <div>
          <h2>Route Details</h2>
          <p>
            <strong>From:</strong> {route.fromChain} ({route.fromToken})
          </p>
          <p>
            <strong>To:</strong> {route.toChain} ({route.toToken})
          </p>
          <p>
            <strong>Amount:</strong> {route.amount}
          </p>
          <p>
            <strong>Estimated Fee:</strong> {route.fee}
          </p>
        </div>
      );
    };
    //@ts-expect-error // ignore _vcComponent
    const fee: WidgetFeeConfig = {
      name: 'goodleswap',
      fee: 0.003, // getting 0.3 %
      logoURI: '',
    };

    return {
      ...formParameters,
      feeConfig: fee,
      variant: starterVariant === 'refuel' ? 'compact' : 'wide',
      subvariant:
        (starterVariant !== 'buy' && !(partnerName === ThemesMap.Memecoins) && starterVariant) ||
        'default',
      walletConfig: {
        onConnect() {
          if (Number(searchParams.get('fromChain')) === ChainId.SOL) {
            openSolanaModal(true);

            return;
          }
          if (openConnectModal) {
            openConnectModal();
          }
        },
      },
      chains: {
        from: {
          allow: allowChains,
        },
        to: {
          allow: allowChains,
        },
        types: {
          allow: [ChainType.EVM, ChainType.UTXO, ChainType.SVM],
        },
      },
      bridges: {
        allow: configTheme?.allowedBridges,
      },
      exchanges: {
        allow: configTheme?.allowedExchanges,
      },
      languages: {
        default: i18n.language as LanguageKey,
        allow: i18n.languages as LanguageKey[],
      },
      hiddenUI: [
        HiddenUI.Appearance,
        HiddenUI.Language,
        HiddenUI.PoweredBy,
        HiddenUI.WalletMenu,
        HiddenUI.ToAddress,
        HiddenUI.History,
      ],
      appearance: widgetTheme.config.appearance,
      theme: widgetTheme.config.theme,
      keyPrefix: `jumper-${starterVariant}`,
      ...multisigWidget,
      apiKey: process.env.NEXT_PUBLIC_LIFI_API_KEY,
      sdkConfig: {
        apiUrl: process.env.NEXT_PUBLIC_LIFI_API_URL,
        rpcUrls,
        routeOptions: {
          maxPriceImpact: 0.4,
          allowSwitchChain: !isMultisigSigner, // avoid routes requiring chain switch for multisig wallets
        },
        providers: isMultisigSigner
          ? [
              EVM({
                getWalletClient: () => getWalletClient(wagmiConfig),
                switchChain: async (chainId) => {
                  const chain = await switchChain(wagmiConfig, { chainId });
                  trackEvent({
                    category: TrackingCategory.Widget,
                    action: TrackingAction.SwitchChain,
                    label: 'switch-chain',
                    data: {
                      [TrackingEventParameter.ChainId]: chainId,
                    },
                  });
                  return getWalletClient(wagmiConfig, { chainId: chain.id });
                },
                multisig: multisigSdkConfig,
              }),
            ]
          : undefined,
      },
      buildUrl: true,
      // insurance: true,
      integrator: integratorStringByType,
      tokens,
    };
  }, [
    starterVariant,
    partnerName,
    fromChain,
    fromToken,
    toChain,
    toToken,
    fromAmount,
    allowChains,
    configTheme?.allowedBridges,
    configTheme?.allowedExchanges,
    i18n.language,
    i18n.languages,
    widgetTheme.config.appearance,
    widgetTheme.config.theme,
    multisigWidget,
    isMultisigSigner,
    multisigSdkConfig,
    integratorStringByType,
    wagmiConfig,
    memeListTokens,
    searchParams,
    trackEvent,
    openConnectModal,
    openSolanaModal,
  ]);

  return (
    <WidgetWrapper className="widget-wrapper" welcomeScreenClosed={false}>
      {isMultisigSigner && <MultisigWalletHeaderAlert />}
      <ClientOnly fallback={<WidgetSkeleton config={config} />}>
        <LiFiWidget integrator={config.integrator} config={config} />
      </ClientOnly>
    </WidgetWrapper>
  );
}
