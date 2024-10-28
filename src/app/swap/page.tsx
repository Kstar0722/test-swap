import { PageContainer } from '@/components';
import { WidgetContainer } from '@/components/Widgets';
import { Widgets } from '@/components/Widgets';
import { Widget } from '@/components/Widgets/Widget';

export default function SwapPage() {
  const variant = 'default'; // exchange

  return (
    <PageContainer>
      <WidgetContainer welcomeScreenClosed={false} className="widget-container">
        <Widget
          activeTheme={undefined}
          starterVariant={variant}
          fromChain={8453}
          fromToken={process.env.NEXT_PUBLIC_GOODLE_TOKEN_ADDRESS_BASE}
          toChain={8453}
          toToken={process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS_BASE}
          activeThemeMode={undefined}
          isWelcomeScreenClosed={true}
          allowChains={[
            20000000000001, 1, 42161, 10, 1151111081099710, 137, 8453, 56, 324, 59144, 100, 43114,
            250, 1101, 122, 288, 1284, 1285, 1313161554, 1088, 534352, 34443, 5000, 30, 81457,
            42220, 252, 167000, 1652, 1329, 13371,
          ]}
        />
        <Widgets closedWelcomeScreen={true} widgetVariant={variant} />
      </WidgetContainer>
    </PageContainer>
  );
}
