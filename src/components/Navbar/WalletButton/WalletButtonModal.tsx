import { Solana } from '@lifi/sdk';
import { Chain, ChainId } from '@lifi/types';
import { getConnectorIcon, getWalletIcon } from '@lifi/wallet-management';
import LogoutIcon from '@mui/icons-material/Logout';
import { Modal, Typography, styled } from '@mui/material';
import { ConnectButton as RainbowkitConnectButton } from '@rainbow-me/rainbowkit';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import { useMemo } from 'react';
import { useDisconnect } from 'wagmi';

import { ButtonPrimary, ButtonTransparent } from '@/components/Button2';
import { useAccounts } from '@/hooks/useAccounts';
import { useChains } from '@/hooks/useChains';
import { getContrastAlphaColor } from '@/utils/colors';
import { walletDigest } from '@/utils/walletDigest';

import {
  WalletMgmtBadge,
  WalletMgmtChainAvatar,
  WalletMgmtWalletAvatar,
} from './WalletButton.style';

export default function WalletButtonModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { accounts } = useAccounts();
  const { setVisible: openSolanaModal } = useWalletModal();
  const { disconnect: disconnectSvm } = useWallet();
  const { disconnect: disconnectEvm } = useDisconnect();

  const { chains, isSuccess } = useChains();
  const evmAccount = accounts[0];
  const svmAccount = accounts[1];

  const activeChain = useMemo(
    () => chains?.find((chainEl: Chain) => chainEl.id === evmAccount.chainId),
    [chains, evmAccount.chainId],
  );
  const _walletDigest = useMemo(() => {
    return walletDigest(evmAccount?.address);
  }, [evmAccount?.address]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Container>
        <div className="bg-white flex items-center flex-col rounded-xl py-4 px-3 gap-2 pb-8">
          <div className="text-2xl font-bold my-4">Choose a chain to connect</div>
          <RainbowkitConnectButton.Custom>
            {({ chain, account, openAccountModal, openChainModal, openConnectModal, mounted }) => {
              const isConnected = mounted && account && chain;

              if (!isConnected) {
                return (
                  <ConnectButton
                    onClick={(event) => {
                      event.stopPropagation();

                      if (openConnectModal) {
                        onClose();
                        openConnectModal();
                      }
                    }}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white p-1">
                      <Image src="/eth.svg" width={24} height={24} alt="eth" className="h-full" />
                    </div>

                    <div className="ml-1">Connect to EVM Chains</div>
                  </ConnectButton>
                );
              }

              if (chain?.unsupported) {
                return (
                  <ConnectButton
                    // Used in the widget
                    id="connect-wallet-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onClose();
                      openChainModal();
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
                      Wrong Network
                    </Typography>
                  </ConnectButton>
                );
              }

              return (
                <WalletMenuButton
                  id="wallet-digest-button"
                  onClick={() => {
                    disconnectEvm();
                  }}
                >
                  {isSuccess && activeChain ? (
                    <WalletMgmtBadge
                      overlap="circular"
                      className="badge"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <WalletMgmtChainAvatar
                          src={activeChain?.logoURI || ''}
                          alt={'wallet-avatar'}
                        >
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
                    {_walletDigest}
                  </Typography>
                  <LogoutIcon className="absolute right-[12px] opacity-70" fontSize="small" />
                </WalletMenuButton>
              );
            }}
          </RainbowkitConnectButton.Custom>

          {svmAccount.address ? (
            <WalletMenuButton
              id="wallet-digest-button"
              onClick={(event) => {
                event.stopPropagation();
                disconnectSvm();
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
                <WalletMgmtWalletAvatar src={getConnectorIcon(svmAccount.connector)} />
              </WalletMgmtBadge>
              <Typography
                variant={'bodyMediumStrong'}
                width={'auto'}
                marginRight={0.25}
                marginLeft={0.75}
              >
                {walletDigest(svmAccount.address)}
              </Typography>
              <LogoutIcon className="absolute right-[12px] opacity-70" fontSize="small" />
            </WalletMenuButton>
          ) : (
            <ConnectButton
              onClick={(event) => {
                event.stopPropagation();
                onClose();
                openSolanaModal(true);
              }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white p-1">
                <Image src="/solana.svg" width={24} height={24} alt="solana" className="h-full" />
              </div>
              <div className="ml-1">
                {svmAccount.address ? walletDigest(svmAccount.address) : 'Connect to Solana Chain'}
              </div>
            </ConnectButton>
          )}
        </div>
      </Container>
    </Modal>
  );
}

const Container = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  [theme.breakpoints.down('md')]: {
    bottom: 0,
    top: 'auto',
    transform: 'translateX(-50%)',
  },
}));

const ConnectButton = styled(ButtonPrimary)(({ theme }) => ({
  padding: '7px 25px',
  textWrap: 'nowrap',
  borderRadius: '24px',
  color: 'white',
  width: '100%',
  maxWidth: 275,
}));

const WalletMenuButton = styled(ButtonTransparent)(({ theme }) => ({
  width: '100%',
  maxWidth: 275,
  padding: '7px 25px',
  paddingRight: theme.spacing(1.5),
  border: '1px solid #CB00FA',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.alphaLight300.main : '#FFFFFF',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.alphaLight300.main : '#FFFFFF',
  },
  '&:hover:before': {
    content: '" "',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transition: 'background-color 250ms',
    background: getContrastAlphaColor(theme, '4%'),
  },
}));
