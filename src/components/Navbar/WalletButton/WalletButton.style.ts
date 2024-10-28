import { Avatar, Badge, styled } from '@mui/material';
import { getContrastAlphaColor } from 'src/utils/colors';

import { ButtonPrimary, ButtonTransparent } from '@/components/Button2';
import { avatarMask12 } from '@/components/Mask.style';

export const WalletMgmtWalletAvatar = styled(Avatar)(() => ({
  height: 32,
  width: 32,
  background: 'white',
}));

export const WalletMgmtChainAvatar = styled(Avatar)(() => ({
  width: 16,
  height: 16,
  border: '2px solid transparent',
  background: 'transparent',
  left: 2.5,
  top: 2.5,
  img: {
    borderRadius: '50%',
  },
}));

export const WalletMgmtBadge = styled(Badge)(({ theme }) => ({
  borderRadius: '50%',
  // overflow: 'hidden',
  '> .MuiAvatar-root': {
    mask: avatarMask12,
  },
}));

export const ConnectButton = styled(ButtonPrimary)(({ theme }) => ({
  padding: '7px 25px',
  textWrap: 'nowrap',
  borderRadius: '15px',
  color: 'white',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

export const WalletMenuButton = styled(ButtonTransparent)(({ theme }) => ({
  padding: theme.spacing(1),
  paddingRight: theme.spacing(1.5),
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
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
