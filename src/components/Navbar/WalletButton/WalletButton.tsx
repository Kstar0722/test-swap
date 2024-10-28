'use client';

import type { Chain } from '@lifi/types';
import { getConnectorIcon } from '@lifi/wallet-management';
import { AvatarGroup, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

import { useAccounts } from '@/hooks/useAccounts';
import { useChains } from '@/hooks/useChains';
import { walletDigest } from '@/utils/walletDigest';

import {
  ConnectButton,
  WalletMenuButton,
  WalletMgmtBadge,
  WalletMgmtChainAvatar,
  WalletMgmtWalletAvatar,
} from './WalletButton.style';
import WalletButtonModal from './WalletButtonModal';

export const WalletButtons = () => {
  const { chains, isSuccess } = useChains();
  const { accounts } = useAccounts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const evmAccount = accounts[0];
  const solanaAccount = accounts[1];

  const activeChain = useMemo(
    () => chains?.find((chainEl: Chain) => chainEl.id === evmAccount?.chainId),
    [chains, evmAccount?.chainId],
  );

  const handleRenderButton = () => {
    if (evmAccount.isConnected && solanaAccount.isConnected) {
      return (
        <WalletMenuButton
          id="wallet-digest-button"
          onClick={(event) => {
            event.stopPropagation();
            setIsMenuOpen(true);
          }}
        >
          <AvatarGroup sx={{ marginLeft: 1 }}>
            {isSuccess && activeChain ? (
              <WalletMgmtBadge
                overlap="circular"
                className="badge"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <WalletMgmtChainAvatar src={activeChain?.logoURI || ''} alt={'wallet-avatar'}>
                    {activeChain.name[0]}
                  </WalletMgmtChainAvatar>
                }
              >
                <WalletMgmtWalletAvatar src={getConnectorIcon(evmAccount.connector)} />
              </WalletMgmtBadge>
            ) : null}
            <WalletMgmtBadge
              overlap="circular"
              className="badge"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <WalletMgmtChainAvatar
                  src="/solana.svg"
                  alt={'wallet-avatar'}
                ></WalletMgmtChainAvatar>
              }
            >
              <WalletMgmtWalletAvatar src={getConnectorIcon(solanaAccount.connector)} />
            </WalletMgmtBadge>
          </AvatarGroup>
          <div className="mx-3">
            <div className="text-xs">
              <Typography variant={'bodyMediumStrong'} width={'auto'}>
                {walletDigest(evmAccount.address)}
              </Typography>
            </div>
            <div className="text-xs">
              <Typography variant={'bodyMediumStrong'} width={'auto'}>
                {walletDigest(solanaAccount.address)}
              </Typography>
            </div>
          </div>
        </WalletMenuButton>
      );
    }

    if (evmAccount.isConnected) {
      return (
        <WalletMenuButton
          id="wallet-digest-button"
          onClick={(event) => {
            event.stopPropagation();
            setIsMenuOpen(true);
          }}
        >
          {isSuccess && activeChain ? (
            <WalletMgmtBadge
              overlap="circular"
              className="badge"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <WalletMgmtChainAvatar src={activeChain?.logoURI || ''} alt={'wallet-avatar'}>
                  {activeChain.name[0]}
                </WalletMgmtChainAvatar>
              }
            >
              <WalletMgmtWalletAvatar src={getConnectorIcon(evmAccount.connector)} />
            </WalletMgmtBadge>
          ) : null}
          <Typography
            variant={'bodyMediumStrong'}
            width={'auto'}
            marginRight={0.25}
            marginLeft={0.75}
          >
            {walletDigest(evmAccount.address)}
          </Typography>
        </WalletMenuButton>
      );
    }

    if (solanaAccount.isConnected) {
      return (
        <WalletMenuButton
          id="wallet-digest-button"
          onClick={(event) => {
            event.stopPropagation();
            setIsMenuOpen(true);
          }}
        >
          <WalletMgmtBadge
            overlap="circular"
            className="badge"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <WalletMgmtChainAvatar
                src="/solana.svg"
                alt={'wallet-avatar'}
              ></WalletMgmtChainAvatar>
            }
          >
            <WalletMgmtWalletAvatar src={getConnectorIcon(solanaAccount.connector)} />
          </WalletMgmtBadge>
          <Typography
            variant={'bodyMediumStrong'}
            width={'auto'}
            marginRight={0.25}
            marginLeft={0.75}
          >
            {walletDigest(solanaAccount.address)}
          </Typography>
        </WalletMenuButton>
      );
    }

    return (
      <ConnectButton
        id="connect-wallet-button"
        onClick={(event) => {
          event.stopPropagation();
          setIsMenuOpen(true);
        }}
      >
        <Typography
          variant={'bodyMediumStrong'}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          Connect Wallet
        </Typography>
      </ConnectButton>
    );
  };

  return (
    <>
      {handleRenderButton()}
      <WalletButtonModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
