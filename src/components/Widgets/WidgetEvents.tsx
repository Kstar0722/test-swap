'use client';

import type { RouteExtended } from '@lifi/sdk';
import { type Route } from '@lifi/sdk';
import type {
  ChainTokenSelected,
  ContactSupport,
  RouteExecutionUpdate,
  RouteHighValueLossUpdate,
} from '@lifi/widget';
import { WidgetEvent, useWidgetEvents } from '@lifi/widget';
import { useEffect, useRef, useState } from 'react';
import { shallowEqualObjects } from 'shallow-equal';
import type { JumperEventData } from 'src/hooks/useJumperTracking';
import type { TransformedRoute } from 'src/types/internal';
import { calcPriceImpact } from 'src/utils/calcPriceImpact';
import { handleTransactionDetails } from 'src/utils/routesInterpreterUtils';

import { MultisigConfirmationModal } from '@/components/MultisigConfirmationModal';
import { MultisigConnectedAlert } from '@/components/MultisigConnectedAlert';
import { TrackingAction, TrackingCategory, TrackingEventParameter } from '@/const/trackingKeys';
import { useAccounts } from '@/hooks/useAccounts';
import { useMultisig } from '@/hooks/useMultisig';
import { useUserTracking } from '@/hooks/userTracking';
import { useActiveTabStore } from '@/stores/activeTab';
import { useChainTokenSelectionStore } from '@/stores/chainTokenSelection';
import { useMenuStore } from '@/stores/menu';
import { useMultisigStore } from '@/stores/multisig';

