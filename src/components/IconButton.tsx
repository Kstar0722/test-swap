import type { IconButtonProps } from '@mui/material';
import { IconButton as MuiIconButtom, darken, styled } from '@mui/material';

import { getContrastAlphaColor } from '@/utils/colors';

export const IconButton = styled(MuiIconButtom, {
  shouldForwardProp: (prop) => prop !== 'styles',
})<IconButtonProps>(({ theme }) => ({
  color: getContrastAlphaColor(theme, '84%'),
  transition: 'background 0.3s',
  width: '48px',
  height: '48px',
  backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : theme.palette.alphaLight300.main,
  '&:hover': {
    backgroundColor: getContrastAlphaColor(theme, '8%'),
  },
}));

export const IconButtonPrimary = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'styles',
})<IconButtonProps>(({ theme }) => ({
  color: '#FFFFFF',
  backgroundColor: theme.palette.mode === 'dark' ? '#31007A' : '#31007A',
  ':hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? darken('#31007A', 0.16) : darken('#31007A', 0.16),
  },
}));

export const IconButtonSecondary = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'styles',
})<IconButtonProps>(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#240752' : '#FFFFFF', // todo add color to theme
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.alphaLight300.main : '#FFFFFF',
  '&:hover': {
    backgroundColor: getContrastAlphaColor(theme, '4%'),
  },
}));

export const IconButtonAlpha = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'styles',
})<IconButtonProps>(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.alphaLight300.main
      : theme.palette.alphaDark100.main,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.24)' : theme.palette.alphaDark300.main,
  },
}));
