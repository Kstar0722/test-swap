import { Stack, Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Menu } from '@/components/Menu/Menu';
import { MenuKeysEnum } from '@/const/menuKeys';
import { useAccounts } from '@/hooks/useAccounts';
import { useMenuStore } from '@/stores/menu';

import { WalletButton } from '.';
import { WalletCard } from './WalletCard';

interface WalletMenuProps {
  anchorEl?: HTMLAnchorElement;
}

export const WalletMenu = ({ anchorEl }: WalletMenuProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { accounts } = useAccounts();

  const {
    openWalletMenu,
    setWalletMenuState,
    setSnackbarState,
    openSubMenu,
    setWalletSelectMenuState,
  } = useMenuStore((state) => state);

  useEffect(() => {
    openWalletMenu! && setSnackbarState(false);
  }, [setSnackbarState, openWalletMenu]);

  useEffect(() => {
    if (openWalletMenu && accounts.every((account) => account.status === 'disconnected')) {
      setWalletMenuState(false);
    }
  }, [accounts, setWalletMenuState, openWalletMenu]);

  return (
    <Menu
      open={openWalletMenu}
      setOpen={setWalletMenuState}
      isOpenSubMenu={openSubMenu !== MenuKeysEnum.None}
      width={'auto'}
      styles={{
        background: '#f7f9ff',
        padding: '12px',
      }}
      anchorEl={anchorEl}
    >
      <Stack spacing={2} sx={{ padding: '0 !important', margin: '0 !important' }}>
        {accounts.map((account, index) =>
          account.isConnected ? <WalletCard key={index} account={account} /> : null,
        )}

        <WalletButton
          sx={{ width: '100%' }}
          onClick={(event) => {
            event.stopPropagation();
            setWalletSelectMenuState(true);
          }}
        >
          <Typography
            sx={{
              color: 'white',
            }}
            variant="bodySmallStrong"
          >
            {t('navbar.walletMenu.connectAnotherWallet')}
          </Typography>
        </WalletButton>
      </Stack>
    </Menu>
  );
};