export function WidgetEvents() {
  const previousRoutesRef = useRef<JumperEventData>({});
  const { activeTab } = useActiveTabStore();
  const { sourceChainToken, destinationChainToken, setDestinationChainToken, setSourceChainToken } =
    useChainTokenSelectionStore();
  const { trackTransaction, trackEvent } = useUserTracking();
  const [setSupportModalState] = useMenuStore((state) => [state.setSupportModalState]);
  const widgetEvents = useWidgetEvents();
  const { isMultisigSigner, shouldOpenMultisigSignatureModal } = useMultisig();
  const [setDestinationChain] = useMultisigStore((state) => [state.setDestinationChain]);

  const { account } = useAccounts();

  const [isMultiSigConfirmationModalOpen, setIsMultiSigConfirmationModalOpen] = useState(false);

  const [isMultisigConnectedAlertOpen, setIsMultisigConnectedAlertOpen] = useState(false);

  useEffect(() => {
    const onRouteExecutionStarted = async (route: RouteExtended) => {
      const data = handleTransactionDetails(route, {
        [TrackingEventParameter.Action]: 'execution_start',
        [TrackingEventParameter.TransactionStatus]: 'STARTED',
      });
      if (route.id) {
        trackTransaction({
          category: TrackingCategory.WidgetEvent,
          action: TrackingAction.OnRouteExecutionStarted,
          label: 'execution_start',
          data,
          enableAddressable: true,
        });
      }
    };

    const onRouteExecutionUpdated = async (update: RouteExecutionUpdate) => {
      // check if multisig and open the modal
      const isMultisigRouteActive = shouldOpenMultisigSignatureModal(update.route);
      if (isMultisigRouteActive) {
        setIsMultiSigConfirmationModalOpen(true);
      }
    };

    const onRouteExecutionCompleted = async (route: Route) => {
      if (route.id) {
        const data = handleTransactionDetails(route, {
          [TrackingEventParameter.Action]: 'execution_completed',
          [TrackingEventParameter.TransactionStatus]: 'COMPLETED',
        });
        // reset ref obj
        previousRoutesRef.current = {};
        trackTransaction({
          category: TrackingCategory.WidgetEvent,
          action: TrackingAction.OnRouteExecutionCompleted,
          label: 'execution_success',
          data,
          enableAddressable: true,
          isConversion: true,
        });
      }
    };

    const onRouteExecutionFailed = async (update: RouteExecutionUpdate) => {
      const data = handleTransactionDetails(update.route, {
        [TrackingEventParameter.Action]: 'execution_failed',
        [TrackingEventParameter.TransactionStatus]: 'FAILED',
        [TrackingEventParameter.Message]: update.process.message || '',
        [TrackingEventParameter.ErrorMessage]: update.process.error?.message || '',
        [TrackingEventParameter.IsFinal]: true,
        [TrackingEventParameter.ErrorCode]: update.process.error?.code || '',
      });
      // reset ref obj
      previousRoutesRef.current = {};
      trackTransaction({
        category: TrackingCategory.WidgetEvent,
        action: TrackingAction.OnRouteExecutionFailed,
        label: 'execution_error',
        data,
        enableAddressable: true,
      });
    };

    const onRouteHighValueLoss = (update: RouteHighValueLossUpdate) => {
      trackEvent({
        action: TrackingAction.OnRouteHighValueLoss,
        category: TrackingCategory.WidgetEvent,
        label: 'click_high_value_loss_accepted',
        data: {
          [TrackingEventParameter.FromAmountUSD]: update.fromAmountUSD,
          [TrackingEventParameter.ToAmountUSD]: update.toAmountUSD,
          [TrackingEventParameter.GasCostUSD]: update.gasCostUSD || '',
          [TrackingEventParameter.FeeCostUSD]: update.feeCostUSD || '',
          [TrackingEventParameter.ValueLoss]: update.valueLoss,
          [TrackingEventParameter.Timestamp]: new Date(Date.now()).toUTCString(),
        },
        enableAddressable: true,
      });
    };

    const onRouteContactSupport = (supportId: ContactSupport) => {
      setSupportModalState(true);
    };

    const onMultisigChainTokenSelected = (destinationData: ChainTokenSelected) => {
      setDestinationChain(destinationData.chainId);
    };

    const onSourceChainTokenSelection = async (sourceChainData: ChainTokenSelected) => {
      trackEvent({
        category: TrackingCategory.WidgetEvent,
        action: TrackingAction.OnSourceChainAndTokenSelection,
        label: `select_source_chain_and_token`,
        data: {
          [TrackingEventParameter.SourceChainSelection]: sourceChainData.chainId,
          [TrackingEventParameter.SourceTokenSelection]: sourceChainData.tokenAddress,
        },
        enableAddressable: true,
      });
      setSourceChainToken(sourceChainData);
    };

    // const onWidgetExpanded = async (expanded: boolean) => {
    //   expanded &&
    //     trackEvent({
    //       category: TrackingCategory.WidgetEvent,
    //       action: TrackingAction.OnWidgetExpanded,
    //       label: `widget_expanded`,
    //       enableAddressable: true,
    //       data: {},
    //     });
    // };

    const onDestinationChainTokenSelection = async (toChainData: ChainTokenSelected) => {
      trackEvent({
        category: TrackingCategory.WidgetEvent,
        action: TrackingAction.OnDestinationChainAndTokenSelection,
        label: `select_destination_chain_and_token`,
        data: {
          [TrackingEventParameter.DestinationChainSelection]: toChainData.chainId,
          [TrackingEventParameter.DestinationTokenSelection]: toChainData.tokenAddress,
        },
        enableAddressable: true,
      });
      setDestinationChainToken(toChainData);
    };

    const onAvailableRoutes = async (availableRoutes: Route[]) => {
      // current available routes
      const newObj: JumperEventData = {
        [TrackingEventParameter.FromToken]: sourceChainToken.tokenAddress || '',
        [TrackingEventParameter.FromChainId]: sourceChainToken.chainId || '',
        [TrackingEventParameter.ToToken]: destinationChainToken.tokenAddress || '',
        [TrackingEventParameter.ToChainId]: destinationChainToken.chainId || '',
      };

      // compare current availableRoutes with the previous one
      const isSameObject = shallowEqualObjects(previousRoutesRef.current, newObj);
      // if the object has changed, then track the event
      if (
        !isSameObject &&
        previousRoutesRef.current &&
        sourceChainToken.chainId &&
        sourceChainToken.tokenAddress &&
        destinationChainToken.chainId &&
        destinationChainToken.tokenAddress
      ) {
        previousRoutesRef.current = newObj;
        const transformedRoutes = availableRoutes.reduce<Record<number, TransformedRoute>>(
          (acc, route, index) => {
            const priceImpact = calcPriceImpact(route);
            acc[index] = {
              [TrackingEventParameter.NbOfSteps]: route.steps.length,
              [TrackingEventParameter.Steps]: route.steps.map((step) => step.tool),
              [TrackingEventParameter.ToAmountUSD]: Number(route.toAmountUSD),
              [TrackingEventParameter.GasCostUSD]: route.steps.reduce(
                (acc, step) =>
                  acc +
                  (step.estimate.gasCosts?.reduce(
                    (sum, gasCost) => sum + parseFloat(gasCost.amountUSD),
                    0,
                  ) || 0),
                0,
              ),
              [TrackingEventParameter.Time]: route.steps.reduce(
                (acc, step) => acc + step.estimate.executionDuration,
                0,
              ),
              [TrackingEventParameter.Slippage]: priceImpact,
            };
            return acc;
          },
          {},
        );
        trackEvent({
          category: TrackingCategory.WidgetEvent,
          action: TrackingAction.OnAvailableRoutes,
          label: `routes_available`,
          enableAddressable: true,
          data: {
            ...newObj,
            [TrackingEventParameter.FromAmountUSD]: Number(availableRoutes[0].fromAmountUSD),
            [TrackingEventParameter.NbOfSteps]: availableRoutes.length,
            [TrackingEventParameter.Routes]: transformedRoutes,
          },
        });
      }
    };
    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    widgetEvents.on(WidgetEvent.RouteExecutionUpdated, onRouteExecutionUpdated);
    widgetEvents.on(WidgetEvent.RouteExecutionCompleted, onRouteExecutionCompleted);
    widgetEvents.on(WidgetEvent.AvailableRoutes, onAvailableRoutes);
    widgetEvents.on(WidgetEvent.RouteExecutionFailed, onRouteExecutionFailed);
    widgetEvents.on(WidgetEvent.RouteHighValueLoss, onRouteHighValueLoss);
    widgetEvents.on(WidgetEvent.ContactSupport, onRouteContactSupport);
    widgetEvents.on(WidgetEvent.DestinationChainTokenSelected, onMultisigChainTokenSelected);
    widgetEvents.on(WidgetEvent.SourceChainTokenSelected, onSourceChainTokenSelection);
    widgetEvents.on(WidgetEvent.DestinationChainTokenSelected, onDestinationChainTokenSelection);

    // widgetEvents.on(WidgetEvent.WidgetExpanded, onWidgetExpanded);

    return () => {
      widgetEvents.off(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
      widgetEvents.off(WidgetEvent.RouteExecutionUpdated, onRouteExecutionUpdated);
      widgetEvents.off(WidgetEvent.RouteExecutionCompleted, onRouteExecutionCompleted);
      widgetEvents.off(WidgetEvent.RouteExecutionFailed, onRouteExecutionFailed);
      widgetEvents.off(WidgetEvent.RouteHighValueLoss, onRouteHighValueLoss);
      widgetEvents.off(WidgetEvent.ContactSupport, onRouteContactSupport);
      widgetEvents.off(WidgetEvent.DestinationChainTokenSelected, onMultisigChainTokenSelected);
      widgetEvents.off(WidgetEvent.SourceChainTokenSelected, onSourceChainTokenSelection);
      widgetEvents.off(WidgetEvent.DestinationChainTokenSelected, onDestinationChainTokenSelection);
      // widgetEvents.off(WidgetEvent.WidgetExpanded, onWidgetExpanded);
      widgetEvents.off(WidgetEvent.AvailableRoutes, onAvailableRoutes);
    };
  }, [
    activeTab,
    destinationChainToken.chainId,
    destinationChainToken.tokenAddress,
    setDestinationChain,
    setDestinationChainToken,
    setSourceChainToken,
    setSupportModalState,
    shouldOpenMultisigSignatureModal,
    sourceChainToken,
    trackEvent,
    trackTransaction,
    widgetEvents,
  ]);

  const onMultiSigConfirmationModalClose = () => {
    setIsMultiSigConfirmationModalOpen(false);
  };

  const handleMultisigWalletConnectedModalClose = () => {
    setIsMultisigConnectedAlertOpen(false);
  };

  useEffect(() => {
    setIsMultisigConnectedAlertOpen(isMultisigSigner);
    // prevent endless loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address]);

  return (
    <>
      <MultisigConnectedAlert
        open={isMultisigConnectedAlertOpen}
        onClose={handleMultisigWalletConnectedModalClose}
      />
      <MultisigConfirmationModal
        open={isMultiSigConfirmationModalOpen}
        onClose={onMultiSigConfirmationModalClose}
      />
    </>
  );
}