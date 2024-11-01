'use client';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import EvStationOutlinedIcon from '@mui/icons-material/EvStationOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { TrackingAction, TrackingCategory, TrackingEventParameter } from '@/const/trackingKeys';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';

interface useNavbarTabsProps {
  navbarPageReload?: boolean;
}

export const useNavbarTabs = ({ navbarPageReload }: useNavbarTabsProps) => {
  const { trackEvent } = useUserTracking();
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const handleClickTab = (tab: string) => (event: React.MouseEvent<HTMLDivElement>) => {
    // Does not get updated if taken from the hook for some reasons

    const searchParams: any =
      typeof window !== 'undefined' &&
      window?.location &&
      new URLSearchParams(window.location.search);

    // Only replace it if exists
    if (searchParams.has('toToken')) {
      searchParams.set('toToken', '0x0000000000000000000000000000000000000000');
    }

    let path = searchParams.toString();
    path = path.startsWith('?') ? path.substring(1) : path;

    router.push(`/${tab}?${path}`);
    trackEvent({
      category: TrackingCategory.Navigation,
      action: TrackingAction.SwitchTab,
      label: `switch_tab_to_${tab}`,
      data: { [TrackingEventParameter.Tab]: tab },
      enableAddressable: true,
    });
  };

  const output = [
    {
      label: t('navbar.links.exchange'),
      value: 0,
      icon: (
        <SwapHorizIcon
          sx={{
            marginRight: 0.75,
            marginBottom: `${theme.spacing(0)} !important`,
            color: 'white',
          }}
        />
      ),
      onClick: handleClickTab(''),
    },
    {
      label: t('navbar.links.refuel'),
      onClick: handleClickTab('gas'),
      value: 1,
      icon: (
        <EvStationOutlinedIcon
          sx={{
            marginRight: 0.75,
            marginBottom: `${theme.spacing(0)} !important`,
            color: 'white',
          }}
        />
      ),
    },
    {
      label: t('navbar.links.buy'),
      onClick: handleClickTab('buy'),
      value: 2,
      icon: (
        <CreditCardIcon
          sx={{
            marginRight: 0.75,
            marginBottom: `${theme.spacing(0)} !important`,
            color: 'white',
          }}
        />
      ),
      disabled: true,
    },
  ];

  return output;
};
